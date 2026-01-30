import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import hairStraight from "@/assets/hair-straight.jpg";
import hairWavy from "@/assets/hair-wavy.jpg";
import hairCurly from "@/assets/hair-curly.jpg";

const WHATSAPP_NUMBER = "2348123456789"; // Replace with actual number from wa.link

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  tag: string | null;
  price: number | null;
}

const formatPrice = (price: number | null) => {
  if (price === null) return null;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};

// Map for default product images
const defaultImageMap: Record<string, string> = {
  "default-1": hairStraight,
  "default-2": hairWavy,
  "default-3": hairCurly,
};

// Default products to show when database is empty
const defaultProducts: Product[] = [
  {
    id: "default-1",
    name: "Sleek Straight Hair",
    description: "Elegant bone-straight hair for a polished, sophisticated look.",
    image_url: hairStraight,
    tag: "Best Seller",
    price: 25000,
  },
  {
    id: "default-2",
    name: "Body Wave Hair",
    description: "Beautiful wavy texture that adds volume and natural movement.",
    image_url: hairWavy,
    tag: "Popular",
    price: 30000,
  },
  {
    id: "default-3",
    name: "Bouncy Curly Hair",
    description: "Gorgeous curls that make a bold, glamorous statement.",
    image_url: hairCurly,
    tag: "New Arrival",
    price: 35000,
  },
];

// Helper to get image URL with fallback
const getImageUrl = (product: Product): string | null => {
  if (product.image_url) return product.image_url;
  return defaultImageMap[product.id] || null;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getWhatsAppLink = (productName: string) => {
    const message = encodeURIComponent(`Hi, I want to purchase ${productName}`);
    return `https://wa.link/yksnxm?text=${message}`;
  };

  return (
    <section id="products" className="bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Our Collection
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Quality Hair Styles
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Browse our carefully selected collection of thrift hairs. Each piece is
            inspected for quality and styled to perfection.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading products...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-border transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  {getImageUrl(product) ? (
                    <img
                      src={getImageUrl(product)!}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {product.tag && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {product.name}
                  </h3>
                  {product.price !== null && (
                    <p className="mb-2 text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  )}
                  {product.description && (
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="border-t border-border p-4">
                  <Button asChild className="w-full gap-2">
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Enquire Now
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

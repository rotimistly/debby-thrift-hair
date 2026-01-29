import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import hairStraight from "@/assets/hair-straight.jpg";
import hairWavy from "@/assets/hair-wavy.jpg";
import hairCurly from "@/assets/hair-curly.jpg";

const WHATSAPP_LINK = "https://wa.link/yksnxm";

const products = [
  {
    id: 1,
    name: "Sleek Straight Hair",
    description: "Elegant bone-straight hair for a polished, sophisticated look.",
    image: hairStraight,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Body Wave Hair",
    description: "Beautiful wavy texture that adds volume and natural movement.",
    image: hairWavy,
    tag: "Popular",
  },
  {
    id: 3,
    name: "Bouncy Curly Hair",
    description: "Gorgeous curls that make a bold, glamorous statement.",
    image: hairCurly,
    tag: "New Arrival",
  },
];

const Products = () => {
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {product.tag}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="border-t border-border p-4">
                <Button asChild className="w-full gap-2">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Enquire Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

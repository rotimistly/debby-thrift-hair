import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  tag: string | null;
  price: number | null;
  created_at: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

const formatPrice = (price: number | null) => {
  if (price === null) return null;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const { toast } = useToast();

  const deleteProduct = async () => {
    // Delete image from storage if exists
    if (product.image_url && product.image_url.includes('product-images')) {
      const urlParts = product.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      await supabase.storage.from('product-images').remove([fileName]);
    }

    // Delete video from storage if exists
    if (product.video_url && product.video_url.includes('product-videos')) {
      const urlParts = product.video_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      await supabase.storage.from('product-videos').remove([fileName]);
    }

    const { error } = await supabase.from("products").delete().eq("id", product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      onDelete();
    }
  };

  return (
    <Card className="overflow-hidden">
      {product.video_url ? (
        <div className="aspect-square overflow-hidden">
          <video
            src={product.video_url}
            controls
            className="h-full w-full object-cover"
          />
        </div>
      ) : product.image_url ? (
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-foreground">
            {product.name}
          </h3>
          {product.tag && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {product.tag}
            </span>
          )}
        </div>
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
      <CardFooter className="border-t p-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={deleteProduct}
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

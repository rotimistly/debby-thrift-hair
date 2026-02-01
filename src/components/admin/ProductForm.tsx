import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, X, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm = ({ onProductAdded }: ProductFormProps) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    tag: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Video file must be less than 50MB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const uploadVideo = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('product-videos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Video upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-videos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addProduct = async () => {
    if (!newProduct.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }
    }

    let videoUrl: string | null = null;
    if (videoFile) {
      videoUrl = await uploadVideo(videoFile);
      if (!videoUrl) {
        toast({
          title: "Error",
          description: "Failed to upload video",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }
    }

    const priceValue = newProduct.price.trim() ? parseFloat(newProduct.price) : null;

    const { error } = await supabase.from("products").insert({
      name: newProduct.name.trim(),
      description: newProduct.description.trim() || null,
      image_url: imageUrl,
      video_url: videoUrl,
      tag: newProduct.tag.trim() || null,
      price: priceValue,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      setNewProduct({ name: "", description: "", price: "", tag: "" });
      setImageFile(null);
      setImagePreview(null);
      setVideoFile(null);
      setVideoPreview(null);
      onProductAdded();
    }
    setUploading(false);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            placeholder="Product Name *"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Input
            placeholder="Tag (e.g., Best Seller, New Arrival)"
            value={newProduct.tag}
            onChange={(e) =>
              setNewProduct({ ...newProduct, tag: e.target.value })
            }
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="number"
            placeholder="Price (₦)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <Textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Product Image</Label>
          {imagePreview ? (
            <div className="relative w-full max-w-xs">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-full rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="flex h-32 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary"
              >
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <Label>Product Video (Optional)</Label>
          {videoPreview ? (
            <div className="relative w-full max-w-xs">
              <video
                src={videoPreview}
                controls
                className="h-48 w-full rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={removeVideo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <label
                htmlFor="video-upload"
                className="flex h-32 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary"
              >
                <Video className="mb-2 h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload video
                </span>
                <span className="text-xs text-muted-foreground/70">
                  Max 50MB
                </span>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoChange}
                />
              </label>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={addProduct} className="w-full sm:w-auto" disabled={uploading}>
          <Plus className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Add Product"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;

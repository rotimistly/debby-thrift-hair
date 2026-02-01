-- Add video_url column to products table
ALTER TABLE public.products
ADD COLUMN video_url text NULL;

-- Create storage bucket for product videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-videos', 'product-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to product videos
CREATE POLICY "Product videos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload product videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-videos');

-- Allow authenticated users to delete their videos
CREATE POLICY "Authenticated users can delete product videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-videos');
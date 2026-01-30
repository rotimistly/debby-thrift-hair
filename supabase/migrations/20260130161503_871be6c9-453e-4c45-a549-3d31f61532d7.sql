-- =============================================
-- SECURITY FIX: Implement Role-Based Access Control
-- =============================================

-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table for RBAC
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 5. Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =============================================
-- FIX: Update products table RLS policies
-- =============================================

-- 6. Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

-- 7. Create admin-only INSERT policy
CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Create admin-only DELETE policy
CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- FIX: Add database constraints for input validation
-- =============================================

-- 9. Add price validation (non-negative)
ALTER TABLE public.products 
ADD CONSTRAINT price_non_negative CHECK (price IS NULL OR price >= 0);

-- 10. Add reasonable length limits
ALTER TABLE public.products 
ADD CONSTRAINT name_length CHECK (char_length(name) <= 200);

ALTER TABLE public.products 
ADD CONSTRAINT tag_length CHECK (tag IS NULL OR char_length(tag) <= 50);

ALTER TABLE public.products 
ADD CONSTRAINT description_length CHECK (description IS NULL OR char_length(description) <= 2000);

-- =============================================
-- FIX: Update storage policies for product-images bucket
-- =============================================

-- 11. Drop existing overly permissive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- 12. Create admin-only upload policy with file type validation
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
  AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'webp', 'gif']))
);

-- 13. Create admin-only delete policy for storage
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);
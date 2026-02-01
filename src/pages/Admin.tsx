import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import ProductCard from "@/components/admin/ProductCard";

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

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Store
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <ProductForm onProductAdded={fetchProducts} />

        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Your Products ({products.length})
        </h2>

        {loading ? (
          <p className="text-muted-foreground">Loading products...</p>
        ) : products.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No products yet. Add your first product above!
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={fetchProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

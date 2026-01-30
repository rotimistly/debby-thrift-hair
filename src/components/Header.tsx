import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.link/yksnxm";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-primary">Debby's</span>
          <span className="text-xl font-light text-foreground">Thrift Hair</span>
        </div>
        
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#products" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Products
          </a>
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            About Us
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Contact
          </a>
        </nav>

        <Button asChild className="gap-2">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Order Now</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;

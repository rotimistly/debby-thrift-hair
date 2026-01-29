import { MessageCircle, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hair.jpg";

const WHATSAPP_LINK = "https://wa.link/yksnxm";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-12">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">
              Quality Thrift Hairs
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Affordable{" "}
            <span className="text-primary">Thrift Hairs</span>
            <br />
            for Every Budget
          </h1>
          
          <p className="mb-8 max-w-lg text-lg text-muted-foreground">
            Neatly selected, good-quality thrift hairs at pocket-friendly prices.
            Look stylish without breaking the bank.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span>Neat & Stylish</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <span>Nationwide Delivery</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <a href="#products">View Collection</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-card"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

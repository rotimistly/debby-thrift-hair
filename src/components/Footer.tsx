import { MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.link/yksnxm";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground py-12 text-background">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="mb-12 rounded-2xl bg-primary p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to Upgrade Your Look?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-primary-foreground/90">
            Chat with us on WhatsApp to browse our latest collection, ask questions,
            or place your order. We're here to help!
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 text-base"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Start Shopping on WhatsApp
            </a>
          </Button>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
              <span className="text-xl font-bold text-primary">Thrift</span>
              <span className="text-xl font-light">Hairs</span>
            </div>
            <p className="text-sm text-background/70">
              Affordable, quality thrift hairs for everyone.
              Buy & sell | Neat | Stylish | Budget-friendly
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <p className="mb-4 text-sm text-background/70">
              Have questions? Reach out to us on WhatsApp for quick responses!
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2 border-background/20 text-background hover:bg-background/10 hover:text-background">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chat Now
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 fill-primary text-primary" /> for beautiful hair lovers
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Thrift Hairs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.link/yksnxm";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current text-primary-foreground md:h-8 md:w-8" />
    </a>
  );
};

export default WhatsAppButton;

import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254700000000?text=Hello%20AgriBot!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline">Chat with AgriBot</span>
    </a>
  );
};

export default WhatsAppButton;

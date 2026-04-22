"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";

const PHONE = "381638384196";
const MESSAGE = "Zdravo! Interesuje me besplatna konsultacija.";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("contact_click", {
            channel: "whatsapp",
            cta_location: "floating",
          })
        }
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
        aria-label="Kontaktirajte nas na WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}

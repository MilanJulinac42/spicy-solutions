"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  featured?: boolean;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  featured = false,
}: TestimonialCardProps) {
  return (
    <TiltCard intensity={6}>
      <motion.div
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        className={`group relative rounded-2xl glass hover:border-spicy-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-spicy-400/5 ${
          featured ? "p-8 md:p-10" : "p-6 md:p-8"
        }`}
      >
        {/* Accent line left */}
        <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-spicy-400 to-spicy-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <Quote className={`text-spicy-400/30 mb-4 group-hover:text-spicy-400/60 transition-colors duration-300 ${featured ? "w-10 h-10" : "w-8 h-8"}`} />
        </motion.div>

        {/* Star rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-spicy-400 text-spicy-400"
            />
          ))}
        </div>

        <p className={`text-foreground-secondary leading-relaxed mb-6 italic ${featured ? "text-lg" : ""}`}>
          &ldquo;{quote}&rdquo;
        </p>
        <div>
          <div className={`font-semibold text-foreground ${featured ? "text-lg" : ""}`}>{name}</div>
          <div className="text-sm text-foreground-muted">
            {role}, {company}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

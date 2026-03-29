"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-surface-secondary border border-border-subtle rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-foreground-muted"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

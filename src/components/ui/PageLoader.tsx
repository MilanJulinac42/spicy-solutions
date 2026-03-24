"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
    >
      {/* Glow ring behind icon */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute w-24 h-24 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(255,107,53,0.3), transparent)",
        }}
      />

      {/* Flame icon */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flame className="w-12 h-12 text-spicy-400" />
      </motion.div>

      {/* Brand text */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-4 text-lg font-bold tracking-widest animated-gradient-text"
      >
        SOLVERA
      </motion.span>

      {/* Bouncing dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-spicy-400"
          />
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

const letters = "SOLVERA".split("");

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
    >
      {/* Ring + S container */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "rgba(255,107,53,0.8)",
            borderRightColor: "rgba(255,107,53,0.2)",
          }}
        />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl font-bold text-spicy-400"
        >
          S
        </motion.span>
      </div>

      {/* Letter-by-letter SOLVERA */}
      <div className="flex mt-6 gap-[2px]">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            className="text-sm font-bold tracking-[0.25em] text-foreground-muted"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

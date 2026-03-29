"use client";

import { motion } from "framer-motion";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap ${
          isUser
            ? "bg-spicy-400 text-white rounded-2xl rounded-br-sm"
            : "bg-surface-secondary border border-border-subtle text-foreground rounded-2xl rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

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
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-spicy-400 flex items-center justify-center shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap ${
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

"use client";

import { useState, useRef, useEffect, useCallback, type MutableRefObject } from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type ChatPanelProps = {
  onClose: () => void;
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  nextId: MutableRefObject<number>;
};

export function ChatPanel({ onClose, messages, setMessages, nextId }: ChatPanelProps) {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: nextId.current++,
      role: "user",
      content: text,
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsTyping(true);

    // Prepare assistant message placeholder
    const assistantId = nextId.current++;

    try {
      abortRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.id !== 1) // exclude greeting
            .map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("API error");
      }

      // Stream the response
      setIsTyping(false);
      const withPlaceholder = [
        ...updatedMessages,
        { id: assistantId, role: "assistant" as const, content: "" },
      ];
      setMessages(withPlaceholder);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        const currentContent = fullContent;
        setMessages(
          withPlaceholder.map((m) =>
            m.id === assistantId ? { ...m, content: currentContent } : m
          )
        );
      }

      // Final save with complete content
      setMessages(
        withPlaceholder.map((m) =>
          m.id === assistantId ? { ...m, content: fullContent } : m
        )
      );

      // Check if bot asked for email — try to save lead from conversation
      const finalMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Look for email in user messages
      const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
      for (const msg of updatedMessages) {
        if (msg.role === "user") {
          const match = msg.content.match(emailRegex);
          if (match) {
            saveLead(match[0], finalMessages);
            break;
          }
        }
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages([
        ...updatedMessages,
        {
          id: assistantId,
          role: "assistant",
          content:
            locale === "sr"
              ? "Izvinite, došlo je do greške. Pokušajte ponovo ili nas kontaktirajte na info@solveradev.rs."
              : "Sorry, an error occurred. Please try again or contact us at info@solveradev.rs.",
        },
      ]);
    }
  }

  function saveLead(
    email: string,
    conversation: { role: string; content: string }[]
  ) {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        locale,
        source: "chatbot",
        conversation,
      }),
    }).catch(console.error);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 z-50 w-[380px] max-sm:inset-4 max-sm:bottom-4 max-sm:w-auto flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-surface border border-border-subtle"
      style={{ height: "min(520px, calc(100vh - 120px))" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-spicy-400 to-spicy-500 px-4 py-3 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-white font-semibold text-sm">{t("title")}</h3>
          <p className="text-white/70 text-xs">{t("subtitle")}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          aria-label={t("close")}
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border-subtle shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            rows={1}
            className="flex-1 bg-surface-secondary border border-border-default rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all resize-none overflow-y-auto"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-spicy-400 text-white hover:bg-spicy-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            aria-label={t("send")}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-foreground-muted text-center mt-2">
          {t("poweredBy")}
        </p>
      </div>
    </motion.div>
  );
}

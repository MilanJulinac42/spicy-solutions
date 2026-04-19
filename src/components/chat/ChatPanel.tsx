"use client";

import { useState, useRef, useEffect, useCallback, type MutableRefObject } from "react";
import { motion } from "framer-motion";
import { X, Send, RotateCcw } from "lucide-react";
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
  onReset: () => void;
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  nextId: MutableRefObject<number>;
};

export function ChatPanel({ onClose, onReset, messages, setMessages, nextId }: ChatPanelProps) {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const showSuggestions = messages.length <= 1 && !isTyping;

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Scroll on new messages or typing indicator change
  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isTyping, scrollToBottom]);

  // During streaming: keep pinned to bottom on every content update (instant, no smooth queue lag)
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    // Only auto-scroll if user is near the bottom (don't yank if they scrolled up to read)
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 120) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function handleSend(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText || isTyping) return;

    const userMsg: Message = {
      id: nextId.current++,
      role: "user",
      content: msgText,
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

  const panelContent = (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-spicy-400 to-spicy-500 px-4 py-3 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-white font-semibold text-sm">{t("title")}</h3>
          <p className="text-white/70 text-xs">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label={t("newChat")}
            title={t("newChat")}
          >
            <RotateCcw className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label={t("close")}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {showSuggestions && (
          <div className="flex flex-col gap-2 mt-2">
            {(["q1", "q2", "q3"] as const).map((key) => (
              <button
                key={key}
                onClick={() => handleSend(t(key))}
                className="text-left text-sm px-3 py-2 rounded-lg border border-border-default bg-surface-secondary hover:border-spicy-400/40 hover:bg-surface-tertiary transition-colors text-foreground-secondary"
              >
                {t(key)}
              </button>
            ))}
          </div>
        )}

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
            onClick={() => handleSend()}
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
    </>
  );

  return (
    <>
      {/* Desktop: floating panel */}
      <motion.div
        initial={{ y: 20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="hidden sm:flex fixed z-50 flex-col shadow-2xl overflow-hidden bg-surface border border-border-subtle bottom-24 right-6 w-[380px] rounded-2xl"
        style={{ height: "min(520px, calc(100vh - 120px))" }}
      >
        {panelContent}
      </motion.div>

      {/* Mobile: fullscreen overlay */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sm:hidden fixed inset-0 z-50 flex flex-col bg-surface"
      >
        {panelContent}
      </motion.div>
    </>
  );
}

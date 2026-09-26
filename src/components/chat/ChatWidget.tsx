"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChatPanel } from "./ChatPanel";
import { trackEvent } from "@/lib/analytics";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "solvera-chat-messages";
const NEXT_ID_KEY = "solvera-chat-next-id";

export function ChatWidget() {
  const t = useTranslations("Chat");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const initialized = useRef(false);
  const nextId = useRef(2);

  // Load messages from sessionStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const savedId = sessionStorage.getItem(NEXT_ID_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (parsed.length > 0) {
          setMessages(parsed);
          nextId.current = savedId ? parseInt(savedId) : parsed.length + 1;
          return;
        }
      }
    } catch {}

    // No saved messages — set greeting
    setMessages([{ id: 1, role: "assistant", content: t("greeting") }]);
  }, [t]);

  // Save messages to sessionStorage when they change
  const saveMessages = useCallback((msgs: Message[]) => {
    setMessages(msgs);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
      sessionStorage.setItem(NEXT_ID_KEY, String(nextId.current));
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Allow other parts of the page (e.g. the AI-section demo CTA) to open the
  // chat — optionally with a question that gets sent to the bot automatically.
  useEffect(() => {
    function handleOpenRequest(e: Event) {
      const detail = (e as CustomEvent).detail as
        | { question?: string }
        | undefined;
      setIsVisible(true);
      setShowTooltip(false);
      setIsOpen(true);
      setPendingQuestion(detail?.question ?? null);
      trackEvent("chat_open", {
        channel: "ai_chatbot",
        source: "ai_section_cta",
      });
    }
    window.addEventListener("solvera:open-chat", handleOpenRequest);
    return () =>
      window.removeEventListener("solvera:open-chat", handleOpenRequest);
  }, []);

  const handleQuestionConsumed = useCallback(() => setPendingQuestion(null), []);

  function handleToggle() {
    setIsOpen((prev) => {
      const next = !prev;
      trackEvent(next ? "chat_open" : "chat_close", {
        channel: "ai_chatbot",
      });
      return next;
    });
    setShowTooltip(false);
  }

  function handleReset() {
    nextId.current = 2;
    const greeting = [{ id: 1, role: "assistant" as const, content: t("greeting") }];
    saveMessages(greeting);
  }

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            onClose={() => setIsOpen(false)}
            onReset={handleReset}
            messages={messages}
            setMessages={saveMessages}
            nextId={nextId}
            initialQuestion={pendingQuestion}
            onInitialQuestionConsumed={handleQuestionConsumed}
          />
        )}
      </AnimatePresence>

      <div className={`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 ${isOpen ? "max-sm:hidden" : ""}`}>
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="card-matte relative max-sm:hidden text-foreground px-4 py-2.5 rounded-2xl text-sm font-medium max-w-[220px]"
            >
              {t("tooltip")}
              <button
                onClick={() => setShowTooltip(false)}
                aria-label="Zatvori obaveštenje"
                className="absolute -top-2 -left-2 w-5 h-5 bg-surface-elevated border border-border-default rounded-full flex items-center justify-center hover:bg-surface-tertiary transition-colors"
              >
                <X className="w-3 h-3 text-foreground-muted" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleToggle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-metal w-14 h-14 rounded-full flex items-center justify-center"
          aria-label={isOpen ? t("close") : t("tooltip")}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 text-ink" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-6 h-6 text-ink" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

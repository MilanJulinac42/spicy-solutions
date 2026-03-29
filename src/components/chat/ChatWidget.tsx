"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChatPanel } from "./ChatPanel";

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

  useEffect(() => {
    if (!isVisible || isOpen) return;
    const showTimer = setTimeout(() => setShowTooltip(true), 5000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible, isOpen]);

  function handleToggle() {
    setIsOpen((prev) => !prev);
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
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="relative bg-white text-gray-800 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium max-w-[200px]"
            >
              {t("tooltip")}
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
              {/* Arrow pointing down */}
              <div className="absolute bottom-[-6px] right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleToggle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-spicy-400 rounded-full flex items-center justify-center shadow-lg shadow-spicy-400/30 hover:shadow-xl hover:shadow-spicy-400/40 transition-shadow"
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
                <X className="w-6 h-6 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

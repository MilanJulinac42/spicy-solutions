"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type MutableRefObject,
} from "react";
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
  initialQuestion?: string | null;
  onInitialQuestionConsumed?: () => void;
};

export function ChatPanel({
  onClose,
  onReset,
  messages,
  setMessages,
  nextId,
  initialQuestion = null,
  onInitialQuestionConsumed,
}: ChatPanelProps) {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const desktopMessagesRef = useRef<HTMLDivElement>(null);
  const mobileMessagesRef = useRef<HTMLDivElement>(null);
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

  // The panel is rendered twice — a desktop popover and a mobile sheet — and
  // only one is visible at a time. Each needs its own ref: a single shared ref
  // would end up pointing at whichever mounted last (the hidden one), and
  // scrolling a `display:none` element does nothing.
  function visibleMessagesContainer(): HTMLDivElement | null {
    for (const ref of [desktopMessagesRef, mobileMessagesRef]) {
      const node = ref.current;
      if (node && node.offsetParent !== null) return node;
    }
    return null;
  }

  // Whether the view should keep following new content. Only a deliberate
  // scroll away from the bottom turns this off — measuring distance at render
  // time instead would misread a mid-flight scroll animation and stop
  // following while the answer is still streaming in.
  const stickToBottom = useRef(true);

  useEffect(() => {
    const nodes = [desktopMessagesRef.current, mobileMessagesRef.current].filter(
      (n): n is HTMLDivElement => n !== null
    );
    function handleScroll(e: Event) {
      const node = e.currentTarget as HTMLDivElement;
      const distanceFromBottom =
        node.scrollHeight - node.scrollTop - node.clientHeight;
      stickToBottom.current = distanceFromBottom < 80;
    }
    nodes.forEach((n) => n.addEventListener("scroll", handleScroll, { passive: true }));
    return () => nodes.forEach((n) => n.removeEventListener("scroll", handleScroll));
  }, []);

  // Follow the answer as it streams. Instant (not smooth) so it keeps pace with
  // every chunk, and in a layout effect so it lands before the browser paints.
  useLayoutEffect(() => {
    if (!stickToBottom.current) return;
    const container = visibleMessagesContainer();
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // When opened from a demo CTA with a preset question, send it to the bot
  // automatically. Deferring via setTimeout makes this strict-mode-safe: the
  // throwaway dev mount schedules then cancels the send in its cleanup, so only
  // the stable mount actually fires it (and its fetch isn't aborted mid-flight).
  useEffect(() => {
    if (!initialQuestion) return;
    const id = setTimeout(() => {
      handleSend(initialQuestion);
      onInitialQuestionConsumed?.();
    }, 0);
    return () => clearTimeout(id);
    // handleSend is stable enough for this one-shot trigger; keep deps minimal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function handleSend(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText || isTyping) return;

    // Sending is an intent to see the reply — resume following even if the
    // user had scrolled up to re-read something earlier.
    stickToBottom.current = true;

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
              ? "Izvinite, došlo je do greške. Pokušajte ponovo ili me kontaktirajte na info@solveradev.rs."
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

  const renderPanel = (messagesRef: React.RefObject<HTMLDivElement | null>) => (
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
      <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-3">
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
        {renderPanel(desktopMessagesRef)}
      </motion.div>

      {/* Mobile: fullscreen overlay */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sm:hidden fixed inset-0 z-50 flex flex-col bg-surface"
      >
        {renderPanel(mobileMessagesRef)}
      </motion.div>
    </>
  );
}

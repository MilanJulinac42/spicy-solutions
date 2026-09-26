"use client";

import dynamic from "next/dynamic";

// Defer below-fold floating widgets — they don't need to hydrate before user interaction.
// One floating control only: the chat. WhatsApp used to float in the opposite
// corner and covered content on phones; it now lives in the footer, the
// contact page and the final CTA.
const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
);

export function FloatingWidgets() {
  return <ChatWidget />;
}

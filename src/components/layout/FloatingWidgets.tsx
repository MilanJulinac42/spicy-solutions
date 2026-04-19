"use client";

import dynamic from "next/dynamic";

// Defer below-fold floating widgets — they don't need to hydrate before user interaction
const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsAppButton").then((m) => ({ default: m.WhatsAppButton })),
  { ssr: false }
);

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
);

export function FloatingWidgets() {
  return (
    <>
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}

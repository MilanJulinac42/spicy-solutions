import { trackEvent } from "@/lib/analytics";

/**
 * Opens the site chat widget from anywhere on the page. The ChatWidget listens
 * for the `solvera:open-chat` event; an optional `question` is sent to the bot
 * automatically so a CTA can demo a real answer in one click.
 */
export function openSolveraChat(question?: string, source = "cta") {
  trackEvent("chat_open_request", {
    channel: "ai_chatbot",
    source,
    ...(question ? { question } : {}),
  });
  window.dispatchEvent(
    new CustomEvent("solvera:open-chat", {
      detail: question ? { question } : {},
    })
  );
}

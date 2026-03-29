import { NextRequest } from "next/server";
import OpenAI from "openai";
import { searchKnowledge } from "@/lib/rag";
import { buildSystemPrompt } from "@/lib/chatSystemPrompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = "sr" } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Missing messages", { status: 400 });
    }

    // Get last user message for RAG search
    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === "user");

    if (!lastUserMessage) {
      return new Response("No user message found", { status: 400 });
    }

    // Search knowledge base
    const contextChunks = await searchKnowledge(
      lastUserMessage.content,
      locale,
      4
    );

    // Build system prompt with RAG context
    const systemPrompt = buildSystemPrompt(locale, contextChunks);

    // Limit conversation history
    const recentMessages = messages.slice(-20).map(
      (m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })
    );

    // Stream response from OpenAI
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...recentMessages],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    });

    // Convert to ReadableStream
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, Loader2, AlertCircle, Volume2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Browser voice demo: the visitor talks to the Realtime model over WebRTC.
 * Audio goes straight from the browser to OpenAI — our server only mints the
 * ephemeral token — so this needs no persistent backend and no telephony.
 *
 * Sessions bill by the minute, hence the hard time cap plus the rate limit on
 * the token route.
 */

const MAX_SECONDS = 120;

/** An open mic keeps streaming audio whether anyone is talking or not, so a
 *  demo left open in a tab bills for nothing. End it once it goes quiet. */
const SILENCE_TIMEOUT_MS = 25_000;

type Status = "idle" | "connecting" | "live" | "ended" | "error";

type Line = { role: "user" | "assistant"; text: string };

export function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState(MAX_SECONDS);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const assistantLine = useRef<string>("");
  const lastActivity = useRef<number>(Date.now());

  useEffect(() => stop, []); // eslint-disable-line react-hooks/exhaustive-deps

  function stop(reason: "user" | "timeout" | "error" = "user") {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    pcRef.current?.close();
    pcRef.current = null;

    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current.remove();
      audioRef.current = null;
    }

    setIsSpeaking(false);
    if (reason !== "error") setStatus((s) => (s === "idle" ? "idle" : "ended"));
  }

  async function start() {
    setError("");
    setLines([]);
    setSecondsLeft(MAX_SECONDS);
    setStatus("connecting");
    trackEvent("voice_demo_start", { channel: "ai_voice" });

    try {
      const tokenRes = await fetch("/api/realtime/session", { method: "POST" });
      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}));
        throw new Error(
          body.error || "Ne mogu da uspostavim vezu. Pokušajte ponovo."
        );
      }
      const { value: ephemeralKey } = await tokenRes.json();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audio = document.createElement("audio");
      audio.autoplay = true;
      audioRef.current = audio;
      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
      };

      pc.addTrack(stream.getTracks()[0]);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.addEventListener("message", (e) => handleEvent(JSON.parse(e.data)));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });
      if (!sdpRes.ok) throw new Error("Veza sa AI servisom nije uspela.");

      await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });

      setStatus("live");
      lastActivity.current = Date.now();
      timerRef.current = setInterval(() => {
        if (Date.now() - lastActivity.current > SILENCE_TIMEOUT_MS) {
          stop("timeout");
          trackEvent("voice_demo_end", { channel: "ai_voice", reason: "silence" });
          return;
        }
        setSecondsLeft((s) => {
          if (s <= 1) {
            stop("timeout");
            trackEvent("voice_demo_end", { channel: "ai_voice", reason: "timeout" });
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (err) {
      const message =
        (err as Error).name === "NotAllowedError"
          ? "Pristup mikrofonu je odbijen. Dozvolite mikrofon pa pokušajte ponovo."
          : (err as Error).message || "Došlo je do greške.";
      setError(message);
      setStatus("error");
      stop("error");
      trackEvent("form_error", { form_id: "voice_demo_live" });
    }
  }

  /** Runs a knowledge lookup the model asked for and hands the result back. */
  async function runKnowledgeTool(callId: string, argsJson: string) {
    let result =
      "Greška pri pretrazi. Reci da nemaš podatak i uputi na info@solveradev.rs.";
    try {
      const { pitanje } = JSON.parse(argsJson || "{}");
      const res = await fetch("/api/realtime/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: pitanje }),
      });
      const data = await res.json();
      if (data.result) result = data.result;
    } catch {
      /* keep the fallback message */
    }

    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") return;

    dc.send(
      JSON.stringify({
        type: "conversation.item.create",
        item: { type: "function_call_output", call_id: callId, output: result },
      })
    );
    dc.send(JSON.stringify({ type: "response.create" }));
  }

  function handleEvent(event: {
    type?: string;
    delta?: string;
    transcript?: string;
    response?: { output?: { type?: string; name?: string; call_id?: string; arguments?: string }[] };
  }) {
    const type = event.type ?? "";

    // Anything that means a live exchange is happening keeps the session alive.
    if (
      type.includes("speech_started") ||
      type.includes("speech_stopped") ||
      type.startsWith("response.")
    ) {
      lastActivity.current = Date.now();
    }

    // Tool calls arrive as function_call items on the completed response.
    if (type === "response.done") {
      for (const item of event.response?.output ?? []) {
        if (item.type === "function_call" && item.call_id) {
          void runKnowledgeTool(item.call_id, item.arguments ?? "{}");
        }
      }
    }

    if (type.endsWith("output_audio.delta")) setIsSpeaking(true);

    if (type.endsWith("output_audio_transcript.delta") && event.delta) {
      assistantLine.current += event.delta;
      setLines((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant") {
          next[next.length - 1] = { role: "assistant", text: assistantLine.current };
        } else {
          next.push({ role: "assistant", text: assistantLine.current });
        }
        return next.slice(-6);
      });
    }

    if (type.endsWith("output_audio_transcript.done")) {
      assistantLine.current = "";
      setIsSpeaking(false);
    }

    if (type === "response.done") setIsSpeaking(false);

    if (type.endsWith("input_audio_transcription.completed") && event.transcript) {
      const text = event.transcript.trim();
      if (text) {
        setLines((prev) => [...prev, { role: "user" as const, text }].slice(-6));
      }
    }
  }

  const isLive = status === "live";
  const mmss = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <div className="rounded-2xl border border-border-default bg-surface p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        {/* Orb */}
        <div className="relative mb-5 flex h-24 w-24 items-center justify-center">
          {isLive && (
            <motion.span
              className="absolute inset-0 rounded-full border border-emerald-400/40"
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          )}
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full border transition-colors ${
              isLive
                ? "border-emerald-400/40 bg-emerald-400/10"
                : "border-border-default bg-surface-secondary"
            }`}
          >
            {status === "connecting" ? (
              <Loader2 className="h-8 w-8 animate-spin text-foreground-muted" />
            ) : isSpeaking ? (
              <Volume2 className="h-8 w-8 text-emerald-400" />
            ) : (
              <Mic className={`h-8 w-8 ${isLive ? "text-emerald-400" : "text-foreground-muted"}`} />
            )}
          </div>
        </div>

        <h3 className="mb-1.5 text-lg font-semibold text-foreground">
          {status === "idle" && "Pričaj sa AI agentom"}
          {status === "connecting" && "Povezujem…"}
          {isLive && (isSpeaking ? "AI govori…" : "Slušam te…")}
          {status === "ended" && "Razgovor završen"}
          {status === "error" && "Greška"}
        </h3>

        <p className="mb-5 max-w-md text-sm leading-relaxed text-foreground-muted">
          {status === "idle" &&
            "Klikni, dozvoli mikrofon i pričaj kao da zoveš telefonom. Pitaj ga za cene, usluge ili proces rada."}
          {status === "connecting" && "Traži se dozvola za mikrofon i uspostavlja veza."}
          {isLive && `Preostalo vreme: ${mmss}`}
          {status === "ended" &&
            "Razgovor je završen — prekida se i kad se ne priča, da demo ne troši bez potrebe. Možeš ponovo."}
          {status === "error" && error}
        </p>

        {status === "error" && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {!isLive ? (
          <button
            onClick={start}
            disabled={status === "connecting"}
            className="inline-flex items-center gap-2 rounded-xl bg-spicy-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-spicy-400/30 transition-colors hover:bg-spicy-500 disabled:opacity-50"
          >
            <Mic className="h-4 w-4" />
            {status === "ended" || status === "error" ? "Probaj ponovo" : "Započni razgovor"}
          </button>
        ) : (
          <button
            onClick={() => {
              stop("user");
              trackEvent("voice_demo_end", { channel: "ai_voice", reason: "user" });
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-3.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            <PhoneOff className="h-4 w-4" />
            Prekini
          </button>
        )}

        <p className="mt-3 text-[11px] text-foreground-muted">
          Demo traje najviše {MAX_SECONDS / 60} minuta. Zvuk se ne snima niti čuva.
        </p>
      </div>

      {/* Live transcript */}
      <AnimatePresence>
        {lines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden border-t border-border-subtle pt-5"
          >
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              Transkript
            </div>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed ${
                    line.role === "user" ? "text-foreground-secondary" : "text-foreground"
                  }`}
                >
                  <span className="mr-1.5 font-medium text-foreground-muted">
                    {line.role === "user" ? "Ti:" : "AI:"}
                  </span>
                  {line.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

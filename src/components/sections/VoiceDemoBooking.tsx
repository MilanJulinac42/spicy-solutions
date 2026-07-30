"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, PhoneCall, Settings2, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { VoiceDemo } from "@/components/voice/VoiceDemo";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { FORMSPREE_FORMS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Gated voice demo booking. The demo is deliberately scheduled rather than a
 * public number: it keeps call costs controlled, and more importantly lets the
 * agent be tailored to the caller's industry before the call — which is a
 * stronger pitch than a generic line anyone can dial.
 */

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Zakažeš termin",
    text: "Ostaviš delatnost i kada ti odgovara. Javljam se u roku od 24h sa potvrdom.",
  },
  {
    icon: Settings2,
    title: "Podesim agenta za tebe",
    text: "Pre poziva podesim AI za tvoju delatnost — tvoje usluge, radno vreme, tipična pitanja.",
  },
  {
    icon: PhoneCall,
    title: "AI te pozove",
    text: "U dogovoreno vreme zazvoni ti telefon. Razgovaraš sa agentom kao što bi tvoj klijent.",
  },
  {
    icon: FileText,
    title: "Dobiješ transkript",
    text: "Posle poziva šaljem transkript i iskrenu procenu — šta bi u tvom slučaju radilo, a šta ne.",
  },
];

const INDUSTRIES = [
  "Ordinacija / klinika",
  "Frizerski / kozmetički salon",
  "Agencija (turistička, nekretnine…)",
  "Servis / majstorske usluge",
  "Online prodavnica",
  "Drugo",
];

const TIME_SLOTS = [
  "Radnim danom pre podne (9–12h)",
  "Radnim danom po podne (12–17h)",
  "Radnim danom uveče (17–20h)",
  "Vikendom",
  "Svejedno — javite se sa predlogom",
];

export function VoiceDemoBooking() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || status === "sending") return;

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      industry: String(data.get("industry") || ""),
      preferredTime: String(data.get("preferredTime") || ""),
      need: String(data.get("note") || ""),
      website: String(data.get("website") || ""), // honeypot
      source: "voice_demo",
      locale: "sr",
    };

    try {
      // Email first — it's the channel that actually reaches Milan, so a lead is
      // never lost if the database write fails.
      const mail = await fetch(`https://formspree.io/f/${FORMSPREE_FORMS.voiceDemo}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!mail.ok) throw new Error("mail failed");

      // Then store alongside the chatbot leads. Best effort.
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});

      setStatus("success");
      form.reset();
      setConsent(false);
      trackEvent("voice_demo_request", {
        channel: "ai_voice",
        industry: payload.industry || undefined,
      });
    } catch {
      setStatus("error");
      trackEvent("form_error", { form_id: "voice_demo" });
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">
            <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
              Demo uživo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Zakaži voice demo
          </h2>
          <p className="text-base md:text-lg text-foreground-muted leading-relaxed">
            Ne pušta se javan broj koji svako zove — agent se pre poziva podesi za
            tvoju delatnost, pa čuješ kako bi zvučao kod tebe, a ne uopšteni robot.
          </p>
        </motion.div>

        {/* Live browser demo — hear the voice before booking a real call */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          id="demo"
          className="mx-auto mb-12 max-w-2xl scroll-mt-28"
        >
          <VoiceDemo />
        </motion.div>

        <div className="mb-8 text-center">
          <span className="text-sm text-foreground-muted">
            Hoćeš pravi poziv, sa agentom podešenim za tvoju delatnost? Zakaži ispod.
          </span>
        </div>

        {/* How it works */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="rounded-2xl border border-border-default bg-surface p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tertiary text-foreground-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs text-foreground-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{step.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="mx-auto max-w-2xl rounded-2xl border border-border-default bg-surface p-6 md:p-8"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle className="h-12 w-12 text-emerald-400" />
              <h3 className="text-xl font-semibold text-foreground">Zahtev primljen</h3>
              <p className="max-w-md text-foreground-muted">
                Javljam se u roku od 24h sa potvrdom termina. Do tada podešavam agenta
                za tvoju delatnost.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Names the email in the shared Formspree inbox */}
              <input type="hidden" name="_subject" value="🎙️ Voice demo — zahtev za poziv" />

              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="vd-name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Ime i prezime
                  </label>
                  <input
                    id="vd-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                  />
                </div>
                <div>
                  <label htmlFor="vd-email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="vd-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="vd-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    Broj telefona <span className="text-foreground-muted">(AI zove na ovaj broj)</span>
                  </label>
                  <input
                    id="vd-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+381 6X XXX XXXX"
                    className="w-full rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                  />
                </div>
                <div>
                  <label htmlFor="vd-industry" className="mb-1.5 block text-sm font-medium text-foreground">
                    Delatnost
                  </label>
                  <select
                    id="vd-industry"
                    name="industry"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                  >
                    <option value="" disabled>
                      Izaberi delatnost
                    </option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="vd-time" className="mb-1.5 block text-sm font-medium text-foreground">
                  Kada ti odgovara
                </label>
                <select
                  id="vd-time"
                  name="preferredTime"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                >
                  <option value="" disabled>
                    Izaberi termin
                  </option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="vd-note" className="mb-1.5 block text-sm font-medium text-foreground">
                  Šta bi hteo da AI odradi na pozivu{" "}
                  <span className="text-foreground-muted">(opciono)</span>
                </label>
                <textarea
                  id="vd-note"
                  name="note"
                  rows={3}
                  placeholder="npr. da zakaže termin, odgovori na česta pitanja o cenama…"
                  className="w-full resize-none rounded-lg border border-border-default bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-spicy-400 focus:ring-2 focus:ring-spicy-400/50"
                />
              </div>

              {/* Consent — required before an automated call may be placed */}
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border-default bg-surface-secondary p-4">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-spicy-400"
                />
                <span className="text-sm leading-relaxed text-foreground-muted">
                  Saglasan/na sam da me Solvera AI agent pozove na ostavljeni broj radi
                  demonstracije. Broj koristim isključivo za taj poziv i ne prosleđujem ga
                  trećim licima. Saglasnost mogu povući u bilo kom trenutku na{" "}
                  <span className="text-foreground">info@solveradev.rs</span>.
                </span>
              </label>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Nešto je pošlo po zlu. Pokušaj ponovo ili piši na info@solveradev.rs.
                </div>
              )}

              <button
                type="submit"
                disabled={!consent || status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-spicy-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-spicy-400/25 transition-colors hover:bg-spicy-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PhoneCall className="h-4 w-4" />
                {status === "sending" ? "Šaljem…" : "Zakaži demo poziv"}
              </button>

              <p className="text-center text-xs text-foreground-muted">
                Bez obaveza. Demo je besplatan, a posle poziva dobijaš transkript i iskrenu
                procenu.
              </p>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

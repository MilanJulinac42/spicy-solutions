"use client";

import { motion } from "framer-motion";
import { Phone, PhoneOff, Mic, Calendar, Bot, FileText, Search, Lock, BookOpen } from "lucide-react";

function BrowserWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-tertiary border-b border-border-default">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <div className="flex-1 mx-2">
          <div className="h-5 rounded-md bg-surface border border-border-default flex items-center px-2">
            <span className="text-[10px] text-foreground-muted font-mono">solveradev.rs</span>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function WebsiteIllustration() {
  return (
    <BrowserWindow>
      <div className="space-y-3">
        {/* Nav mockup */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-4 rounded bg-spicy-400/30" />
          <div className="flex gap-3">
            <div className="w-10 h-3 rounded bg-foreground-muted/20" />
            <div className="w-10 h-3 rounded bg-foreground-muted/20" />
            <div className="w-10 h-3 rounded bg-foreground-muted/20" />
          </div>
        </div>
        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2 py-4"
        >
          <div className="w-3/4 h-5 rounded bg-foreground/15" />
          <div className="w-1/2 h-5 rounded bg-foreground/10" />
          <div className="w-full h-3 rounded bg-foreground-muted/10 mt-3" />
          <div className="w-4/5 h-3 rounded bg-foreground-muted/10" />
        </motion.div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          viewport={{ once: true }}
          className="w-24 h-8 rounded-lg bg-spicy-400/80 flex items-center justify-center"
        >
          <span className="text-[10px] text-white font-medium">Kontakt</span>
        </motion.div>
        {/* Cards row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[0.5, 0.6, 0.7].map((delay, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.4 }}
              viewport={{ once: true }}
              className="h-20 rounded-lg bg-surface-tertiary border border-border-default p-2"
            >
              <div className="w-6 h-6 rounded bg-spicy-400/20 mb-2" />
              <div className="w-full h-2 rounded bg-foreground-muted/15" />
              <div className="w-2/3 h-2 rounded bg-foreground-muted/10 mt-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserWindow>
  );
}

function DashboardIllustration() {
  const barHeights = [40, 65, 50, 80, 60, 90, 70];

  return (
    <BrowserWindow>
      <div className="space-y-3">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Korisnici", value: "2,847" },
            { label: "Prihod", value: "+24%" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="p-2 rounded-lg bg-surface-tertiary border border-border-default text-center"
            >
              <div className="text-[10px] text-foreground-muted">{stat.label}</div>
              <div className="text-sm font-bold text-spicy-400">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="h-32 flex items-end gap-1.5 px-2 py-3 rounded-lg bg-surface-tertiary border border-border-default">
          {barHeights.map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1 rounded-t bg-gradient-to-t from-spicy-400 to-spicy-400/40"
            />
          ))}
        </div>

        {/* Table rows */}
        <div className="space-y-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 p-2 rounded bg-surface-tertiary/50"
            >
              <div className="w-6 h-6 rounded-full bg-spicy-400/20" />
              <div className="flex-1 h-2.5 rounded bg-foreground-muted/15" />
              <div className="w-12 h-2.5 rounded bg-spicy-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserWindow>
  );
}

function ChatbotIllustration() {
  const messages = [
    { bot: false, text: "Koji su vaši rokovi isporuke?", delay: 0.2 },
    { bot: true, text: "Standardna isporuka je 3-5 radnih dana. Za hitne porudžbine nudim express opciju sa isporukom u roku od 24h.", delay: 0.6 },
    { bot: false, text: "Koliko košta express?", delay: 1.0 },
    { bot: true, text: "Express isporuka je 500 RSD. Želite li da vam zakazem?", delay: 1.4 },
  ];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shadow-xl">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface-tertiary border-b border-border-default">
        <div className="w-8 h-8 rounded-full bg-spicy-400/20 flex items-center justify-center">
          <span className="text-xs text-spicy-400 font-bold">AI</span>
        </div>
        <div>
          <div className="text-xs font-medium text-foreground">Solvera Bot</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-foreground-muted">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[220px]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: msg.delay, duration: 0.3 }}
            viewport={{ once: true }}
            className={`flex ${msg.bot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                msg.bot
                  ? "bg-surface-tertiary text-foreground-secondary rounded-bl-sm"
                  : "bg-spicy-400/90 text-white rounded-br-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          viewport={{ once: true }}
          className="flex justify-start"
        >
          <div className="bg-surface-tertiary px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-foreground-muted"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border-default flex gap-2">
        <div className="flex-1 h-8 rounded-lg bg-surface-tertiary border border-border-default px-3 flex items-center">
          <span className="text-[10px] text-foreground-muted">Postavite pitanje...</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-spicy-400 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AutomationIllustration() {
  const nodes = [
    { label: "Mejl/Dokument", x: "10%", y: "15%", delay: 0.2 },
    { label: "AI obrada", x: "55%", y: "8%", delay: 0.4 },
    { label: "Klasifikacija", x: "55%", y: "45%", delay: 0.6 },
    { label: "CRM/ERP", x: "10%", y: "55%", delay: 0.8 },
    { label: "Action item", x: "33%", y: "80%", delay: 1.0 },
  ];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-tertiary border-b border-border-default">
        <div className="w-3 h-3 rounded-full bg-spicy-400/60" />
        <span className="text-[10px] text-foreground-muted font-mono">ai-integration.flow</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[10px] text-green-400">Active</span>
        </div>
      </div>

      <div className="relative h-[280px] p-4">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <motion.line
            x1="28%" y1="24%" x2="60%" y2="18%"
            stroke="var(--spicy-400)" strokeWidth="1.5" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }} viewport={{ once: true }}
          />
          <motion.line
            x1="60%" y1="24%" x2="60%" y2="52%"
            stroke="var(--spicy-400)" strokeWidth="1.5" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }} viewport={{ once: true }}
          />
          <motion.line
            x1="55%" y1="58%" x2="28%" y2="62%"
            stroke="var(--spicy-400)" strokeWidth="1.5" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }} viewport={{ once: true }}
          />
          <motion.line
            x1="24%" y1="68%" x2="38%" y2="85%"
            stroke="var(--spicy-400)" strokeWidth="1.5" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }} viewport={{ once: true }}
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.3, type: "spring" }}
            viewport={{ once: true }}
            className="absolute z-10"
            style={{ left: node.x, top: node.y }}
          >
            <div className="px-3 py-2 rounded-lg bg-surface-tertiary border border-border-default hover:border-spicy-400/30 transition-colors flex items-center gap-2 shadow-sm">
              <div className="w-5 h-5 rounded bg-spicy-400/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm bg-spicy-400" />
              </div>
              <span className="text-[11px] font-medium text-foreground whitespace-nowrap">{node.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Animated data pulse on first connection */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-spicy-400 z-20"
          initial={{ left: "28%", top: "24%", opacity: 0 }}
          animate={{
            left: ["28%", "60%", "60%", "28%", "38%"],
            top: ["24%", "18%", "52%", "62%", "85%"],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function VoiceIllustration() {
  const transcript = [
    { who: "caller", text: "Dobar dan, hteo bih da zakažem termin za sutra ujutro.", delay: 0.4 },
    { who: "ai", text: "Naravno. Imam slobodno u 9:00 ili 10:30. Šta vam više odgovara?", delay: 1.1 },
    { who: "caller", text: "9:00 je odlično.", delay: 1.9 },
    { who: "ai", text: "Zakazano za sutra u 9:00. Šaljem vam SMS potvrdu.", delay: 2.5 },
  ];
  const bars = [30, 70, 45, 85, 60, 75, 40, 90, 55, 70, 35, 80];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shadow-xl">
      {/* Call header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-b border-border-default">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center relative"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
        </motion.div>
        <div className="flex-1">
          <div className="text-xs font-medium text-foreground">+381 63 ••• ••42</div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] text-emerald-400 font-mono">U razgovoru · 00:42</span>
          </div>
        </div>
        <span className="text-[9px] text-foreground-muted font-mono px-1.5 py-0.5 rounded bg-surface-tertiary">
          AI
        </span>
      </div>

      {/* Waveform strip */}
      <div className="flex items-center justify-center gap-[3px] h-10 px-4 bg-surface-tertiary/30 border-b border-border-default">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 4 }}
            whileInView={{ height: [4, h, 8, h * 0.7, 4] }}
            transition={{
              delay: 0.2 + i * 0.04,
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="w-[3px] rounded-full bg-gradient-to-t from-emerald-500/60 to-emerald-300"
          />
        ))}
      </div>

      {/* Transcript */}
      <div className="p-4 space-y-2.5 min-h-[180px]">
        <div className="text-[9px] uppercase tracking-wider text-foreground-muted font-mono mb-1">
          Live transkript
        </div>
        {transcript.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-2 items-start"
          >
            <span
              className={`text-[9px] font-mono uppercase shrink-0 mt-0.5 px-1.5 py-0.5 rounded ${
                line.who === "ai"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-surface-tertiary text-foreground-muted"
              }`}
            >
              {line.who === "ai" ? "AI" : "Klijent"}
            </span>
            <span className="text-[11px] text-foreground-secondary leading-relaxed">
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Action footer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 px-4 py-2.5 border-t border-border-default bg-surface-tertiary/30"
      >
        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-[10px] text-foreground-secondary flex-1">
          Termin upisan: sutra 09:00
        </span>
        <span className="text-[9px] font-mono text-emerald-400">✓ Done</span>
      </motion.div>
    </div>
  );
}

function AssistantIllustration() {
  const sources = [
    { icon: FileText, label: "Procedure.pdf", color: "text-blue-400" },
    { icon: BookOpen, label: "Politika HR", color: "text-violet-400" },
    { icon: FileText, label: "Ugovor 2025", color: "text-amber-400" },
  ];

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface-tertiary border-b border-border-default">
        <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
          <Bot className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-foreground">Interni asistent</div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-2.5 h-2.5 text-foreground-muted" />
            <span className="text-[10px] text-foreground-muted">Privatno · self-hosted</span>
          </div>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
          Indeksirano
        </span>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border-default">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-tertiary border border-border-default"
        >
          <Search className="w-3.5 h-3.5 text-foreground-muted shrink-0" />
          <span className="text-[11px] text-foreground-secondary">
            Koliko dana godišnjeg odmora ima novozaposleni?
          </span>
        </motion.div>
      </div>

      {/* Answer */}
      <div className="p-4 space-y-3 min-h-[150px]">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.35 }}
          viewport={{ once: true }}
          className="text-[11px] text-foreground-secondary leading-relaxed"
        >
          Po važećoj politici, zaposleni u prvoj godini ima{" "}
          <span className="text-blue-400 font-medium">20 radnih dana</span>{" "}
          godišnjeg odmora, srazmerno mesecima rada.
        </motion.div>

        {/* Citations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          viewport={{ once: true }}
          className="space-y-1.5"
        >
          <div className="text-[9px] uppercase tracking-wider text-foreground-muted font-mono">
            Izvor
          </div>
          {sources.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-2 py-1.5 rounded bg-surface-tertiary/60 border border-border-default"
              >
                <Icon className={`w-3 h-3 ${s.color} shrink-0`} />
                <span className="text-[10px] text-foreground-secondary flex-1 truncate">
                  {s.label}
                </span>
                <motion.div
                  className={`h-0.5 rounded-full ${s.color.replace("text-", "bg-")} opacity-60`}
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.4 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

const illustrations: Record<string, React.FC> = {
  chatbot: ChatbotIllustration,
  voice: VoiceIllustration,
  assistant: AssistantIllustration,
  aiIntegrations: AutomationIllustration,
  websites: WebsiteIllustration,
  enterprise: DashboardIllustration,
};

export function ServiceIllustration({ serviceId }: { serviceId: string }) {
  const Illustration = illustrations[serviceId];
  if (!Illustration) return null;
  return <Illustration />;
}

"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowUpRight,
  Globe,
  Building2,
  MessageSquare,
  Phone,
  Bot,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════
   ANIMATED PREVIEWS — one per service card
   ═══════════════════════════════════════════ */

function MiniChat({ inView }: { inView: boolean }) {
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3 flex flex-col justify-end gap-2.5">
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="self-end max-w-[75%] px-3 py-2 rounded-2xl rounded-br-sm bg-spicy-400/20 border border-spicy-400/10"
      >
        <span className="text-[10px] text-gray-300 leading-tight">
          {"Koliko košta chatbot za moj sajt?"}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ delay: 0.8, duration: 1.2, times: [0, 0.08, 0.75, 1] }}
        className="self-start flex gap-1 px-3 py-2"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="self-start max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-sm bg-violet-500/10 border border-violet-500/15"
      >
        <span className="text-[10px] text-gray-300 leading-tight">
          {"Setup od 600€, mesečno 10–50€ za model."}
        </span>
      </motion.div>
    </div>
  );
}

function MiniVoice({ inView }: { inView: boolean }) {
  const bars = [30, 65, 45, 80, 55, 70, 40, 60, 35, 75];
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3 flex flex-col items-center justify-center gap-3">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center relative"
      >
        <Phone className="w-5 h-5 text-emerald-400" />
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-full border border-emerald-400/40"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        )}
      </motion.div>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 4 }}
            animate={inView ? { height: [4, h, 8, h * 0.7, 4] } : {}}
            transition={{
              delay: 0.6 + i * 0.05,
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
            className="w-1 rounded-full bg-gradient-to-t from-emerald-500/50 to-emerald-400"
          />
        ))}
      </div>
      <span className="text-[9px] text-gray-500 font-mono">srpski · niska latencija</span>
    </div>
  );
}

function MiniAssistant({ inView }: { inView: boolean }) {
  const docs = ["Procedure.pdf", "Ugovor 2025", "Politika HR", "Onboarding"];
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3 relative">
      <div className="flex items-center gap-2 mb-2">
        <Bot className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[10px] text-gray-400 font-mono">Interni asistent</span>
      </div>
      <div className="space-y-1.5">
        {docs.map((d, i) => (
          <motion.div
            key={d}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
            className="flex items-center gap-2 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]"
          >
            <div className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-[9px] text-gray-400">{d}</span>
            <motion.div
              className="ml-auto h-0.5 bg-blue-400/40 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
              style={{ width: "40%" }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute bottom-3 left-3 right-3 px-2 py-1.5 rounded bg-blue-500/10 border border-blue-400/20"
      >
        <span className="text-[9px] text-gray-300">
          Indeksirano · spremno za pitanja
        </span>
      </motion.div>
    </div>
  );
}

function MiniIntegrations({ inView }: { inView: boolean }) {
  const nodes = [
    { label: "Email", icon: "📨", color: "border-amber-500/30 bg-amber-500/10" },
    { label: "AI", icon: "🧠", color: "border-violet-500/30 bg-violet-500/10" },
    { label: "CRM", icon: "📊", color: "border-blue-500/30 bg-blue-500/10" },
  ];
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] relative flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="flex items-center gap-2">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 260 }}
              className={`w-14 h-14 rounded-2xl ${n.color} border flex flex-col items-center justify-center shadow-lg`}
            >
              <span className="text-base">{n.icon}</span>
              <span className="text-[8px] text-gray-400 mt-0.5">{n.label}</span>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="relative w-10 h-[2px] mx-1">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                  className="absolute inset-0 bg-violet-500/30 origin-left rounded-full"
                />
                {inView && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    initial={{ left: "-4px", opacity: 0 }}
                    animate={{ left: ["-4px", "calc(100% + 4px)"], opacity: [0, 1, 1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: 1.2 + i * 0.5,
                      repeatDelay: 2,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBrowser({ inView }: { inView: boolean }) {
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-b border-white/[0.06]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]/70" />
        <div className="ml-2 flex-1 h-4 rounded-full bg-white/[0.06] max-w-[140px]" />
      </div>
      <div className="p-3 space-y-2.5">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="h-12 rounded bg-gradient-to-r from-spicy-400/20 via-spicy-400/10 to-transparent origin-left"
        />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.35 }}
              className="flex-1 h-12 rounded bg-white/[0.03] border border-white/[0.06]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniDashboard({ inView }: { inView: boolean }) {
  const bars = [55, 35, 75, 45, 85, 60];
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3">
      <div className="flex gap-2 mb-3">
        {[
          { label: "Korisnici", value: "2.4k", cls: "text-blue-400" },
          { label: "Prihod", value: "€12k", cls: "text-emerald-400" },
          { label: "Rast", value: "+18%", cls: "text-amber-400" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.35 }}
            className="flex-1 px-2 py-1.5 rounded bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="text-[8px] text-gray-500 leading-none mb-0.5">{s.label}</div>
            <div className={`text-[11px] font-bold ${s.cls}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-end gap-[5px] h-[72px] px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}
            className="flex-1 rounded-t bg-gradient-to-t from-blue-500/50 to-blue-400/20"
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BENTO CARD wrapper
   ═══════════════════════════════════════════ */

interface BentoCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  animation: React.ReactNode;
  className?: string;
  delay?: number;
}

const accentMap: Record<
  string,
  { hover: string; iconBg: string; iconText: string; ctaBg: string; ctaHover: string }
> = {
  spicy: {
    hover: "hover:border-spicy-400/30",
    iconBg: "bg-spicy-400/10",
    iconText: "text-spicy-400",
    ctaBg: "bg-spicy-400/10 text-spicy-400 border-spicy-400/30",
    ctaHover:
      "hover:bg-spicy-400 hover:text-white hover:border-spicy-400 hover:shadow-lg hover:shadow-spicy-400/30",
  },
  blue: {
    hover: "hover:border-blue-400/30",
    iconBg: "bg-blue-400/10",
    iconText: "text-blue-400",
    ctaBg: "bg-blue-400/10 text-blue-400 border-blue-400/30",
    ctaHover:
      "hover:bg-blue-400 hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/30",
  },
  violet: {
    hover: "hover:border-violet-400/30",
    iconBg: "bg-violet-400/10",
    iconText: "text-violet-400",
    ctaBg: "bg-violet-400/10 text-violet-400 border-violet-400/30",
    ctaHover:
      "hover:bg-violet-400 hover:text-white hover:border-violet-400 hover:shadow-lg hover:shadow-violet-400/30",
  },
  emerald: {
    hover: "hover:border-emerald-400/30",
    iconBg: "bg-emerald-400/10",
    iconText: "text-emerald-400",
    ctaBg: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    ctaHover:
      "hover:bg-emerald-400 hover:text-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-400/30",
  },
};

function BentoCard({
  href,
  icon,
  title,
  description,
  accent,
  animation,
  className = "",
  delay = 0,
}: BentoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const a = accentMap[accent] ?? accentMap.spicy;
  const t = useTranslations();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`group relative rounded-2xl glass overflow-hidden ${a.hover} transition-all duration-500 ${className}`}
    >
      <div className="p-5 pb-0">{animation}</div>
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className={`w-7 h-7 rounded-lg ${a.iconBg} flex items-center justify-center shrink-0`}>
            <span className={a.iconText}>{icon}</span>
          </div>
          <h3 className="text-base font-semibold text-foreground truncate">{title}</h3>
        </div>
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <Link
          href={href}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border ${a.ctaBg} ${a.ctaHover} transition-all`}
        >
          <span>{t("Common.learnMore")}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export function BentoServices() {
  const t = useTranslations();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title={t("ServicesOverview.title")}
          subtitle={t("ServicesOverview.subtitle")}
        />

        {/* Primary — AI */}
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-spicy-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-spicy-400">
            {t("ServicesOverview.primaryLabel")}
          </span>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-10"
        >
          {/* Chatbot — large */}
          <BentoCard
            className="lg:col-span-7"
            href="/usluge/chatbot"
            icon={<MessageSquare className="w-4 h-4" />}
            title={t("ServicesOverview.chatbot.title")}
            description={t("ServicesOverview.chatbot.description")}
            accent="violet"
            delay={0}
            animation={<MiniChat inView={inView} />}
          />

          {/* Voice */}
          <BentoCard
            className="lg:col-span-5"
            href="/usluge/voice"
            icon={<Phone className="w-4 h-4" />}
            title={t("ServicesOverview.voice.title")}
            description={t("ServicesOverview.voice.description")}
            accent="emerald"
            delay={0.1}
            animation={<MiniVoice inView={inView} />}
          />

          {/* Assistant */}
          <BentoCard
            className="lg:col-span-5"
            href="/usluge/assistant"
            icon={<Bot className="w-4 h-4" />}
            title={t("ServicesOverview.assistant.title")}
            description={t("ServicesOverview.assistant.description")}
            accent="blue"
            delay={0.2}
            animation={<MiniAssistant inView={inView} />}
          />

          {/* AI Integrations — large */}
          <BentoCard
            className="lg:col-span-7"
            href="/usluge/aiIntegrations"
            icon={<Sparkles className="w-4 h-4" />}
            title={t("ServicesOverview.aiIntegrations.title")}
            description={t("ServicesOverview.aiIntegrations.description")}
            accent="spicy"
            delay={0.3}
            animation={<MiniIntegrations inView={inView} />}
          />
        </div>

        {/* Secondary — Web */}
        <div className="mb-3 mt-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-foreground-muted" />
          <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted">
            {t("ServicesOverview.secondaryLabel")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BentoCard
            href="/usluge/websites"
            icon={<Globe className="w-4 h-4" />}
            title={t("ServicesOverview.websites.title")}
            description={t("ServicesOverview.websites.description")}
            accent="spicy"
            delay={0}
            animation={<MiniBrowser inView={inView} />}
          />
          <BentoCard
            href="/usluge/enterprise"
            icon={<Building2 className="w-4 h-4" />}
            title={t("ServicesOverview.enterprise.title")}
            description={t("ServicesOverview.enterprise.description")}
            accent="blue"
            delay={0.1}
            animation={<MiniDashboard inView={inView} />}
          />
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";

/**
 * Points blog readers at the live voice demo. Unlike the chat widget, the voice
 * demo needs a microphone and lives on the service page, so this links there
 * rather than starting anything inline.
 */
export function VoiceDemoCTA() {
  return (
    <div className="my-8 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.05] p-5 md:p-6">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          Radi uživo
        </span>
      </div>

      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <PhoneCall className="h-5 w-5 shrink-0 text-emerald-400" />
        <span>Čuj kako zvuči — pričaj sa njim odmah</span>
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
        Na stranici usluge stoji živ glasovni asistent. Dozvoliš mikrofon i pričaš
        sa njim kao preko telefona — pitaj ga za cene ili kako to radi.
      </p>

      <Link
        href="/usluge/voice#demo"
        className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-colors hover:bg-emerald-600"
      >
        <PhoneCall className="h-4 w-4" />
        <span>Probaj glasovni demo</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

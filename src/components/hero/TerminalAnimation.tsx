"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Segment = { text: string; cls: string };

const CODE: Segment[][] = [
  [{ text: "// vaš novi online store", cls: "text-gray-500 italic" }],
  [
    { text: "const ", cls: "text-purple-400" },
    { text: "data ", cls: "text-sky-300" },
    { text: "= ", cls: "text-gray-400" },
    { text: "await ", cls: "text-purple-400" },
    { text: "supabase", cls: "text-green-400" },
  ],
  [
    { text: "  .", cls: "text-gray-300" },
    { text: "from", cls: "text-sky-300" },
    { text: "(", cls: "text-gray-400" },
    { text: '"products"', cls: "text-amber-300" },
    { text: ").", cls: "text-gray-400" },
    { text: "select", cls: "text-sky-300" },
    { text: "(", cls: "text-gray-400" },
    { text: '"*"', cls: "text-amber-300" },
    { text: ")", cls: "text-gray-400" },
  ],
  [],
  [
    { text: "return ", cls: "text-purple-400" },
    { text: "(", cls: "text-gray-400" },
  ],
  [
    { text: "  <", cls: "text-gray-400" },
    { text: "Layout", cls: "text-sky-400" },
    { text: ">", cls: "text-gray-400" },
  ],
  [
    { text: "    <", cls: "text-gray-400" },
    { text: "Hero", cls: "text-sky-400" },
    { text: " />", cls: "text-gray-400" },
  ],
  [
    { text: "    <", cls: "text-gray-400" },
    { text: "Products", cls: "text-sky-400" },
    { text: " ", cls: "" },
    { text: "items", cls: "text-amber-200" },
    { text: "={data}", cls: "text-sky-300" },
    { text: " />", cls: "text-gray-400" },
  ],
  [
    { text: "    <", cls: "text-gray-400" },
    { text: "AIChat", cls: "text-sky-400" },
    { text: " ", cls: "" },
    { text: "model", cls: "text-amber-200" },
    { text: "=", cls: "text-gray-400" },
    { text: '"gpt-4o"', cls: "text-green-400" },
    { text: " />", cls: "text-gray-400" },
  ],
  [
    { text: "  </", cls: "text-gray-400" },
    { text: "Layout", cls: "text-sky-400" },
    { text: ">", cls: "text-gray-400" },
  ],
  [{ text: ")", cls: "text-gray-400" }],
];

const METRICS = [
  { icon: "\u26A1", label: "Load", value: "0.8s", color: "text-green-400" },
  { icon: "\uD83D\uDCC8", label: "PageSpeed", value: "98", color: "text-sky-400" },
  { icon: "\uD83D\uDD12", label: "SEO", value: "100", color: "text-purple-400" },
];

export function TerminalAnimation() {
  const flatChars = useMemo(() => {
    const result: { char: string; cls: string; lineIdx: number }[] = [];
    CODE.forEach((line, lineIdx) => {
      line.forEach((seg) => {
        for (const c of seg.text) {
          result.push({ char: c, cls: seg.cls, lineIdx });
        }
      });
      if (lineIdx < CODE.length - 1) {
        result.push({ char: "\n", cls: "", lineIdx });
      }
    });
    return result;
  }, []);

  const [charIndex, setCharIndex] = useState(0);
  const [showMetrics, setShowMetrics] = useState(false);
  const done = charIndex >= flatChars.length;

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setShowMetrics(true), 500);
      return () => clearTimeout(timer);
    }
    const prev = charIndex > 0 ? flatChars[charIndex - 1] : null;
    const delay = charIndex === 0 ? 700 : prev?.char === "\n" ? 100 : 30;
    const timer = setTimeout(() => setCharIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [charIndex, done, flatChars]);

  const rendered = useMemo(() => {
    const lines: { lineIdx: number; chars: { char: string; cls: string }[] }[] =
      [];
    let current: { char: string; cls: string }[] = [];
    let currentLineIdx = 0;

    for (let i = 0; i < charIndex; i++) {
      const fc = flatChars[i];
      if (fc.char === "\n") {
        lines.push({ lineIdx: currentLineIdx, chars: [...current] });
        current = [];
        currentLineIdx = fc.lineIdx + 1;
      } else {
        current.push({ char: fc.char, cls: fc.cls });
        currentLineIdx = fc.lineIdx;
      }
    }
    lines.push({ lineIdx: currentLineIdx, chars: current });
    return lines;
  }, [charIndex, flatChars]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[11px] text-gray-500 font-mono">
            app.tsx — Solvera
          </span>
        </div>
        <div className="w-12" />
      </div>

      {/* Code area */}
      <div className="p-5 font-mono text-[13px] min-h-[280px] select-none">
        {rendered.map((line, i) => (
          <div key={i} className="flex leading-7">
            <span className="w-6 text-right text-gray-600 mr-5 shrink-0 text-xs tabular-nums leading-7">
              {line.lineIdx + 1}
            </span>
            <span>
              {line.chars.map((c, j) => (
                <span key={j} className={c.cls}>
                  {c.char}
                </span>
              ))}
              {i === rendered.length - 1 && (
                <motion.span
                  className="inline-block w-[2px] h-[1em] align-middle ml-px bg-spicy-400"
                  animate={done ? { opacity: [1, 0] } : { opacity: 1 }}
                  transition={
                    done
                      ? {
                          repeat: Infinity,
                          duration: 0.9,
                          repeatType: "reverse",
                        }
                      : {}
                  }
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Metrics bar */}
      <AnimatePresence>
        {showMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-3 px-5 pb-4 pt-2 border-t border-white/[0.06]"
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
              >
                <span className="text-sm">{m.icon}</span>
                <span className="text-[11px] text-gray-500">{m.label}</span>
                <span className={`text-xs font-bold ${m.color}`}>
                  {m.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <div className="relative p-6 md:p-8 rounded-2xl bg-surface-secondary border border-border-default">
      <Quote className="w-8 h-8 text-spicy-400/30 mb-4" />
      <p className="text-foreground-secondary leading-relaxed mb-6 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div className="font-semibold text-foreground">{name}</div>
        <div className="text-sm text-foreground-muted">
          {role}, {company}
        </div>
      </div>
    </div>
  );
}

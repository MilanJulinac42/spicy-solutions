"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, MessageSquare, Phone, Sparkles, Layers } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatDateSr } from "@/lib/formatDate";

/**
 * Blog index grouped by service. Categories reuse the accent colour each
 * service already has on the home page, so a reader recognises what a post is
 * about before reading a word of it. The newest post is given a wider card —
 * a flat grid of identical tiles gives no sense of what to read first.
 */

type Category = {
  id: string;
  label: string;
  icon: typeof MessageSquare;
  dot: string;
  chip: string;
  chipActive: string;
  hover: string;
};

const CATEGORIES: Category[] = [
  {
    id: "chatbot",
    label: "AI chatbot",
    icon: MessageSquare,
    dot: "bg-violet-400",
    chip: "border-violet-400/30 text-violet-300 hover:border-violet-400",
    chipActive: "border-violet-400 bg-violet-400 text-white",
    hover: "hover:border-violet-400/40",
  },
  {
    id: "voice",
    label: "AI na telefonu",
    icon: Phone,
    dot: "bg-emerald-400",
    chip: "border-emerald-400/30 text-emerald-300 hover:border-emerald-400",
    chipActive: "border-emerald-400 bg-emerald-400 text-white",
    hover: "hover:border-emerald-400/40",
  },
  {
    id: "aiIntegrations",
    label: "AI automatizacija",
    icon: Sparkles,
    dot: "bg-spicy-400",
    chip: "border-spicy-400/30 text-spicy-300 hover:border-spicy-400",
    chipActive: "border-spicy-400 bg-spicy-400 text-white",
    hover: "hover:border-spicy-400/40",
  },
];

const FALLBACK: Category = {
  id: "ostalo",
  label: "Ostalo",
  icon: Layers,
  dot: "bg-foreground-muted",
  chip: "border-border-default text-foreground-secondary hover:border-foreground-muted",
  chipActive: "border-foreground-muted bg-foreground-muted text-surface",
  hover: "hover:border-foreground-muted/40",
};

function categoryOf(post: PostMeta): Category {
  return CATEGORIES.find((c) => c.id === post.service) ?? FALLBACK;
}

export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string>("sve");

  // Only offer filters that actually have posts behind them.
  const available = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => {
      const id = categoryOf(p).id;
      counts.set(id, (counts.get(id) ?? 0) + 1);
    });
    return [...CATEGORIES, FALLBACK]
      .filter((c) => counts.has(c.id))
      .map((c) => ({ ...c, count: counts.get(c.id)! }));
  }, [posts]);

  const visible = useMemo(
    () => (active === "sve" ? posts : posts.filter((p) => categoryOf(p).id === active)),
    [posts, active]
  );

  const [featured, ...rest] = visible;

  return (
    <>
      {/* Filters */}
      {available.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActive("sve")}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              active === "sve"
                ? "border-foreground bg-foreground text-surface"
                : "border-border-default text-foreground-secondary hover:border-foreground-muted"
            }`}
          >
            Sve teme
            <span className="ml-1.5 opacity-60">{posts.length}</span>
          </button>

          {available.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive ? c.chipActive : c.chip
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {c.label}
                <span className="opacity-60">{c.count}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-5 md:grid-cols-2"
        >
          {featured && <PostCard post={featured} featured />}
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  const c = categoryOf(post);
  const Icon = c.icon;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-secondary p-6 transition-all ${c.hover} ${
        featured ? "md:col-span-2 md:p-8" : ""
      }`}
    >
      {/* Category accent along the top edge */}
      <span className={`absolute inset-x-0 top-0 h-0.5 ${c.dot} opacity-60`} />

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary">
          <Icon className="h-3.5 w-3.5" />
          {c.label}
        </span>
        <span className="text-foreground-muted/40" aria-hidden>
          |
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-foreground-muted">
          <time dateTime={post.date}>{formatDateSr(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} min
          </span>
        </span>
      </div>

      <h2
        className={`font-semibold text-foreground transition-colors group-hover:text-spicy-400 ${
          featured ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {post.title}
      </h2>

      <p
        className={`mt-2 flex-1 text-sm leading-relaxed text-foreground-muted ${
          featured ? "md:max-w-2xl" : "line-clamp-3"
        }`}
      >
        {post.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spicy-400">
        Pročitaj
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

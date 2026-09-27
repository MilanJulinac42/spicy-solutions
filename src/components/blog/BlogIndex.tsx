"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, MessageSquare, Phone, Sparkles, Layers, Globe, LayoutDashboard } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatDateSr } from "@/lib/formatDate";

/**
 * Blog index grouped by service. Categories are told apart by icon and label,
 * not colour — one accent across the whole site. The newest post is given a
 * wider card — a flat grid of identical tiles gives no sense of what to read
 * first.
 */

type Category = {
  id: string;
  label: string;
  icon: typeof MessageSquare;
};

const CATEGORIES: Category[] = [
  { id: "websites", label: "Sajtovi", icon: Globe },
  { id: "enterprise", label: "Poslovni sistemi", icon: LayoutDashboard },
  { id: "chatbot", label: "AI na sajtu", icon: MessageSquare },
  { id: "voice", label: "AI na telefonu", icon: Phone },
  { id: "aiIntegrations", label: "AI automatizacija", icon: Sparkles },
];

const FALLBACK: Category = { id: "ostalo", label: "Ostalo", icon: Layers };

const chipBase = "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer";

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
            className={`${chipBase} ${active === "sve" ? "btn-metal" : "btn-matte text-foreground-secondary"}`}
          >
            Sve teme
            <span className="opacity-60">{posts.length}</span>
          </button>

          {available.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`${chipBase} ${isActive ? "btn-metal" : "btn-matte text-foreground-secondary"}`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "" : "text-spicy-300"}`} />
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
      className={`card-matte group relative flex flex-col overflow-hidden rounded-3xl p-6 md:p-7 transition-colors hover:border-[#3C3A38] ${
        featured ? "md:col-span-2 md:p-9" : ""
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
          <Icon className="h-3.5 w-3.5 text-spicy-300" />
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
        className={`font-semibold text-foreground transition-colors group-hover:text-spicy-100 ${
          featured ? "text-2xl md:text-3xl leading-tight" : "text-lg"
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

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-spicy-200">
        Pročitaj
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

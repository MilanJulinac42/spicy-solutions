import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllPosts, formatDateSr } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AI, automatizacija i praktični saveti za srpske firme — konkretno, bez marketinškog blabla. Tekstovi uz žive demoe.",
  alternates: { canonical: "https://www.solveradev.rs/blog" },
};

export default async function BlogPage() {
  const t = await getTranslations("Blog");
  const posts = getAllPosts();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <header className="max-w-2xl mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-foreground-muted leading-relaxed">
            {t("subtitle")}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-foreground-muted">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl glass border border-border-default p-6 transition-all hover:border-spicy-400/30"
              >
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <time dateTime={post.date}>{formatDateSr(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {t("readingTime", { minutes: post.readingMinutes })}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-semibold text-foreground transition-colors group-hover:text-spicy-400">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                  {post.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spicy-400">
                  {t("readPost")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

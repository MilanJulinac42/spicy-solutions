import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPostBySlug, formatDateSr } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { articleSchema, jsonLdString } from "@/lib/jsonld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://www.solveradev.rs/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  return (
    <article className="pt-32 pb-20 md:pt-40 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleSchema(post)) }}
      />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-spicy-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToBlog")}
        </Link>

        <header className="mt-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <time dateTime={post.date}>{formatDateSr(post.date)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-foreground-muted leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* End-of-post CTA */}
        <div className="mt-14 rounded-2xl border border-spicy-400/20 bg-gradient-to-br from-spicy-400/10 to-spicy-400/5 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t("ctaTitle")}
          </h2>
          <p className="mt-2 text-foreground-muted">{t("ctaText")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-spicy-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-spicy-400/25 transition-colors hover:bg-spicy-500"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {post.service && (
              <Link
                href={`/usluge/${post.service}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border-default px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-spicy-400/30 hover:text-spicy-400"
              >
                {t("relatedServiceLabel")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}

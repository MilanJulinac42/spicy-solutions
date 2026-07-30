import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/blog";

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
        <header className="max-w-2xl mb-10 md:mb-12">
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
          <BlogIndex posts={posts} />
        )}
      </Container>
    </section>
  );
}

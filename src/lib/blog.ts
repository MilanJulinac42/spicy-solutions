import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * File-based blog. Posts live as `.mdx` files in `src/content/blog/` with
 * YAML frontmatter. No CMS, no DB — write markdown, commit, deploy.
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  keywords: string[];
  author: string;
  cover?: string;
  /** Related service slug (e.g. "chatbot") → links the post to /usluge/[service]. */
  service?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    author: data.author ?? "Milan Julinac",
    cover: data.cover,
    service: data.service,
    readingMinutes: readingMinutes(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      keywords: p.keywords,
      author: p.author,
      cover: p.cover,
      service: p.service,
      readingMinutes: p.readingMinutes,
    }));
}

export function formatDateSr(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

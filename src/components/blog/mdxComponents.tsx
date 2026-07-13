import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ChatDemoCTA } from "@/components/sections/ChatDemoCTA";
import { RagFlowDiagram } from "@/components/blog/RagFlowDiagram";
import { SaasVsCustom } from "@/components/blog/SaasVsCustom";

/**
 * Styling map for MDX-rendered blog content. The site has no typography plugin,
 * so each element is styled explicitly against the design tokens (works in the
 * forced-dark theme). Custom components (e.g. ChatDemoCTA) are exposed so posts
 * can drop live, interactive blocks straight into the prose.
 */

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/");
  const className =
    "text-spicy-400 font-medium underline decoration-spicy-400/40 underline-offset-2 hover:decoration-spicy-400 transition-colors";
  if (isInternal) {
    return <Link href={href} className={className} {...props} />;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    />
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 scroll-mt-28 text-2xl md:text-3xl font-bold text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 mb-3 scroll-mt-28 text-xl font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-base md:text-lg leading-relaxed text-foreground-muted" {...props} />
  ),
  a: Anchor,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-base md:text-lg text-foreground-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-base md:text-lg text-foreground-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed marker:text-spicy-400/70" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-spicy-400/50 pl-4 italic text-foreground-secondary"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-tertiary px-1.5 py-0.5 font-mono text-[0.85em] text-spicy-300"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117] p-4 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-gray-200"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border-default" />,
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    // Post title is rendered by the page header; discourage a second H1 in body.
    <h2 className="mt-12 mb-4 text-2xl md:text-3xl font-bold text-foreground" {...props} />
  ),
  // Interactive blocks usable from inside a post
  ChatDemoCTA,
  RagFlowDiagram,
  SaasVsCustom,
};

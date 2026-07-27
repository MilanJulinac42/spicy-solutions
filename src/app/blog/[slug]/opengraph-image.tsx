import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "Solvera blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Solvera blog";
  // Long titles need to shrink so they never overflow the card.
  const titleSize = title.length > 70 ? 48 : title.length > 45 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Gradient orbs — same visual language as the site OG */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#FF6B35", lineHeight: 1 }}>
            S
          </div>
          <div style={{ fontSize: 18, letterSpacing: 5, color: "#e5e5e5", fontWeight: 400 }}>
            SOLVERA
          </div>
          <div
            style={{
              marginLeft: 8,
              padding: "4px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,107,53,0.35)",
              color: "#FF6B35",
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            BLOG
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.18,
            zIndex: 1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>
            solveradev.rs
          </div>
          {post?.readingMinutes ? (
            <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.45)" }}>
              {`${post.readingMinutes} min čitanja`}
            </div>
          ) : null}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #FF6B35, rgba(168,85,247,0.8), transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

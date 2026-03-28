import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Solvera - Vi vodite biznis, mi brinemo o tehnologiji";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          {/* S Logo */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#FF6B35",
              lineHeight: 1,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              color: "#e5e5e5",
              fontWeight: 300,
            }}
          >
            SOLVERA
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              marginTop: 32,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 400,
                color: "#e5e5e5",
              }}
            >
              Vi vodite biznis
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#FF6B35",
              }}
            >
              Mi brinemo o tehnologiji
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 2,
              marginTop: 24,
            }}
          >
            solveradev.rs
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #FF6B35, transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

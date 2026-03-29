import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="sr">
      <head>
        <title>404 — Stranica nije pronađena | Solvera</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
          <div
            style={{
              fontSize: "clamp(120px, 20vw, 200px)",
              fontWeight: 800,
              lineHeight: 1,
              background: "linear-gradient(270deg, #FF6B35, #FFA070, #FF6B35, #E55A2B)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite",
              userSelect: "none",
            }}
          >
            404
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "-8px 0 16px" }}>
            Stranica nije pronađena
          </h1>
          <p style={{ color: "#a3a3a3", lineHeight: 1.6, marginBottom: 40 }}>
            Stranica koju tražite ne postoji ili je premeštena.
            <br />
            Proverite URL ili se vratite na početnu.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/sr"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                backgroundColor: "#FF6B35",
                color: "#fff",
                borderRadius: 12,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
                transition: "background-color 0.2s",
              }}
            >
              Početna stranica
            </Link>
            <Link
              href="/sr/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                color: "#fafafa",
                borderRadius: 12,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
                transition: "border-color 0.2s",
              }}
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          a:hover {
            filter: brightness(1.1);
          }
        `}</style>
      </body>
    </html>
  );
}

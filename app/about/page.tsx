import Link from "next/link";

export default function About() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "4rem 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "3rem",
            transition: "color 0.2s",
          }}
        >
          ← back
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "var(--word-main)",
            textShadow: "0 0 40px var(--glow)",
            marginBottom: "2.5rem",
          }}
        >
          about ashna
        </h1>

        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--text-muted)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <p style={{ color: "var(--text)" }}>
            {/* PLACEHOLDER — replace with Ashna's real bio */}
            Ashna is a multi-disciplinary musician, producer, and sound designer
            based in [city]. Her work spans music production, commercial
            composition, vocal arrangement, sound design, and live playback
            engineering.
          </p>
          <p>
            With a background in [background], she brings a unique perspective
            to every project — whether crafting an original score for a brand
            campaign, designing a sonic world from scratch, or collaborating
            with artists in the studio.
          </p>
          <p>
            This playground is a living archive of her creative output —
            finished works, experiments, collaborations, and everything in
            between.
          </p>
        </div>

        {/* Spotify CTA */}
        <div style={{ marginTop: "3rem" }}>
          <a
            href="https://open.spotify.com/artist/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.7rem 1.4rem",
              background: "rgba(29, 185, 84, 0.12)",
              border: "1px solid rgba(29, 185, 84, 0.3)",
              borderRadius: "100px",
              color: "#1DB954",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Listen on Spotify
          </a>
        </div>
      </div>
    </main>
  );
}

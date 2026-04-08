"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Hand-placed positions (% of viewport). Center is 50,50.
// Title "ashna's playground" occupies roughly x:28–72, y:44–56 — all words kept clear of that zone.
// Hand-placed positions (% of viewport). Center is 50,50.
// Title "ashna's playground" occupies roughly x:28–72, y:44–56 — all words kept clear of that zone.
const CATEGORIES = [
  // TOP — above the title
  { label: "music production",          slug: "music-production",          size: 3.0,  x: 50,  y: 18  },
  { label: "composing for commercials", slug: "composing-for-commercials", size: 2.0,  x: 74,  y: 28  },
  { label: "vocal production",          slug: "vocal-production",          size: 1.9,  x: 26,  y: 30  },
  // SIDES — flanking the title
  { label: "sound design",              slug: "sound-design",              size: 2.5,  x: 83,  y: 50  },
  { label: "content",                   slug: "content",                   size: 2.7,  x: 17,  y: 50  },
  // BOTTOM — below the title
  { label: "engineering",               slug: "engineering",               size: 2.4,  x: 50,  y: 78  },
  { label: "graphics",                  slug: "graphics",                  size: 2.2,  x: 72,  y: 68  },
  { label: "playback engineering",      slug: "playback-engineering",      size: 1.75, x: 27,  y: 68  },
  { label: "graveyard",                 slug: "graveyard",                 size: 1.6,  x: 82,  y: 82  },
];

interface WordCloudProps {
  palette: string;
  onPaletteChange: (p: string) => void;
}

export default function WordCloud({ palette, onPaletteChange }: WordCloudProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Drift keyframes injected once */}
      <style>{`
        @keyframes drift-a {
          0%,100% { transform: translate(0,0); }
          25%  { transform: translate(14px,-10px); }
          75%  { transform: translate(-10px,9px); }
        }
        @keyframes drift-b {
          0%,100% { transform: translate(0,0); }
          33%  { transform: translate(-13px,10px); }
          66%  { transform: translate(11px,-12px); }
        }
        @keyframes drift-c {
          0%,100% { transform: translate(0,0); }
          40%  { transform: translate(10px,14px); }
          80%  { transform: translate(-12px,-8px); }
        }
      `}</style>

      {/* Ambient glow blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "45vw", height: "45vw",
          top: "8%", left: "28%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "28vw", height: "28vw",
          bottom: "5%", right: "8%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow2) 0%, transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Category words */}
      {CATEGORIES.map((cat, i) => {
        const isHovered = hovered === cat.slug;
        const isAlt = i % 3 === 0;
        const driftAnim = ["drift-a", "drift-b", "drift-c"][i % 3];
        const driftDuration = `${8 + i * 1.1}s`;

        return (
          /* Outer div: positions the anchor point, handles entrance animation */
          <motion.div
            key={cat.slug}
            style={{
              position: "absolute",
              left: `${cat.x}%`,
              top: `${cat.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={entered ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* Inner div: centers the word and drifts — separate from entrance transform */}
          <div
            style={{
              transform: "translate(-50%, -50%)",
              animation: entered ? `${driftAnim} ${driftDuration} ease-in-out infinite` : "none",
            }}
          >
            <Link
              href={`/category/${cat.slug}`}
              onMouseEnter={() => setHovered(cat.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: `${cat.size}rem`,
                fontWeight: isAlt ? 900 : 700,
                color: isHovered
                  ? "var(--accent2)"
                  : isAlt
                  ? "var(--word-alt)"
                  : "var(--word-main)",
                textDecoration: "none",
                display: "block",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                transition: "color 0.25s ease, text-shadow 0.25s ease, transform 0.25s ease",
                textShadow: isHovered ? "0 0 30px var(--glow), 0 0 60px var(--glow)" : "none",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
            </Link>
          </div>
          </motion.div>
        );
      })}

      {/* Center title — outer div handles centering, inner handles animation */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={entered ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "var(--accent2)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textShadow: "0 0 40px var(--glow2), 0 0 80px var(--glow2)",
            whiteSpace: "nowrap",
          }}
        >
          ashna&apos;s playground
        </div>
      </motion.div>
      </div>

      {/* Bottom nav */}
      <motion.nav
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          zIndex: 20,
        }}
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link
          href="/about"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          About
        </Link>
        <a
          href="https://open.spotify.com/artist/PLACEHOLDER"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1DB954")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Spotify
        </a>
      </motion.nav>

      {/* Palette switcher */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          right: "1.5rem",
          display: "flex",
          gap: "0.5rem",
          zIndex: 20,
        }}
      >
        {(["void", "wax", "liquid"] as const).map((p) => (
          <button
            key={p}
            onClick={() => onPaletteChange(p)}
            title={p}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: palette === p ? "2px solid var(--text)" : "2px solid transparent",
              background: p === "void" ? "#7c3aed" : p === "wax" ? "#c97c2e" : "#e91e8c",
              cursor: "pointer",
              padding: 0,
              transition: "border 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

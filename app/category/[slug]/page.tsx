import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import AudioPlayer from "@/app/components/AudioPlayer";

interface Track {
  title: string;
  artist: string;
  file: string;
}

interface CategoryData {
  title: string;
  slug: string;
  description: string;
  tracks: Track[];
}

function getCategory(slug: string): CategoryData | null {
  const dir = path.join(process.cwd(), "content", "categories");
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    title: data.title ?? slug,
    slug: data.slug ?? slug,
    description: data.description ?? "",
    tracks: data.tracks ?? [],
  };
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "categories");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(".md", "") }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "2rem 2.5rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "flex-start",
          gap: "1.5rem",
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
            marginTop: "0.4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={undefined}
        >
          ← back
        </Link>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "var(--word-main)",
              textShadow: "0 0 40px var(--glow)",
              marginBottom: "0.5rem",
            }}
          >
            {category.title}
          </h1>
          {category.description && (
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                maxWidth: "50ch",
              }}
            >
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Tracks */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
        }}
      >
        <AudioPlayer tracks={category.tracks} />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "20%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </main>
  );
}

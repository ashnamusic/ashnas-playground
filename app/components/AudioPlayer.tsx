"use client";

import { useEffect, useRef, useState } from "react";

interface Track {
  title: string;
  artist: string;
  file: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

function formatTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function WaveIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {[2, 5, 8, 11, 14].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={playing ? 3 : 6}
          width="2"
          height={playing ? 12 : 6}
          rx="1"
          fill="currentColor"
          style={{
            transformOrigin: `${x + 1}px 9px`,
            animation: playing
              ? `wave-bar ${0.6 + i * 0.1}s ease-in-out infinite alternate`
              : "none",
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </svg>
  );
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function loadTrack(idx: number) {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(tracks[idx].file);
    audioRef.current = audio;
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    });
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });

    audio.play();
    setPlaying(true);
    setActiveIdx(idx);
  }

  function togglePlay(idx: number) {
    if (activeIdx === idx && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    } else {
      loadTrack(idx);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>, idx: number) {
    if (activeIdx !== idx || !audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  if (tracks.length === 0) {
    return (
      <p style={{ color: "var(--text-muted)", fontStyle: "italic", padding: "2rem 0" }}>
        No tracks yet — check back soon.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {tracks.map((track, idx) => {
        const isActive = activeIdx === idx;
        const isPlaying = isActive && playing;

        return (
          <div
            key={idx}
            style={{
              background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${isActive ? "var(--accent1)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "12px",
              padding: "1.2rem 1.5rem",
              transition: "all 0.25s ease",
              boxShadow: isActive ? "0 0 20px var(--glow)" : "none",
            }}
          >
            {/* Top row: play + title */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => togglePlay(idx)}
                aria-label={isPlaying ? "Pause" : "Play"}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  background: isActive ? "var(--accent1)" : "rgba(255,255,255,0.1)",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseDown={e => (e.currentTarget.style.transform = "scale(0.93)")}
                onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                {isPlaying ? (
                  <WaveIcon playing={true} />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 2.5l11 5.5-11 5.5V2.5z" />
                  </svg>
                )}
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 0.2s",
                  }}
                >
                  {track.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {track.artist}
                </div>
              </div>

              {/* Time */}
              <div
                style={{
                  fontFamily: "var(--font-inter), monospace",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                  letterSpacing: "0.05em",
                }}
              >
                {isActive ? `${formatTime(currentTime)} / ${formatTime(duration)}` : formatTime(duration)}
              </div>
            </div>

            {/* Progress bar */}
            <div
              onClick={(e) => seek(e, idx)}
              style={{
                marginTop: "1rem",
                height: "3px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "2px",
                cursor: isActive ? "pointer" : "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${isActive ? progress * 100 : 0}%`,
                  background: "linear-gradient(90deg, var(--accent1), var(--accent2))",
                  borderRadius: "2px",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

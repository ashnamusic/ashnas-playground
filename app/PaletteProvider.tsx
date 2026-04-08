"use client";

import { useState, useEffect } from "react";
import WordCloud from "./WordCloud";

export default function PaletteProvider() {
  const [palette, setPalette] = useState("void");

  useEffect(() => {
    const stored = localStorage.getItem("ashna-palette");
    if (stored) setPalette(stored);
  }, []);

  function handlePaletteChange(p: string) {
    setPalette(p);
    localStorage.setItem("ashna-palette", p);
  }

  return (
    <div data-palette={palette === "void" ? undefined : palette}>
      <WordCloud palette={palette} onPaletteChange={handlePaletteChange} />
    </div>
  );
}

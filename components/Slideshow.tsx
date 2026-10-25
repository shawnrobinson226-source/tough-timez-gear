"use client";

import { useEffect, useState } from "react";
import Picture from "@/components/Picture";
import type { PictureData } from "@/lib/images";

// Home slideshow: slides sit side by side in a track that slides horizontally, so the
// frame keeps the tallest slide's natural ratio; autoplays like live and pauses on hover/focus.
export default function Slideshow({ slides }: { slides: PictureData[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div
      className="slideshow"
      data-shot="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slideshow__track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="slideshow__slide" aria-hidden={i !== active}>
            <Picture data={s} className="slideshow__image" />
          </div>
        ))}
      </div>
      <ul className="slideshow__dots">
        {slides.map((_, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

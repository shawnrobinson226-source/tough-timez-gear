"use client";

import { useRef, useState } from "react";
import Picture from "@/components/Picture";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import type { PictureData } from "@/lib/images";

// Product images: stacked at natural ratio on desktop, a swipeable carousel with an
// "N of M" counter on small screens (as live).
export default function Gallery({ name, images, of }: { name: string; images: PictureData[]; of: string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const go = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const next = (index + images.length) % images.length;
    list.scrollTo({ left: next * list.clientWidth, behavior: "smooth" });
    setCurrent(next);
  };

  const onScroll = () => {
    const list = listRef.current;
    if (list && list.clientWidth) setCurrent(Math.round(list.scrollLeft / list.clientWidth));
  };

  return (
    <div className="gallery" data-shot="product-image">
      <div className="gallery__list" ref={listRef} onScroll={onScroll} role="group" aria-label={`${name} images`}>
        {images.map((img, i) => (
          <div key={i} className="gallery__slide">
            <Picture data={img} className="gallery__image" />
          </div>
        ))}
      </div>
      <div className="gallery__controls">
        <button className="icon-button" aria-label="View previous image" onClick={() => go(current - 1)}>
          <ArrowLeft />
        </button>
        <div>
          <span>{current + 1}</span> {of} {images.length}
        </div>
        <button className="icon-button" aria-label="View next image" onClick={() => go(current + 1)}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

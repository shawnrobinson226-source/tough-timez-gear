"use client";

import { useRef, useState } from "react";
import Picture from "@/components/Picture";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import type { PictureData } from "@/lib/images";

// Product images: stacked at natural ratio on desktop; on small screens a swipeable
// carousel with thumbnail buttons and an "N of M" counter (as live).
export default function Gallery({
  name,
  images,
  thumbs,
  of,
}: {
  name: string;
  images: PictureData[];
  thumbs: PictureData[];
  of: string;
}) {
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
      {images.length > 1 && (
        <>
          <ul className="gallery__thumbs">
            {thumbs.map((thumb, i) => (
              <li key={i} className="gallery__thumb" aria-current={i === current ? "true" : undefined}>
                <button type="button" aria-label={`View image ${i + 1} ${of} ${images.length}`} onClick={() => go(i)}>
                  <Picture data={thumb} />
                </button>
              </li>
            ))}
          </ul>
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
        </>
      )}
    </div>
  );
}

import type { PictureData } from "@/lib/images";

// <picture> with an AVIF source and the next/image-generated WebP <img> as fallback.
export default function Picture({ data, className }: { data: PictureData; className?: string }) {
  const { alt, ...img } = data.img;
  return (
    <picture>
      {data.avifSrcSet && <source type="image/avif" srcSet={data.avifSrcSet} sizes={img.sizes} />}
      {/* Props come from next/image getImageProps (lib/images.ts). */}
      <img alt={alt} {...img} className={className} />
    </picture>
  );
}

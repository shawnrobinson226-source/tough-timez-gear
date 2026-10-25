// Builds next/image props for the pre-generated AVIF/WebP variants in the manifest.
// Server-only helper: the returned props are plain data and can be passed to client components.
import { getImageProps, type ImageLoader } from "next/image";
import type { ManifestImage } from "@/lib/data";

export type PictureData = {
  avifSrcSet: string | undefined;
  img: ReturnType<typeof getImageProps>["props"];
};

// Pick the smallest variant at least as wide as requested, else the largest there is.
const variantLoader =
  (image: ManifestImage, format: "avif" | "webp"): ImageLoader =>
  ({ width }) => {
    const files = image.files.filter((f) => f.format === format).sort((a, b) => a.width - b.width);
    return (files.find((f) => f.width >= width) ?? files[files.length - 1]).src;
  };

export function pictureData(
  image: ManifestImage,
  { alt, sizes, preload = false }: { alt: string; sizes: string; preload?: boolean },
): PictureData {
  const common = {
    src: image.files[0].src,
    alt,
    sizes,
    width: image.width,
    height: image.height,
    ...(preload ? { preload: true, fetchPriority: "high" as const } : {}),
  };
  const avif = getImageProps({ ...common, loader: variantLoader(image, "avif") }).props;
  const webp = getImageProps({ ...common, loader: variantLoader(image, "webp") }).props;
  return { avifSrcSet: avif.srcSet, img: webp };
}

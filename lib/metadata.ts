import type { Metadata } from "next";
import { site } from "@/lib/data";

type RouteMeta = { title: string; description: string | null; ogImage: string | null };
const routeMeta = site.routeMeta as Record<string, RouteMeta>;

// Live og:image URLs point at the Big Cartel CDN. The site-wide image is served from
// public/; product images keep their live CDN URL (as live does).
const ogImageUrl = (url: string | null) =>
  !url ? undefined : url === site.metadata.og.image ? "/img/site/og-image.png" : `${url}?auto=format&fit=max&h=1200&w=1200`;

// Metadata exactly as live serves it for a route; falls back to the site defaults.
export function metaFor(route: string, fallbackTitle?: string): Metadata {
  const m = routeMeta[route];
  const title = m?.title ?? (fallbackTitle ? `${fallbackTitle} | ${site.metadata.og.siteName}` : site.metadata.title);
  const description = m?.description ?? site.metadata.description;
  const image = ogImageUrl(m?.ogImage ?? site.metadata.og.image);
  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "website",
      siteName: site.metadata.og.siteName,
      title,
      description,
      url: route.startsWith("/") ? route : "/",
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

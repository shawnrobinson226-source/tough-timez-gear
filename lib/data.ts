// Typed access to the generated data files. Never edit the JSON by hand:
// re-run scripts/import-bigcartel.mjs, scripts/import-pages.mjs and scripts/fetch-images.mjs.
import productsJson from "@/data/products.json";
import siteJson from "@/data/site.json";
import manifestJson from "@/data/image-manifest.json";

export type Category = { name: string; permalink: string };
export type ProductOption = { label: string; sold_out: boolean };
export type Product = {
  name: string;
  slug: string;
  price: number;
  status: string;
  on_sale: boolean;
  category: Category | null;
  categories: Category[];
  options: ProductOption[];
  description: string;
  images: { url: string; width: number; height: number }[];
};
export type ImageFile = { width: number; format: string; src: string; height?: number };
export type ManifestImage = { width: number; height: number; files: ImageFile[] };
export type NavLink = { label: string; href: string };

export const products = productsJson as Product[];
export const site = siteJson;
export const manifest = manifestJson as unknown as {
  products: Record<string, (ManifestImage & { index: number })[]>;
  site: Record<string, ManifestImage>;
};

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (permalink: string) => site.categories.find((c) => c.permalink === permalink);
export const productImages = (slug: string) => manifest.products[slug] ?? [];

export const categoryProducts = (permalink: string) =>
  products.filter((p) => p.categories.some((c) => c.permalink === permalink));

export const featuredProducts = () =>
  site.home.featuredSlugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));

export function searchProducts(term: string) {
  const q = term.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => `${p.name} ${p.description}`.toLowerCase().includes(q));
}

// Deterministic "You might also like": the next 3 products in the same category after
// the current one, wrapping around; short categories are filled from the home Featured
// order, skipping the current product.
export function relatedProducts(product: Product, count = 3) {
  const picks: Product[] = [];
  if (product.category) {
    const list = categoryProducts(product.category.permalink);
    const at = list.findIndex((p) => p.slug === product.slug);
    for (let i = 1; i < list.length && picks.length < count; i++) picks.push(list[(at + i) % list.length]);
  }
  for (const p of featuredProducts()) {
    if (picks.length >= count) break;
    if (p.slug !== product.slug && !picks.includes(p)) picks.push(p);
  }
  return picks;
}

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Matches how the live store renders descriptions: blank lines start a new paragraph,
// single line breaks become <br>.
export const descriptionParagraphs = (text: string) =>
  text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .filter((para) => para.trim())
    .map((para) => para.replace(/\n+$/, "").split("\n"));

export const trimLabel = (label: string) => label.trim();

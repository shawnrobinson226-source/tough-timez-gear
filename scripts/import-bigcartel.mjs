// Fetches the live Big Cartel product feed and writes data/products.json.
// Copy is kept verbatim; only names, categories and option labels are trimmed.
import { writeFile, mkdir } from "node:fs/promises";

const BASE = "https://www.toughtimezgear.com";
const EXPECTED_PRODUCTS = 42;
const EXPECTED_IMAGES = 89;

export function stripQuery(url) {
  const u = new URL(url);
  u.search = "";
  return u.toString();
}

export function normalizeProduct(p) {
  const cat = p.categories?.[0];
  return {
    name: p.name.trim(),
    slug: p.permalink,
    price: p.price,
    status: p.status,
    on_sale: p.on_sale,
    category: cat ? { name: cat.name.trim(), permalink: cat.permalink } : null,
    categories: (p.categories ?? []).map((c) => ({ name: c.name.trim(), permalink: c.permalink })),
    options: (p.options ?? []).map((o) => ({ label: o.name.trim(), sold_out: o.sold_out })),
    description: p.description,
    images: (p.images ?? []).map((i) => ({ url: stripQuery(i.url), width: i.width, height: i.height })),
  };
}

export async function fetchLiveProducts() {
  const res = await fetch(`${BASE}/products.json`, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`products.json returned HTTP ${res.status}`);
  return (await res.json()).map(normalizeProduct);
}

async function main() {
  const products = await fetchLiveProducts();
  const imageCount = products.reduce((n, p) => n + p.images.length, 0);
  if (products.length !== EXPECTED_PRODUCTS || imageCount !== EXPECTED_IMAGES) {
    throw new Error(
      `Expected ${EXPECTED_PRODUCTS} products / ${EXPECTED_IMAGES} images, got ${products.length} / ${imageCount}`,
    );
  }
  await mkdir("data", { recursive: true });
  await writeFile("data/products.json", JSON.stringify(products, null, 2) + "\n");
  console.log(`Wrote data/products.json: ${products.length} products, ${imageCount} images`);
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}

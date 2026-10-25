// Downloads the largest CDN-served copy of every product and site image, verifies
// pixel dimensions against the feed, and writes AVIF/WebP variants plus
// data/image-manifest.json. Copies are kept outside the repo in ..\ttg-image-originals.
//
// The Big Cartel CDN caps unparameterised requests at 1600 px, so each image is
// requested with ?w=<feed width>. The CDN never upscales, so this returns the
// largest copy it holds. These are CDN re-encodes, not the owner's uploads.
import { mkdir, readFile, writeFile, access, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const STORE = "https://www.toughtimezgear.com";
const COPIES_DIR = path.resolve("..", "ttg-image-originals");
const WIDTHS = [640, 960, 1440, 2000];
const CONCURRENCY = 4;
// Theme images have no feed dimensions; the CDN caps any width at the native size.
const SITE_MAX_W = 6000;

const products = JSON.parse(await readFile("data/products.json", "utf8"));
const site = JSON.parse(await readFile("data/site.json", "utf8"));

const exists = (p) => access(p).then(() => true, () => false);
const fileName = (url) => decodeURIComponent(new URL(url).pathname.split("/").filter(Boolean).slice(-2).join("-"));

async function download(url, dest) {
  if (await exists(dest)) return readFile(dest);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf;
}

async function variants(buf, outDir, base, width) {
  await mkdir(outDir, { recursive: true });
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, WIDTHS.at(-1)));
  const files = [];
  for (const w of [...new Set(widths)]) {
    for (const format of ["avif", "webp"]) {
      const name = `${base}-${w}.${format}`;
      const out = path.join(outDir, name);
      if (!(await exists(out))) {
        const img = sharp(buf).resize({ width: w, withoutEnlargement: true });
        await (format === "avif" ? img.avif({ quality: 60, effort: 4 }) : img.webp({ quality: 80 })).toFile(out);
      }
      files.push({ width: w, format, src: "/" + path.relative("public", out).replaceAll("\\", "/") });
    }
  }
  return files;
}

async function pool(items, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i], i);
      }
    }),
  );
  return results;
}

await mkdir(COPIES_DIR, { recursive: true });

const productJobs = products.flatMap((p) =>
  p.images.map((img, i) => ({ kind: "product", slug: p.slug, index: i + 1, ...img })),
);
const siteJobs = [
  { kind: "site", key: "logo", url: site.layout.logo.url },
  ...site.home.slideshow.map((s, i) => ({ kind: "site", key: `slideshow-${i + 1}`, url: s.url })),
  { kind: "site", key: "og-image", url: site.metadata.og.image },
];

const shortfalls = [];
const manifest = { generatedAt: new Date().toISOString(), note: "Largest CDN-served copies; not owner uploads.", products: {}, site: {} };

const productEntries = await pool(productJobs, async (job) => {
  const dest = path.join(COPIES_DIR, `${job.slug}-${job.index}-${fileName(job.url)}`);
  const buf = await download(`${job.url}?w=${job.width}`, dest);
  const meta = await sharp(buf).metadata();
  if (meta.width < job.width || meta.height < job.height) {
    shortfalls.push({ ...job, gotWidth: meta.width, gotHeight: meta.height });
  }
  const files = await variants(buf, path.join("public", "img", "products", job.slug), String(job.index), meta.width);
  return { job, entry: { index: job.index, source: "cdn-derived", sourceUrl: job.url, feedWidth: job.width, feedHeight: job.height, width: meta.width, height: meta.height, files } };
});
for (const { job, entry } of productEntries) (manifest.products[job.slug] ??= []).push(entry);

for (const job of siteJobs) {
  const dest = path.join(COPIES_DIR, `site-${job.key}-${fileName(job.url)}`);
  const buf = await download(`${job.url}?w=${SITE_MAX_W}`, dest);
  const meta = await sharp(buf).metadata();
  const entry = { source: "cdn-derived", sourceUrl: job.url, width: meta.width, height: meta.height };
  if (job.key === "og-image") {
    // Open Graph needs a single PNG/JPEG; keep the live 1200 px box, never upscaled.
    await mkdir("public/img/site", { recursive: true });
    await sharp(buf).resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).png().toFile("public/img/site/og-image.png");
    const og = await sharp("public/img/site/og-image.png").metadata();
    entry.files = [{ width: og.width, height: og.height, format: "png", src: "/img/site/og-image.png" }];
  } else {
    entry.files = await variants(buf, path.join("public", "img", "site"), job.key, meta.width);
  }
  manifest.site[job.key] = entry;
}

// Favicons are served by the store root as-is.
for (const name of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"]) {
  const res = await fetch(`${STORE}/${name}`);
  if (!res.ok) throw new Error(`/${name} returned HTTP ${res.status}`);
  await writeFile(path.join("public", name), Buffer.from(await res.arrayBuffer()));
}
await rm("app/favicon.ico", { force: true });

await writeFile("data/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
await writeFile(path.join(COPIES_DIR, "shortfalls.json"), JSON.stringify(shortfalls, null, 2));
const count = Object.values(manifest.products).reduce((n, a) => n + a.length, 0);
console.log(`Manifest: ${count} product images, ${Object.keys(manifest.site).length} site images; ${shortfalls.length} smaller than feed`);
if (count !== 89) throw new Error(`Expected 89 product images, got ${count}`);

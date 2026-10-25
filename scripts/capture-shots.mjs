// Full-page screenshots of the key pages at 1440 and 390 px wide.
// Usage: node scripts/capture-shots.mjs <baseUrl> <outDir>
//   live:  node scripts/capture-shots.mjs https://www.toughtimezgear.com docs/reference-shots
//   build: node scripts/capture-shots.mjs http://localhost:3000 docs/build-shots
// Also records rendered widths used by the low-res check (measurements.json).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const [base = "https://www.toughtimezgear.com", outDir = "docs/reference-shots"] = process.argv.slice(2);
const PAGES = [
  ["home", "/"],
  ["products", "/products"],
  ["category-tshirts", "/category/tshirts"],
  ["product-news-anchor-tee", "/product/news-anchor-tee"],
];
const WIDTHS = [1440, 390];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const measurements = {};
for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const [name, route] of PAGES) {
    const res = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    // Scroll to trigger lazy images, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    // Lazy iframes (the home YouTube embed) need to be in view long enough to load and paint.
    for (const frame of await page.locator("iframe").all()) {
      await frame.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(4000);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, `${name}-${width}.png`), fullPage: true });
    measurements[`${name}-${width}`] = await page.evaluate(() => {
      const w = (sel) => document.querySelector(sel)?.getBoundingClientRect().width ?? null;
      return {
        productImage: w(".product-images img, [data-shot='product-image'] img"),
        gridTile: w(".product-list-image-container, [data-shot='grid-tile']"),
        slideshow: w(".home-slideshow img, [data-shot='slideshow'] img"),
        logo: w("img.store-logo, [data-shot='logo'] img"),
      };
    });
    console.log(res?.status(), width, route);
  }
  await context.close();
}
await browser.close();
await writeFile(path.join(outDir, "measurements.json"), JSON.stringify(measurements, null, 2) + "\n");

// Compares data/products.json to the live feed and checks every route on a local build.
// Usage: node scripts/parity-check.mjs [localBaseUrl]   (default http://localhost:3000)
// Exits non-zero on any difference. Writes docs/parity-results.json.
import { readFile, writeFile } from "node:fs/promises";
import * as cheerio from "cheerio";
import { fetchLiveProducts } from "./import-bigcartel.mjs";

const LOCAL = process.argv[2] ?? "http://localhost:3000";
const failures = [];
const fail = (msg) => failures.push(msg);

const local = JSON.parse(await readFile("data/products.json", "utf8"));
const site = JSON.parse(await readFile("data/site.json", "utf8"));
const live = await fetchLiveProducts();

// 1. Data parity with the live feed.
if (local.length !== live.length) fail(`product count: local ${local.length}, live ${live.length}`);
const liveSlugs = live.map((p) => p.slug).join(",");
if (local.map((p) => p.slug).join(",") !== liveSlugs) fail("slug list or order differs from live");
const fields = {
  name: (p) => p.name,
  price: (p) => p.price,
  status: (p) => p.status,
  on_sale: (p) => p.on_sale,
  categories: (p) => JSON.stringify(p.categories),
  options: (p) => JSON.stringify(p.options.map((o) => o.label)),
  sold_out: (p) => JSON.stringify(p.options.map((o) => o.sold_out)),
  description: (p) => p.description,
  image_count: (p) => p.images.length,
  image_urls: (p) => JSON.stringify(p.images.map((i) => i.url)),
};
for (const lp of live) {
  const p = local.find((x) => x.slug === lp.slug);
  if (!p) {
    fail(`missing product ${lp.slug}`);
    continue;
  }
  for (const [key, get] of Object.entries(fields)) {
    if (get(p) !== get(lp)) fail(`${lp.slug}: ${key} differs`);
  }
}
const liveImages = live.reduce((n, p) => n + p.images.length, 0);
const localImages = local.reduce((n, p) => n + p.images.length, 0);
if (liveImages !== localImages) fail(`image count: local ${localImages}, live ${liveImages}`);

// 2. Every route on the local build.
const routes = [
  "/",
  "/products",
  ...site.categories.map((c) => `/category/${c.permalink}`),
  ...local.map((p) => `/product/${p.slug}`),
  "/mission-statement",
  "/tough-timez-gear-media",
  "/refund-policy",
  "/terms-of-service",
  "/cart",
  "/contact",
];
const pages = {};
for (const route of routes) {
  const res = await fetch(LOCAL + route);
  if (res.status !== 200) fail(`${route} returned ${res.status}`);
  pages[route] = await res.text();
}

// 3. Rendered content checks against the data files.
const norm = (s) => s.replace(/\s+/g, " ").trim();
const $home = cheerio.load(pages["/"]);
const headerLinks = $home("#header-dropdown a").map((_, a) => [[$home(a).text(), $home(a).attr("href")]]).get();
if (JSON.stringify(headerLinks) !== JSON.stringify(site.layout.headerNav.map((l) => [l.label.trim(), l.href])))
  fail("header Shop navigation differs");
const footerCats = $home("[aria-label='Footer categories'] a").map((_, a) => $home(a).text()).get();
if (JSON.stringify(footerCats) !== JSON.stringify(site.layout.footer.categories.map((l) => l.label.trim())))
  fail("footer categories differ");
if ($home(".announcement__text").length !== site.home.announcement.repeat) fail("announcement repeat count differs");
if (norm($home(".welcome__header").text()) !== norm(site.home.heroHeading)) fail("hero heading differs");
const homeTiles = $home(".product-grid .tile__link").map((_, a) => $home(a).attr("href").replace("/product/", "")).get();
if (homeTiles.join() !== site.home.featuredSlugs.join()) fail("home featured products differ");
if (!pages["/"].includes("youtube-nocookie.com/embed/Az__nXcGUWo")) fail("home video embed missing");
const slideAlts = $home(".slideshow img").map((_, i) => $home(i).attr("alt")).get();
if (slideAlts.join() !== site.home.slideshow.map((s) => s.alt).join()) fail("slideshow alt text differs");
if ($home(".header__logo img").attr("alt") !== site.layout.logo.alt) fail("logo alt differs");
if ($home(".social-icons a").filter((_, a) => $home(a).attr("href") !== "#").length) fail("social links are not placeholders");

for (const c of site.categories) {
  const $ = cheerio.load(pages[`/category/${c.permalink}`]);
  const slugs = $(".tile__link").map((_, a) => $(a).attr("href").replace("/product/", "")).get();
  if (slugs.join() !== c.productSlugs.join()) fail(`/category/${c.permalink}: product list differs`);
}

for (const p of local) {
  const route = `/product/${p.slug}`;
  const $ = cheerio.load(pages[route]);
  if ($("h1").first().text() !== p.name) fail(`${route}: name differs`);
  if (!$(".product-detail__pricing").text().includes(`$${p.price.toFixed(2)}`)) fail(`${route}: price missing`);
  const crumbs = $(".breadcrumb a").map((_, a) => $(a).text()).get();
  const expected = [site.product.breadcrumbHome, site.product.breadcrumbProducts, ...(p.category ? [p.category.name] : [])];
  if (crumbs.join("|") !== expected.join("|")) fail(`${route}: breadcrumb differs`);
  if ($(".gallery__slide img").length !== p.images.length) fail(`${route}: image count differs`);
  $(".gallery__slide img").each((i, img) => {
    if ($(img).attr("alt") !== `Image ${i + 1} of ${p.name}`) fail(`${route}: gallery alt ${i + 1} differs`);
  });
  if ($(".tile__image img").filter((_, img) => $(img).attr("alt") !== "").length) fail(`${route}: tile alt not empty`);
  if (p.status === "coming-soon") {
    if (!$(".product-detail__status").text().includes(site.product.comingSoon)) fail(`${route}: Coming soon missing`);
    if ($("select").length) fail(`${route}: purchase form shown for coming-soon product`);
  } else {
    const opts = $("select option").slice(1).map((_, o) => [[$(o).text(), $(o).is("[disabled]")]]).get();
    const want = p.options.map((o) => [o.sold_out ? `${o.label} ${site.product.soldOutSuffix}` : o.label, o.sold_out]);
    if (JSON.stringify(opts) !== JSON.stringify(want)) fail(`${route}: options differ`);
    if ($("a.button").text() !== site.product.addToCart) fail(`${route}: Add to cart missing`);
  }
  if (p.on_sale && !$(".product-detail__status").text().includes(site.product.onSale)) fail(`${route}: On sale missing`);
  if ($(".related .tile").length !== 3) fail(`${route}: related products count is not 3`);
  if ($("title").text() !== site.routeMeta[route].title) fail(`${route}: <title> differs`);
}

for (const key of ["refund-policy", "terms-of-service"]) {
  if (pages[`/${key}`] !== site.pages[key].raw) fail(`/${key}: body differs from live`);
}
const termsStart = site.pages["terms-of-service"].raw.trimStart().slice(0, 40);
const liveTerms = await (await fetch("https://www.toughtimezgear.com/terms-of-service")).text();
if (!liveTerms.trimStart().startsWith(termsStart)) fail("terms-of-service: live text changed since import");

// Search behaves like live for a sample term.
const liveSearch = cheerio.load(await (await fetch("https://www.toughtimezgear.com/products?search=salute")).text());
const liveResults = liveSearch(".product-list-link").map((_, a) => liveSearch(a).attr("href")).get();
const $s = cheerio.load(await (await fetch(`${LOCAL}/products?search=salute`)).text());
const localResults = $s(".tile__link").map((_, a) => $s(a).attr("href")).get();
const searchMatch = liveResults.join() === localResults.join();
if (!searchMatch) fail(`search "salute": live ${liveResults.length} results, local ${localResults.length}`);

const results = {
  checkedAt: new Date().toISOString(),
  local: LOCAL,
  products: { local: local.length, live: live.length },
  images: { local: localImages, live: liveImages },
  routesChecked: routes.length,
  searchSample: { term: "salute", live: liveResults.length, local: localResults.length, sameOrder: searchMatch },
  failures,
};
await writeFile("docs/parity-results.json", JSON.stringify(results, null, 2) + "\n");
console.log(`products ${local.length}/${live.length}, images ${localImages}/${liveImages}, routes ${routes.length}, failures ${failures.length}`);
for (const f of failures) console.log("FAIL", f);
process.exit(failures.length ? 1 : 0);

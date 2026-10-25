// Fetches live pages and extracts their copy verbatim into data/site.json.
// Text is taken exactly as served; nothing here is typed by hand except the
// contact-form fallback labels (the live /contact sits behind a Cloudflare
// challenge for scripted requests — see docs/TODO-owner-decisions.md).
import { writeFile, mkdir } from "node:fs/promises";
import * as cheerio from "cheerio";

const BASE = "https://www.toughtimezgear.com";
const UA = { "user-agent": "Mozilla/5.0 (ttg-parity-import)" };

async function get(path) {
  const res = await fetch(BASE + path, { headers: UA });
  return { status: res.status, body: await res.text() };
}

async function getOk(path) {
  const r = await get(path);
  if (r.status !== 200) throw new Error(`${path} returned HTTP ${r.status}`);
  return r.body;
}

const links = ($, sel) =>
  $(sel)
    .map((_, a) => ({ label: $(a).text(), href: $(a).attr("href") }))
    .get();

function stripQuery(url) {
  const u = new URL(url);
  u.search = "";
  return u.toString();
}

function customPage(html) {
  const $ = cheerio.load(html);
  return {
    title: $("main h1.page-header").first().text(),
    html: $("main .custom-page-content").first().html(),
  };
}

async function main() {
  const homeHtml = await getOk("/");
  const $ = cheerio.load(homeHtml);

  const videoUrl = homeHtml.match(/homeFeaturedVideoUrl:\s*"([^"]+)"/)?.[1];
  const videoId = videoUrl && new URL(videoUrl).pathname.replace("/", "");
  const meta = (sel) => $(sel).attr("content");

  const announcement = $(".announcement-message__text");
  const home = {
    announcement: { text: announcement.first().text(), repeat: announcement.length },
    heroHeading: $(".welcome-header").first().text(),
    shopNow: { label: $(".welcome-button").first().text(), href: $(".welcome-button").first().attr("href") },
    slideshow: $(".home-slideshow img.slideshow-image")
      .map((_, img) => ({ url: stripQuery($(img).attr("src")), alt: $(img).attr("alt") }))
      .get(),
    featuredVideo: { url: videoUrl, youtubeId: videoId },
    featuredTitle: $(".featured-title").first().text(),
    tagline: $(".featured-message").first().text(),
    featuredSlugs: $(".home-featured-products .product-list-link")
      .map((_, a) => $(a).attr("href").replace("/product/", ""))
      .get(),
    allProducts: {
      label: $(".home-featured-products a.centered-button").first().text(),
      href: $(".home-featured-products a.centered-button").first().attr("href"),
    },
  };

  const logo = $("img.store-logo").first();
  const searchForm = $("form.search-modal__form").first();
  const layout = {
    storeName: $("a.store-link").attr("title"),
    logo: { url: stripQuery(logo.attr("src")), alt: logo.attr("alt") },
    shopLabel: $(".category-nav-page").first().text(),
    viewCart: $(".cart-link .visually-hidden").first().text(),
    search: {
      action: searchForm.attr("action"),
      method: searchForm.attr("method"),
      label: searchForm.find("label").first().text(),
      inputName: searchForm.find("input[type=search]").first().attr("name"),
    },
    headerNav: links($, "#header-dropdown .categories-list a"),
    menuNav: links($, ".navigation-modal__list a"),
    footer: {
      main: $(".footer__pages--main a")
        // The cart count is live state; "{count}" marks where it goes.
        .map((_, a) => {
          const el = $(a).clone();
          el.find(".cart-num-items").replaceWith("{count}");
          return { label: el.text(), href: $(a).attr("href") };
        })
        .get(),
      categories: links($, ".footer__pages--categories a"),
      pages: links($, ".footer__pages--pages a"),
      // Live hrefs are Big Cartel placeholders; rendered as "#" until the owner supplies real URLs.
      social: $("footer .social-icons a")
        .map((_, a) => ({ title: $(a).attr("title"), liveHref: $(a).attr("href") }))
        .get(),
      tagline: $(".footer-custom-content").first().text(),
    },
  };

  const metadata = {
    title: $("title").first().text(),
    description: meta('meta[name="description"]'),
    og: {
      type: meta('meta[property="og:type"]'),
      siteName: meta('meta[property="og:site_name"]'),
      title: meta('meta[property="og:title"]'),
      url: meta('meta[property="og:url"]'),
      description: meta('meta[property="og:description"]'),
      image: stripQuery(meta('meta[property="og:image"]')),
    },
    twitter: { card: meta('meta[name="twitter:card"]') },
    icons: $('link[rel="icon"], link[rel="apple-touch-icon"]')
      .map((_, l) => ({ rel: $(l).attr("rel"), href: $(l).attr("href"), type: $(l).attr("type") ?? null }))
      .get(),
  };

  // Product page fixed strings, taken from live product pages.
  const p1 = cheerio.load(await getOk("/product/news-anchor-tee"));
  const pSale = cheerio.load(await getOk("/product/signature-classic"));
  const pSoon = cheerio.load(await getOk("/product/the-great-to-everything"));
  const crumbs = p1(".product-breadcrumb a");
  const soldOutOption = pSale("option[disabled-type='sold-out']").first().text();
  const product = {
    breadcrumbHome: crumbs.eq(0).text(),
    breadcrumbProducts: crumbs.eq(1).text(),
    counterOf: p1(".mobile-buttons-indicator div").first().text().replace(/^\s*\d+\s*/, "").replace(/\s*\d+\s*$/, ""),
    selectOption: p1("select.product-option-select option").first().text(),
    soldOutSuffix: soldOutOption.match(/\(([^)]+)\)\s*$/)?.[0],
    addToCart: p1("#add-to-cart-button").attr("data-add-title"),
    soldOut: p1("#add-to-cart-button").attr("data-sold-title"),
    separator: pSale(".product-detail__separator").first().text(),
    onSale: pSale(".product-detail__status").first().text(),
    comingSoon: pSoon(".product-detail__status").first().text(),
    relatedTitle: p1(".related-products-title").first().text(),
  };

  const productsPage = cheerio.load(await getOk("/products"));
  const searchPage = cheerio.load(await getOk("/products?search=zzqqxx-no-match"));
  const listing = {
    productsTitle: productsPage("main h1.page-title").first().text(),
    searchTitle: searchPage("main h1.page-title").first().text(),
    noProducts: searchPage("main .message-banner").first().text(),
  };

  const categories = [];
  for (const { label, href } of layout.footer.categories) {
    const c = cheerio.load(await getOk(href));
    categories.push({
      name: label,
      permalink: href.replace("/category/", ""),
      title: c("main h1.page-title").first().text(),
      productSlugs: c("main .product-list-link").map((_, a) => c(a).attr("href").replace("/product/", "")).get(),
    });
  }

  const cart$ = cheerio.load(await getOk("/cart"));
  const cart = {
    title: cart$("main h1.page-title").first().text(),
    empty: cart$("main .message-banner--empty-cart").first().text(),
    continueShopping: { label: cart$("main .cart-empty a.button").first().text(), href: cart$("main .cart-empty a.button").attr("href") },
  };

  // /refund-policy and /terms-of-service are served as bare text bodies, not themed pages.
  const pages = {
    "mission-statement": customPage(await getOk("/mission-statement")),
    "tough-timez-gear-media": customPage(await getOk("/tough-timez-gear-media")),
    "refund-policy": { raw: await getOk("/refund-policy") },
    "terms-of-service": { raw: await getOk("/terms-of-service") },
  };

  const contactRes = await get("/contact");
  let contact;
  if (contactRes.status === 200 && !contactRes.body.includes("Just a moment...")) {
    const c = cheerio.load(contactRes.body);
    contact = {
      source: "live",
      title: c("main h1").first().text(),
      text: c("main .message-banner--contact").first().text() || null,
      labels: {
        name: c("label[for=name]").text(),
        email: c("label[for=email]").text(),
        subject: c("label[for=subject]").text(),
        message: c("label[for=message]").text(),
      },
      sendButton: c("#contact_button").text(),
      recaptchaNote: c(".recaptcha-note").text() || null,
    };
  } else {
    // Cloudflare challenge. Labels are the ones recorded in the 2026-10-25 audit;
    // the reCAPTCHA notice text is generated by Big Cartel and could not be fetched.
    contact = {
      source: `fallback (live returned HTTP ${contactRes.status} Cloudflare challenge)`,
      title: layout.menuNav.find((l) => l.href === "/contact")?.label ?? null,
      text: null,
      labels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
      sendButton: "Send message",
      recaptchaNote: null,
    };
  }

  const site = { fetchedAt: new Date().toISOString(), metadata, layout, home, listing, product, categories, cart, contact, pages };
  await mkdir("data", { recursive: true });
  await writeFile("data/site.json", JSON.stringify(site, null, 2) + "\n");
  console.log(
    `Wrote data/site.json: header ${layout.headerNav.length} links, footer ${layout.footer.categories.length} categories, contact ${contact.source}`,
  );
  if (layout.footer.categories.length !== 13 || layout.headerNav.length !== 14) {
    throw new Error("Expected 13 categories plus All products in the header");
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

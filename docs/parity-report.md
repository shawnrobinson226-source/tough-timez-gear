# Parity report — 2026-10-25

Build: `npm run build` and `npm run lint` pass (0 errors, 0 warnings).
Checked with `node scripts/parity-check.mjs http://localhost:3100` against a local `next start`.
Machine-readable results: `docs/parity-results.json`.

## What this check proves (and what it doesn't)

The parity check compares the build against data that was itself imported from the live feed and
live pages. A pass shows that the import dropped or altered nothing and that the pages render that
data faithfully. It does **not** verify the editorial accuracy of the live content: typos, wrong
prices, outdated copy or a mis-categorised product on live are reproduced here exactly as served.
An independent pass against a preview deployment is still needed.

## Summary

| Check | Result |
|-------|--------|
| Products (count, slugs, order) | 42 / 42 live, same order |
| Names, prices, status, on_sale, categories | identical |
| Option labels and sold-out flags | identical (2 sold-out options: salute-pullover, signature-classic) |
| Descriptions | identical, verbatim |
| Images | 89 / 89, same source URLs per product |
| Routes returning 200 | 63 / 63 (`/`, `/products`, 13 categories, 42 products, 6 pages) |
| Header Shop nav, footer nav, announcement (x5), hero heading, featured 12 | match `data/site.json` |
| Category listings | same products in live order for all 13 |
| Product pages | name, price, breadcrumb, image count, gallery alt, options, "(Sold out)" disabled, "On sale", "Coming soon" (book, no purchase form), "Add to cart", 3 related, `<title>` all match |
| Alt text | gallery "Image N of NAME", tiles empty, slideshow "Slideshow image N", logo "www.toughtimezgear.com Home" |
| Refund policy / Terms | byte-identical to live bodies; Terms still begins mid-Section 6 on live |
| Search sample ("salute") | 13 results, same order as live |
| Failures | **0** |

## Resolved since the first gate

- **Mobile gallery thumbnails restored.** Small screens now show thumbnail buttons *and* the "1 of N"
  counter with previous/next arrows. Clicking a thumbnail moves the main image and updates the counter
  (checked on THE BIG SALUTE, 5 images: thumb 4 → "4 of 5", next → "5 of 5"). Desktop stays stacked
  with no thumbnail strip, because live shows none on desktop (`docs/reference-shots/product-news-anchor-tee-1440.webp`).
- **Slideshow** now slides horizontally like live instead of fading.
- **YouTube embed verified.** The `youtube-nocookie.com/embed/Az__nXcGUWo` iframe loads the player
  ("What's The Story Behind The Design Episode 1…") in headless Chromium, headed Chromium and real
  Chrome (`channel: "chrome"`, headed); no failed requests or console errors, no CSP or frame headers
  on the local build. Evidence: `docs/evidence/home-video-chrome-headed.webp`. The blank box in the
  full-page shots is a Playwright full-page capture limitation with cross-origin iframes, not the site.

## Visible differences from the reference shots

1. **"You might also like":** live picks change on every load; the build uses the fixed rule
   (next 3 in category, then Featured order), so the products shown differ from any one live capture.
2. **Home video player chrome:** live wraps the video in its own player; the build shows YouTube's
   standard embed. The iframe has no `title` (live provides none to copy).
3. **Product image zoom:** live opens images in a zoom viewer; the build has no zoom.
4. **Cart:** footer shows "Cart (0)" and `/cart` shows the empty state; Add to cart links to the live
   store (TEMPORARY). Live adds items to a real cart.
5. **Contact:** could not be compared; live is behind a Cloudflare challenge for automated browsers.
   The "Send message" button is disabled.
6. **Fonts:** Chewy and Permanent Marker are self-hosted via `next/font` instead of loaded from
   Google Fonts at runtime; glyphs are identical, line breaks can shift by a word in long names.

Everything else in the four reference pages (announcement bar, header, logo size, grid of square
tiles, tile name/price sizes, buttons, footer lists, social icons, tagline) lines up within a few pixels.

## Repository size

| Item | Size |
|------|------|
| `public/img` (627 AVIF/WebP variants + OG image) | 35.9 MB |
| `docs/` tracked, before cleanup (PNG reference and build screenshots, reports) | 38.5 MB |
| `docs/` tracked, after cleanup (WebP reference shots, evidence shot, reports) | 2.5 MB |
| Push that first published this work (all new commits, as a git bundle) | 88.0 MB |

On 2026-10-25 the screenshots were converted to WebP at quality 80, the PNGs removed with `git rm`,
and `docs/build-shots/` added to `.gitignore`. Git history was not rewritten, so the old PNGs still
sit in earlier commits; only new clones' working trees and future pushes get smaller. The largest
tracked docs file is now `docs/reference-shots/products-1440.webp` at 0.8 MB.

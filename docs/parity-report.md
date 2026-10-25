# Parity report — 2026-10-25

Build: `npm run build` and `npm run lint` pass (0 errors, 0 warnings).
Checked with `node scripts/parity-check.mjs http://localhost:3100` against a local `next start`.
Machine-readable results: `docs/parity-results.json`.

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

## Visible differences from the reference shots

Compared `docs/build-shots/` with `docs/reference-shots/` at 1440 and 390 px.

1. **Mobile product gallery:** live shows a row of thumbnail buttons under the image; the build shows
   the "1 of N" counter with previous/next arrows (the brief asks for the counter). Desktop is the same
   (images stacked at natural ratio).
2. **"You might also like":** live picks change on every load; the build uses the fixed rule
   (next 3 in category, then Featured order), so the products shown differ from any one live capture.
3. **Home video:** live renders a custom player (black box with controls); the build embeds
   `youtube-nocookie.com/embed/Az__nXcGUWo`. In headless captures the build's iframe area is blank;
   in a normal browser it shows YouTube's player. The iframe has no `title` (live provides none to copy).
4. **Slideshow:** live uses a sliding carousel; the build cross-fades. Frame size, natural ratios,
   top alignment and the 3 dots match. The captured slide may differ between shots because both autoplay.
5. **Product image zoom:** live opens images in a zoom viewer; the build has no zoom.
6. **Cart:** footer shows "Cart (0)" and `/cart` shows the empty state; Add to cart links to the live
   store (TEMPORARY). Live adds items to a real cart.
7. **Contact:** could not be compared; live is behind a Cloudflare challenge for automated browsers.
   The "Send message" button is disabled.
8. **Fonts:** Chewy and Permanent Marker are self-hosted via `next/font` instead of loaded from
   Google Fonts at runtime; glyphs are identical, line breaks can shift by a word in long names.

Everything else in the four reference pages (announcement bar, header, logo size, grid of square
tiles, tile name/price sizes, buttons, footer lists, social icons, tagline) lines up within a few pixels.

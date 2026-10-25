@AGENTS.md

# Tough Timez Gear — live-site parity build

The live Big Cartel store at https://www.toughtimezgear.com (always use `www`) is the spec.
This repo rebuilds it with the same structure, routes, navigation, copy, products and prices,
and higher-quality imagery. It is not a redesign. Never write new brand copy.

## Rules

1. Copy is verbatim from the live site, including its typos and odd spacing. Only trim leading
   and trailing whitespace on names, categories and option labels. Never invent, polish or "fix" text.
2. One source of truth for data. Products and page copy live in data files, never hardcoded in components.
3. No upscaling. If a source image is too small, use it at its native size and record it in
   `docs/low-res-needs-reexport.md`.
4. Small commits, one per step. Never force-push. Never touch `main`.
5. Never commit secrets or original image files.
6. All live content is fetched by script from the live site over HTTP. Do not retype copy by hand.

## Data conventions

- `data/products.json` — written by `scripts/import-bigcartel.mjs` from `/products.json`.
  Live order is preserved. Fields: name, slug, price, status, on_sale, category {name, permalink},
  options [{label, sold_out}], description (verbatim), images [{url (query stripped), width, height}].
- `data/site.json` — written by `scripts/import-pages.mjs`: page copy, header/footer navigation, home copy.
- `data/image-manifest.json` — written by `scripts/fetch-images.mjs`: per image width, height and files.
- `lib/config.ts` holds `STORE_BASE_URL` (TEMPORARY: Add to cart links back to Big Cartel).
- Re-run the import scripts to refresh data; never edit the generated JSON by hand.
- `scripts/parity-check.mjs` compares `data/products.json` to the live feed and checks routes.

## Image conventions

- Originals are downloaded (query string stripped) to `..\ttg-image-originals`, outside the repo.
  Never commit originals.
- `sharp` produces AVIF and WebP at 640, 960, 1440 and 2000 px wide, never wider than the source,
  into `public/img/products/<slug>/` (site images go in `public/img/site/`).
- Render with `next/image` using manifest width/height and correct `sizes`. `priority` only for the
  home hero and slideshow.
- Alt text matches live: gallery "Image N of NAME"; product tiles empty alt; slideshow
  "Slideshow image N"; logo "www.toughtimezgear.com Home".
- Grid tiles render square (cover crop); product pages show images at natural ratio.

## Archive

`content-archive/` holds the earlier concept build. It is not live-site canon, not routed and not deployed.

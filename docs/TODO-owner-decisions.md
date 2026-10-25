# Owner decisions needed

Items the parity build cannot settle on its own. Each one is shipped as-is (matching live) or left
inert until the owner decides.

## Content

1. **Terms of Service starts mid-sentence.** The live `/terms-of-service` begins partway through
   Section 6 ("number provided at the time the order was made…") and runs Sections 7 to 20.
   It is shipped exactly as served. Sections 1 to 6 have not been written and must come from the owner.
2. **Refund policy and Terms are served as bare text.** Live serves both as plain text bodies with no
   site header, footer or styling. The build serves them the same way.
3. **Contact page copy could not be fetched.** Live `/contact` returns a Cloudflare challenge (HTTP 403)
   to scripts, Playwright and the in-app browser. The form uses the labels recorded in the audit
   (Name, Email, Subject, Message, "Send message") and the heading "Contact" from the live menu.
   The reCAPTCHA notice "Protected by reCAPTCHA. Google's Privacy Policy and Terms of Service apply."
   was verified on the live page in a real browser. Its two links point to
   `https://policies.google.com/privacy` and `https://policies.google.com/terms`, the standard
   reCAPTCHA targets; **those hrefs are not verified against the live page.** Any contact intro
   text on live is unknown. The page `<title>` follows the live "Name | www.toughtimezgear.com" pattern.
4. **"2 for $30 Summer Deal 1" has no category.** Its live breadcrumb is Home / Products only; the build matches.

## Links and integrations

5. **Social links are Big Cartel placeholders.** Live hrefs are `toughtimezgear.instagram.com/bigcartel`,
   `stantimez.facebook.com/bigcartel` and `toughtimezgear.youtube.com/@BigCartelDotCom`. The three icons
   render with `href="#"` until real Instagram, Facebook and YouTube URLs are supplied.
6. **Add to cart is TEMPORARY.** It links to `{STORE_BASE_URL}/product/{slug}` (set once in
   `lib/config.ts`, default `https://www.toughtimezgear.com`), sending shoppers to the live Big Cartel
   product page to buy. A real cart/checkout integration needs a decision.
7. **Cart page is static.** `/cart` shows the live empty-cart state only; there is no cart state yet.
   The footer shows "Cart (0)".
8. **Contact form has no submit handler.** The "Send message" button is disabled and does not pretend
   to send. A form backend (and spam protection) needs a decision.
9. **"Back to site" menu link** points to `http://www.toughtimezgear.com` exactly as live. Once this
   build replaces the live site that link points at itself.

## Behaviour differences to accept or change

10. **"You might also like"** on live shows 3 products that change between page loads. The build uses a
    fixed rule: the next 3 products in the same category after the current one, wrapping around; if the
    category has fewer than 4 products, the rest come from the home Featured order, skipping the current product.

## Images

11. **Images are the largest CDN-served copies, not the owner's uploads.** The CDN caps requests at
    3200 px, so 27 images are smaller than their feed size, and 14 images (products 5, 6, 10, 18, 21,
    23, 34, 40) are under 800 px wide. See `docs/low-res-needs-reexport.md`. Re-exports at 2000 px or
    larger, and the logo as SVG or at least 1000 px wide, are needed from the owner.

## Repository

12. **Two expected commits are missing.** The owner expected `build/homepage-shell` to be 24 commits
    ahead of `main`; GitHub has 22. Check any other machine with a clone of this repo for unpushed
    commits before they are lost or overwritten.

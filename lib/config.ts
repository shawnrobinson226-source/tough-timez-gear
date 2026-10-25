// TEMPORARY: "Add to cart" sends shoppers to the live Big Cartel product page until a
// real cart/checkout is chosen. See docs/TODO-owner-decisions.md.
export const STORE_BASE_URL = process.env.NEXT_PUBLIC_STORE_BASE_URL ?? "https://www.toughtimezgear.com";

export const addToCartUrl = (slug: string) => `${STORE_BASE_URL}/product/${slug}`;

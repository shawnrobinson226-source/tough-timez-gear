import Link from "next/link";
import { notFound } from "next/navigation";

const products = {
  "life-is-tough-tee": {
    name: "Life Is Tough Tee",
    price: "$35",
    collection: "Life Is Tough",
    meaning:
      "A story piece built around the reality that pressure does not decide how you carry yourself.",
    details: ["Front graphic", "Unisex fit", "Cotton construction", "Sizes and colors coming soon"],
  },
  "signature-classic-tee": {
    name: "Signature Classic Tee",
    price: "$35",
    collection: "Core Marks",
    meaning:
      "A clean everyday piece carrying the primary Tough Timez Gear identity without extra noise.",
    details: ["Primary TTG mark", "Unisex fit", "Everyday weight", "Sizes and colors coming soon"],
  },
  "tough-timez-hat": {
    name: "Tough Timez Hat",
    price: "$25",
    collection: "Stay Fresh",
    meaning:
      "A direct finishing piece designed to carry the mark without overpowering the full look.",
    details: ["Structured crown", "Adjustable closure", "Embroidered mark", "Colorways coming soon"],
  },
};

type ProductSlug = keyof typeof products;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug as ProductSlug];

  if (!product) notFound();

  return (
    <main className="inside-page product-page">
      <header className="inside-header">
        <Link className="brand-mark" href="/">TTG</Link>
        <nav>
          <Link href="/collections">Collections</Link>
          <Link href="/story">Story</Link>
          <Link href="/media">Media</Link>
        </nav>
        <Link className="header-cta" href="/collections">Back</Link>
      </header>

      <section className="product-detail-shell">
        <div className="product-gallery">
          <div className="product-detail-image product-detail-image-main">
            <span>01 / FRONT</span>
            <strong>PRODUCT IMAGE</strong>
          </div>
          <div className="product-detail-image"><span>02 / BACK</span></div>
          <div className="product-detail-image"><span>03 / DETAIL</span></div>
        </div>

        <div className="product-copy-panel">
          <p className="eyebrow">{product.collection}</p>
          <h1>{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-meaning">{product.meaning}</p>

          <div className="product-detail-list">
            {product.details.map((detail) => <p key={detail}>{detail}</p>)}
          </div>

          <div className="product-actions">
            <button type="button">Choose Size</button>
            <a href="https://www.toughtimezgear.com/" target="_blank" rel="noreferrer">
              Shop Current Store
            </a>
          </div>

          <p className="product-note">
            Final images, sizing, materials, and direct product link will be added when the release is locked.
          </p>
        </div>
      </section>
    </main>
  );
}

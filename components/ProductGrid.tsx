import Link from "next/link";
import Picture from "@/components/Picture";
import { formatPrice, productImages, site, type Product } from "@/lib/data";
import { pictureData } from "@/lib/images";

const TILE_SIZES = "(max-width: 668px) 50vw, (max-width: 1300px) 45vw, 590px";
const RELATED_SIZES = "(max-width: 668px) 50vw, 275px";

export function ProductTile({ product, related = false }: { product: Product; related?: boolean }) {
  const image = productImages(product.slug)[0];
  const status =
    product.status === "coming-soon"
      ? { label: site.product.comingSoon, kind: "secondary" }
      : product.on_sale
        ? { label: site.product.onSale, kind: "primary" }
        : null;
  return (
    <div className="tile">
      <Link className="tile__link" href={`/product/${product.slug}`} title={product.name}>
        <div className="tile__image" data-shot="grid-tile">
          {image && <Picture data={pictureData(image, { alt: "", sizes: related ? RELATED_SIZES : TILE_SIZES })} />}
          {status && <div className={`tile__status tile__status--${status.kind}`}>{status.label}</div>}
        </div>
        <div className="tile__info">
          <div className="tile__name">{product.name}</div>
          <div className="tile__price">{formatPrice(product.price)}</div>
        </div>
      </Link>
    </div>
  );
}

export default function ProductGrid({ products, related = false }: { products: Product[]; related?: boolean }) {
  return (
    <div className={related ? "product-grid product-grid--related" : "product-grid"}>
      {products.map((p) => (
        <ProductTile key={p.slug} product={p} related={related} />
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Gallery from "@/components/Gallery";
import { BreadcrumbArrow, ChevronDown } from "@/components/Icons";
import ProductGrid from "@/components/ProductGrid";
import { addToCartUrl } from "@/lib/config";
import {
  descriptionParagraphs,
  formatPrice,
  getProduct,
  productImages,
  products,
  relatedProducts,
  site,
} from "@/lib/data";
import { pictureData } from "@/lib/images";
import { metaFor } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metaFor(`/product/${slug}`);
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const text = site.product;
  const comingSoon = product.status === "coming-soon";
  const images = productImages(product.slug).map((img, i) =>
    pictureData(img, { alt: `Image ${i + 1} of ${product.name}`, sizes: "(min-width: 801px) 60vw, 100vw" }),
  );

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <Link href="/">{text.breadcrumbHome}</Link>
        <BreadcrumbArrow />
        <Link href="/products">{text.breadcrumbProducts}</Link>
        {product.category && (
          <>
            <BreadcrumbArrow />
            <Link href={`/category/${product.category.permalink}`}>{product.category.name}</Link>
          </>
        )}
      </nav>
      <div className="product">
        <Gallery name={product.name} images={images} of={text.counterOf} />
        <section className="product-detail">
          <div>
            <h1 className="product-detail__title">{product.name}</h1>
          </div>
          <div className="product-detail__pricing">
            <span>{formatPrice(product.price)}</span>
            {(comingSoon || product.on_sale) && (
              <>
                <span>{text.separator}</span>
                <div className="product-detail__status">{comingSoon ? text.comingSoon : text.onSale}</div>
              </>
            )}
          </div>
          {!comingSoon && (
            <div className="product-form">
              <div className="select">
                <select aria-label={text.selectOption} defaultValue="" required>
                  <option value="" disabled>
                    {text.selectOption}
                  </option>
                  {product.options.map((o) => (
                    <option key={o.label} value={o.label} disabled={o.sold_out}>
                      {o.sold_out ? `${o.label} ${text.soldOutSuffix}` : o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
              {/* TEMPORARY: links to the live Big Cartel product page (lib/config.ts). */}
              <a className="button" href={addToCartUrl(product.slug)}>
                {text.addToCart}
              </a>
            </div>
          )}
          <div className="product-detail__description">
            {descriptionParagraphs(product.description).map((lines, i) => (
              <p key={i}>
                {lines.map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            ))}
          </div>
        </section>
      </div>
      <div className="related" role="complementary" aria-label={text.relatedTitle}>
        <h2 className="related__title">{text.relatedTitle}</h2>
        <ProductGrid products={relatedProducts(product)} related />
      </div>
    </>
  );
}

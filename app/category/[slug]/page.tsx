import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCategory, getProduct, site, type Product } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.categories.map((c) => ({ slug: c.permalink }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metaFor(`/category/${slug}`);
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  // Live category listing order, as imported.
  const list = category.productSlugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));
  return (
    <>
      <h1 className="page-title">{category.title.trim()}</h1>
      {list.length ? <ProductGrid products={list} /> : <div className="message-banner">{site.listing.noProducts}</div>}
    </>
  );
}

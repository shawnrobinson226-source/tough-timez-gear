import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { products, searchProducts, site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

type Props = { searchParams: Promise<{ search?: string | string[] }> };

const searchTerm = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return searchTerm((await searchParams).search) !== undefined ? metaFor("search") : metaFor("/products");
}

export default async function ProductsPage({ searchParams }: Props) {
  const term = searchTerm((await searchParams).search);
  const list = term === undefined ? products : searchProducts(term);
  return (
    <>
      <h1 className="page-title">{term === undefined ? site.listing.productsTitle : site.listing.searchTitle}</h1>
      {list.length ? <ProductGrid products={list} /> : <div className="message-banner">{site.listing.noProducts}</div>}
    </>
  );
}

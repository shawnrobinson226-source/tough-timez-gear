import Link from "next/link";
import { site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

export const metadata = metaFor("/cart");

// Static empty-cart state, as live shows it with nothing added. No cart state yet
// (docs/TODO-owner-decisions.md).
export default function CartPage() {
  const { cart } = site;
  return (
    <>
      <h1 className="page-title">{cart.title}</h1>
      <div className="cart-empty">
        <div className="message-banner">{cart.empty}</div>
        <Link className="button" href={cart.continueShopping.href}>
          {cart.continueShopping.label}
        </Link>
      </div>
    </>
  );
}

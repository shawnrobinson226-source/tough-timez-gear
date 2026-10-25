import Link from "next/link";
import Picture from "@/components/Picture";
import { CartIcon } from "@/components/Icons";
import { HeaderNav, HeaderSearch } from "@/components/HeaderControls";
import { manifest, site } from "@/lib/data";
import { pictureData } from "@/lib/images";

export default function Header() {
  const { layout } = site;
  const logo = pictureData(manifest.site.logo, {
    alt: layout.logo.alt,
    sizes: "(max-width: 668px) 274px, 421px",
  });
  return (
    <header className="header">
      <div className="wrapper header__inner">
        <HeaderNav
          shopLabel={layout.shopLabel}
          categories={layout.headerNav}
          menu={layout.menuNav}
          social={layout.footer.social}
        />
        <div className="header__logo" data-shot="logo">
          <Link href="/" title={layout.storeName}>
            <Picture data={logo} className="header__logo-img" />
          </Link>
        </div>
        <div className="header__cart">
          <HeaderSearch label={layout.search.label} action={layout.search.action} inputName={layout.search.inputName} />
          <Link className="icon-button" href="/cart">
            <CartIcon />
            <span className="visually-hidden">{layout.viewCart}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

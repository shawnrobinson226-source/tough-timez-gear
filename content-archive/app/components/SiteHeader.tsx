"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "Story" },
  { href: "/media", label: "Media" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label="Tough Timez Gear home">
        TTG
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta desktop-shop" href="/#gear">
        Shop
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          {links.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link href="/#gear">
            <span>04</span>
            Shop
          </Link>
        </nav>
        <p>Founded in Pomona. Established in Santa Ana, California.</p>
      </div>
    </header>
  );
}

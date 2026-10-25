"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, CloseIcon, MenuIcon, SearchIcon } from "@/components/Icons";
import SocialLinks from "@/components/SocialLinks";
import type { NavLink } from "@/lib/data";

type Social = { title: string; href?: string };

// Left side of the header: menu button (opens the navigation modal) and the Shop dropdown.
export function HeaderNav({
  shopLabel,
  categories,
  menu,
  social,
}: {
  shopLabel: string;
  categories: NavLink[];
  menu: NavLink[];
  social: Social[];
}) {
  const [shopOpen, setShopOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuShopOpen, setMenuShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shopOpen) return;
    const close = (e: MouseEvent) => {
      if (!shopRef.current?.contains(e.target as Node)) setShopOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [shopOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isCategory = (l: NavLink) => l.href === "/products" || l.href.startsWith("/category/");
  const before = menu.slice(0, menu.findIndex(isCategory));
  const after = menu.filter((l, i) => !isCategory(l) && !before.includes(l) && i > 0);

  return (
    <div className="header__nav">
      <button className="icon-button" aria-label="Open navigation menu" onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </button>
      <div className="shop-nav" ref={shopRef}>
        <button
          className="shop-nav__toggle"
          aria-label="Open category navigation"
          aria-controls="header-dropdown"
          aria-expanded={shopOpen}
          onClick={() => setShopOpen((v) => !v)}
        >
          <span>{shopLabel}</span>
          <ChevronDown className="shop-nav__arrow" />
        </button>
        <div id="header-dropdown" className="shop-nav__dropdown" hidden={!shopOpen}>
          <ul>
            {categories.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setShopOpen(false)}>
                  {l.label.trim()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="nav-modal" role="dialog" aria-modal="true" aria-label="Navigation" hidden={!menuOpen}>
        <div className="wrapper">
          <div className="nav-modal__header">
            <button className="icon-button" title="Close navigation" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Primary navigation">
            <ul className="nav-modal__list">
              {before.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setMenuOpen(false)}>
                    {l.label.trim()}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="nav-modal__toggle"
                  aria-label="Open category navigation"
                  aria-controls="modal-category-list"
                  aria-expanded={menuShopOpen}
                  onClick={() => setMenuShopOpen((v) => !v)}
                >
                  {shopLabel}
                </button>
                <ul id="modal-category-list" className="nav-modal__categories" hidden={!menuShopOpen}>
                  {categories.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => setMenuOpen(false)}>
                        {l.label.trim()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {after.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href}>{l.label.trim()}</a>
                  ) : (
                    <Link href={l.href} onClick={() => setMenuOpen(false)}>
                      {l.label.trim()}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks social={social} />
        </div>
      </div>
    </div>
  );
}

// Search button and modal: a GET form to /products?search=…
export function HeaderSearch({ label, action, inputName }: { label: string; action: string; inputName: string }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      <button className="icon-button" type="button" aria-haspopup="dialog" aria-controls="search-modal" title="Open search menu" onClick={() => setOpen(true)}>
        <SearchIcon />
      </button>
      <div id="search-modal" className="search-modal" role="dialog" aria-modal="true" aria-label={label} hidden={!open}>
        <div className="search-modal__content">
          <button className="icon-button search-modal__close" aria-label="Close search dialog" type="button" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
          <form className="search-modal__form" action={action} method="get" role="search" onSubmit={() => setOpen(false)}>
            <label className="search-modal__label" htmlFor="search-input">
              {label}
            </label>
            <input ref={inputRef} className="search-modal__input" id="search-input" name={inputName} type="search" autoComplete="off" />
            <button type="submit" className="icon-button" aria-label="Submit search form">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

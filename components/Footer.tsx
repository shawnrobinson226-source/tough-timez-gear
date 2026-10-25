import Link from "next/link";
import { SocialIcon } from "@/components/Icons";
import { site } from "@/lib/data";

// The live cart count is session state; with no cart yet it is always 0.
const CART_COUNT = "0";

export default function Footer() {
  const { footer } = site.layout;
  return (
    <footer className="footer">
      <div className="wrapper footer__inner">
        <ul className="footer__pages" aria-label="Footer main">
          {footer.main.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label.replace("{count}", CART_COUNT)}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer__pages" aria-label="Footer categories">
          {footer.categories.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label.trim()}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer__pages" aria-label="Footer pages">
          {footer.pages.map((l) => (
            <li key={l.href}>
              <Link href={l.href} prefetch={false}>
                {l.label.trim()}
              </Link>
            </li>
          ))}
        </ul>
        <nav aria-label="Social links">
          <ul className="social-icons">
            {footer.social.map((s) => (
              <li key={s.title}>
                {/* Placeholder until the owner supplies real URLs (docs/TODO-owner-decisions.md). */}
                <a href="#" title={s.title}>
                  <SocialIcon name={s.title} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__tagline">{footer.tagline}</div>
      </div>
    </footer>
  );
}

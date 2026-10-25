import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import Slideshow from "@/components/Slideshow";
import { featuredProducts, manifest, site } from "@/lib/data";
import { pictureData } from "@/lib/images";

export default function Home() {
  const { home } = site;
  const slides = home.slideshow.map((s, i) =>
    pictureData(manifest.site[`slideshow-${i + 1}`], {
      alt: s.alt,
      sizes: "(max-width: 1300px) calc(100vw - 40px), 1220px",
      preload: i === 0,
    }),
  );
  return (
    <>
      <div className="home-welcome">
        <Slideshow slides={slides} />
        <div className="welcome">
          <div className="welcome__header">{home.heroHeading}</div>
          <Link className="button welcome__button" href={home.shopNow.href}>
            {home.shopNow.label}
          </Link>
        </div>
      </div>
      <div className="home-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${home.featuredVideo.youtubeId}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="featured">
        <h1 className="featured__title">{home.featuredTitle}</h1>
        <div className="featured__message">{home.tagline}</div>
      </div>
      <ProductGrid products={featuredProducts()} />
      <Link className="button button--centered" href={home.allProducts.href}>
        {home.allProducts.label}
      </Link>
    </>
  );
}

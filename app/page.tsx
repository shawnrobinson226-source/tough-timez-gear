const products = [
  {
    name: "Life Is Tough Tee",
    price: "$35",
    label: "Story Piece",
    slug: "life-is-tough-tee",
  },
  {
    name: "Signature Classic Tee",
    price: "$35",
    label: "Core Essential",
    slug: "signature-classic-tee",
  },
  {
    name: "Tough Timez Hat",
    price: "$25",
    label: "Everyday Mark",
    slug: "tough-timez-hat",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Founded in Pomona · Established in Santa Ana, California</p>
          <h1>TOUGH TIMEZ<br />GEAR</h1>
          <p className="hero-line">For people who&apos;ve been through something.</p>
          <p className="hero-support">Built from real life. Not image.</p>
          <a className="primary-button" href="#gear">See the Gear</a>
        </div>
        <div className="hero-art" aria-label="Product photography placeholder">
          <span>FULL LOOK</span>
          <strong>IMAGE<br />GOES<br />HERE</strong>
          <small>Real people. Real pressure. Clean presence.</small>
        </div>
      </section>

      <div className="ticker" aria-label="Brand statements">
        <div>LIFE IS TOUGH <span>—</span> STAY FRESH <span>—</span> SALUTE THE TRUTH <span>—</span> BUILT FROM REAL LIFE <span>—</span></div>
      </div>

      <section className="origin-strip" id="story">
        <p>01 / ORIGIN</p>
        <h2>Born from pressure.<br />Built to keep its presence.</h2>
        <p>Tough Timez Gear does not pretend clothing creates strength. It recognizes the composure, discipline, and identity already earned through real life.</p>
      </section>

      <section className="product-section" id="gear">
        <div className="section-heading">
          <div><p className="eyebrow">Current Release</p><h2>THE GEAR</h2></div>
          <p>Three clear entry pieces. No clutter. No guessing.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <a className="product-card" href={`/products/${product.slug}`} key={product.name} aria-label={`View ${product.name}`}>
              <div className={`product-image product-image-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>PRODUCT<br />IMAGE</strong>
              </div>
              <div className="product-info">
                <div><p>{product.label}</p><h3>{product.name}</h3></div>
                <strong>{product.price}</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="sets-section" id="sets">
        <div className="sets-number">02</div>
        <div>
          <p className="eyebrow">Complete Presence</p>
          <h2>NOT JUST A TEE.<br />THE WHOLE LOOK.</h2>
          <p>Coordinated shirts, shorts, and headwear shaped as complete streetwear systems. Every mark has a role. Every piece belongs.</p>
          <a className="primary-button" href="/collections">View Collections</a>
        </div>
        <div className="sets-frame"><span>SET CAMPAIGN IMAGE</span></div>
      </section>

      <section className="brand-filter">
        <p>THIS IS FOR THE ONES WHO</p>
        <h2>GOT TESTED.<br />SHOWED UP.<br />STAYED THEMSELVES.</h2>
        <a className="light-button" href="/story">Read the Story</a>
      </section>

      <section className="email-section">
        <div><p className="eyebrow">Stay Close</p><h2>NEW GEAR. REAL STORIES.<br />NO EMPTY HYPE.</h2></div>
        <form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="EMAIL ADDRESS" /><button type="submit">Join</button></form>
      </section>

      <footer>
        <div className="footer-brand">TOUGH TIMEZ GEAR</div>
        <div className="footer-links">
          <a href="/story">About</a>
          <a href="/collections">Collections</a>
          <a href="/media">Media</a>
          <a href="https://www.instagram.com/toughtimesgear/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <p>Founded in Pomona. Established in Santa Ana, California.</p>
      </footer>
    </main>
  );
}

const marks = [
  ["Tough Timez", "The reality. Pressure, setbacks, and the parts of life nobody gets to skip."],
  ["Stay Fresh", "The visible response. Keeping your composure, presence, and identity under pressure."],
  ["Salute the Truth", "The standard. Respecting reality without surrendering how you carry yourself."],
  ["TTG", "The badge. A compact mark for people who understand the full meaning."],
];

export default function StoryPage() {
  return (
    <main className="inner-page">
      <header className="site-header">
        <a className="brand-mark" href="/">TTG</a>
        <nav aria-label="Primary navigation">
          <a href="/collections">Collections</a>
          <a href="/story">The Story</a>
          <a href="/#gear">Featured Gear</a>
        </nav>
        <a className="header-cta" href="/">Home</a>
      </header>

      <section className="inner-hero">
        <p className="inner-kicker">Founded in Pomona · Established in Santa Ana, California</p>
        <h1>Built From<br />Real Life</h1>
        <p>
          Tough Timez Gear was not created to pretend clothing gives people strength. It was
          created to recognize the presence, identity, and composure people earn through life.
        </p>
      </section>

      <section className="inner-content story-grid">
        <aside className="story-index">Brand Story / 001</aside>
        <div>
          <article className="story-block">
            <h2>Founded In Pomona</h2>
            <p>
              Pomona is where the identity and original point of view began. That origin stays
              visible because this brand should have a real place, real history, and real people
              behind it.
            </p>
          </article>

          <article className="story-block">
            <h2>Established In Santa Ana</h2>
            <p>
              Santa Ana represents the brand&apos;s continued development and current foundation.
              The language is intentional: founded in one city, established in another.
            </p>
          </article>

          <article className="story-block">
            <h2>The Four Roles</h2>
            <p>
              The brand becomes easier to understand when each phrase and symbol has a defined
              purpose instead of competing for attention.
            </p>
            <div className="mark-grid">
              {marks.map(([name, description]) => (
                <div className="mark-card" key={name}>
                  <strong>{name}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <footer className="inner-footer">
        <strong>TOUGH TIMEZ GEAR</strong>
        <a href="/collections">See the collections →</a>
      </footer>
    </main>
  );
}

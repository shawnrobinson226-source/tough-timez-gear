const collections = [
  ["01", "Core Marks", "The clearest TTG signatures: monograms, clean wordmarks, and everyday pieces built to carry the identity without overexplaining it."],
  ["02", "Stay Fresh", "The visible response to pressure. Salute marks, headwear, coordinated sets, and pieces centered on composure."],
  ["03", "Life Is Tough", "Story-driven products built around the soldier artwork and the reality that difficulty is part of life."],
  ["04", "Letterman", "Varsity language, numbers, patches, and early-2000s streetwear attitude with a disciplined finish."],
  ["05", "Archive", "Earlier graphics, media appearances, campaign pieces, and the history that proves the brand existed before this website."],
];

export default function CollectionsPage() {
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
        <p className="inner-kicker">The TTG Structure</p>
        <h1>Collections<br />With A Role</h1>
        <p>
          Every mark belongs to a specific lane. This keeps the brand broad enough to grow
          without looking like several unrelated clothing companies.
        </p>
      </section>

      <section className="inner-content">
        <div className="collection-list">
          {collections.map(([number, name, description]) => (
            <article className="collection-row" key={name}>
              <span>{number}</span>
              <h2>{name}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="inner-footer">
        <strong>TOUGH TIMEZ GEAR</strong>
        <a href="/story">Read the story →</a>
      </footer>
    </main>
  );
}

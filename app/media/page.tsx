import Link from "next/link";

const archiveGroups = [
  {
    number: "01",
    title: "Interviews",
    text: "Founder conversations, brand explanations, and appearances that document the thinking behind Tough Timez Gear.",
  },
  {
    number: "02",
    title: "Commercials",
    text: "Original promotional work, campaign footage, and short-form pieces that show how the brand has presented itself over time.",
  },
  {
    number: "03",
    title: "Events",
    text: "Pop-ups, community appearances, live activations, and real-world moments where the clothing met the people wearing it.",
  },
  {
    number: "04",
    title: "Music + Culture",
    text: "Placements, collaborations, visual appearances, and cultural moments connected to the TTG story.",
  },
  {
    number: "05",
    title: "Early Collections",
    text: "Past graphics, first-run garments, older logos, and products that show the evolution from Pomona to Santa Ana.",
  },
];

export default function MediaPage() {
  return (
    <main className="inside-page archive-page">
      <header className="inside-header">
        <Link className="brand-mark" href="/">TTG</Link>
        <nav>
          <Link href="/collections">Collections</Link>
          <Link href="/story">Story</Link>
          <Link href="/media">Media</Link>
        </nav>
        <Link className="header-cta" href="/">Home</Link>
      </header>

      <section className="inside-hero archive-hero">
        <p className="eyebrow">The Record</p>
        <h1>MEDIA<br />+ ARCHIVE</h1>
        <p>
          The work did not begin with this website. This page will preserve the interviews,
          campaigns, events, and early pieces that prove the history behind the name.
        </p>
      </section>

      <section className="archive-lead">
        <p>FOUNDED IN POMONA</p>
        <h2>THE BRAND HAS A PAST.<br />WE ARE GOING TO SHOW IT.</h2>
        <p>
          Instead of stacking loose videos and old images, this archive will organize every
          piece by purpose, year, and part of the brand story.
        </p>
      </section>

      <section className="archive-grid">
        {archiveGroups.map((group) => (
          <article className="archive-card" key={group.title}>
            <div className="archive-placeholder"><span>{group.number}</span><strong>MEDIA</strong></div>
            <p className="eyebrow">Archive Group {group.number}</p>
            <h2>{group.title}</h2>
            <p>{group.text}</p>
          </article>
        ))}
      </section>

      <section className="archive-timeline">
        <p className="eyebrow">Timeline Structure</p>
        <div>
          <article><span>THEN</span><h3>Pomona Origins</h3><p>First marks, first garments, first public proof.</p></article>
          <article><span>BUILD</span><h3>Brand Development</h3><p>Campaigns, events, products, interviews, and cultural connections.</p></article>
          <article><span>NOW</span><h3>Santa Ana Chapter</h3><p>The present collection and the next version of the brand presentation.</p></article>
        </div>
      </section>
    </main>
  );
}

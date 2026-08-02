const archiveGroups = [
  ["01", "Interviews", "Founder conversations, brand explanations, and appearances that document the thinking behind Tough Timez Gear."],
  ["02", "Commercials", "Original promotional work, campaign footage, and short-form pieces that show how the brand has presented itself over time."],
  ["03", "Events", "Pop-ups, community appearances, live activations, and real-world moments where the clothing met the people wearing it."],
  ["04", "Music + Culture", "Placements, collaborations, visual appearances, and cultural moments connected to the TTG story."],
  ["05", "Early Collections", "Past graphics, first-run garments, older logos, and products that show the evolution from Pomona to Santa Ana."],
];

export default function MediaPage() {
  return (
    <main className="inner-page archive-page">
      <section className="inner-hero archive-hero">
        <p className="inner-kicker">The Record</p>
        <h1>Media<br />+ Archive</h1>
        <p>The work did not begin with this website. This page will preserve the interviews, campaigns, events, and early pieces that prove the history behind the name.</p>
      </section>
      <section className="archive-lead">
        <p>FOUNDED IN POMONA</p>
        <h2>THE BRAND HAS A PAST.<br />WE ARE GOING TO SHOW IT.</h2>
        <p>Instead of stacking loose videos and old images, this archive will organize every piece by purpose, year, and part of the brand story.</p>
      </section>
      <section className="archive-grid">
        {archiveGroups.map(([number, title, text]) => (
          <article className="archive-card" key={title}>
            <div className="archive-placeholder"><span>{number}</span><strong>MEDIA</strong></div>
            <p className="inner-kicker">Archive Group {number}</p>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="archive-timeline">
        <p className="inner-kicker">Timeline Structure</p>
        <div>
          <article><span>THEN</span><h3>Pomona Origins</h3><p>First marks, first garments, first public proof.</p></article>
          <article><span>BUILD</span><h3>Brand Development</h3><p>Campaigns, events, products, interviews, and cultural connections.</p></article>
          <article><span>NOW</span><h3>Santa Ana Chapter</h3><p>The present collection and the next version of the brand presentation.</p></article>
        </div>
      </section>
    </main>
  );
}

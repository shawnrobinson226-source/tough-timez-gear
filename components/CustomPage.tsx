// Owner-authored page body, rendered as the live store serves it (verbatim HTML from
// data/site.json, imported by scripts/import-pages.mjs).
export default function CustomPage({ title, html }: { title: string; html: string }) {
  return (
    <>
      <h1 className="page-title">{title.trim()}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

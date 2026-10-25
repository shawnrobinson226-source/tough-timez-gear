import { site } from "@/lib/data";

export default function Announcement() {
  const { text, repeat } = site.home.announcement;
  return (
    <div role="region" aria-label="Scrolling announcement. Focus or hover to pause." className="announcement" tabIndex={0}>
      <div className="announcement__track">
        {Array.from({ length: repeat }, (_, i) => (
          <span key={i} className="announcement__text" aria-hidden={i > 0 ? true : undefined}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

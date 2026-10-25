import { SocialIcon } from "@/components/Icons";

type Social = { title: string; href?: string };

// Icons with an owner-supplied URL open in a new tab; the rest stay "#" placeholders
// until real URLs arrive (docs/TODO-owner-decisions.md).
export default function SocialLinks({ social }: { social: Social[] }) {
  return (
    <ul className="social-icons">
      {social.map((s) => (
        <li key={s.title}>
          {s.href ? (
            <a href={s.href} title={s.title} aria-label={s.title} target="_blank" rel="noopener noreferrer">
              <SocialIcon name={s.title} />
            </a>
          ) : (
            <a href="#" title={s.title} aria-label={s.title}>
              <SocialIcon name={s.title} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

import { site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

export const metadata = metaFor("/contact", site.contact.title ?? undefined);

// No submit handler yet (docs/TODO-owner-decisions.md): the button is disabled so the
// form never pretends to send.
export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <h1 className="page-title">{contact.title}</h1>
      <form className="contact-form">
        <div>
          <label htmlFor="name">{contact.labels.name}</label>
          <input id="name" name="name" type="text" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">{contact.labels.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="subject">{contact.labels.subject}</label>
          <input id="subject" name="subject" type="text" />
        </div>
        <div>
          <label htmlFor="message">{contact.labels.message}</label>
          <textarea id="message" name="message" />
        </div>
        <button className="button" type="button" disabled>
          {contact.sendButton}
        </button>
        {contact.recaptchaNote && (
          <div className="recaptcha-note">
            {contact.recaptchaNote.map((part, i) =>
              "href" in part && part.href ? (
                <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
                  {part.text}
                </a>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </div>
        )}
      </form>
    </>
  );
}

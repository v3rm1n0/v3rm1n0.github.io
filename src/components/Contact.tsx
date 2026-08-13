import type {ContactKind, ContactLink} from '../content/schema';

const GLYPHS: Record<ContactKind, string> = {
  email: '✉',
  forge: '⑂',
  pgp: '🔑',
  matrix: '⬢',
  other: '→',
};

export interface ContactProps {
  links: ContactLink[];
}

function isExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function Contact({links}: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(isExternal(link.href)
                ? {rel: 'noopener noreferrer', target: '_blank'}
                : {})}
            >
              <span aria-hidden="true" data-kind={link.kind}>
                {GLYPHS[link.kind]}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

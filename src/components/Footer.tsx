import type {Legal} from '../content/schema';

export interface FooterProps {
  name: string;
  legal: Legal | null;
}

export function Footer({name, legal}: FooterProps) {
  return (
    <footer>
      {legal !== null && (
        <section aria-labelledby="legal-heading">
          <h2 id="legal-heading">{legal.heading}</h2>
          {legal.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </section>
      )}
      <p>{`${name} — built with no trackers, no analytics, and no third-party requests.`}</p>
    </footer>
  );
}

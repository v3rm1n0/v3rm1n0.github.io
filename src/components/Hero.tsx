import type {Meta} from '../content/schema';

export interface HeroProps {
  meta: Meta;
  chips: string[];
}

export function Hero({meta, chips}: HeroProps) {
  return (
    <section aria-labelledby="hero-name">
      <p>{meta.location}</p>
      <h1 id="hero-name">{meta.name}</h1>
      <p>{meta.tagline}</p>
      {chips.length > 0 && (
        <ul aria-label="Core skills">
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

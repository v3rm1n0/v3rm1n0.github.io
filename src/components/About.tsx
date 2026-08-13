import type {About as AboutContent} from '../content/schema';

export interface AboutProps {
  about: AboutContent;
}

export function About({about}: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">{about.heading}</h2>
      {about.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
}

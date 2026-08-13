import * as stylex from '@stylexjs/stylex';
import type {ContactLink} from '../content/schema';
import codebergUrl from '../icons/codeberg.svg';
import githubUrl from '../icons/github.svg';
import matrixUrl from '../icons/matrix.svg';

/**
 * Icons for the contact row.
 *
 * Two families, deliberately:
 *
 * - Brand marks (Codeberg, GitHub, Matrix) come from dashboardicons.com
 *   (homarr-labs/dashboard-icons, Apache-2.0). They are bundled as same-origin
 *   `data:` URIs by Vite, so they cost no third-party request, and are drawn
 *   as a `mask-image` filled with `currentColor` rather than as an `<img>`.
 *   That matters: the GitHub and Matrix marks are solid black, and an `<img>`
 *   cannot inherit colour, so on the dark theme they rendered as invisible
 *   and near-invisible smudges. Masking keeps the logo silhouette while
 *   letting it follow the accent in both modes.
 * - Generic marks (mail, key, link) are Lucide (ISC), via opensvg.dev, and
 *   are inlined so they inherit `currentColor` and follow the accent.
 *
 * Nothing here is fetched at runtime. See README for attribution.
 */

const styles = stylex.create({
  glyph: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    flexShrink: 0,
  },
  brand: {
    width: '1em',
    height: '1em',
    display: 'block',
  },
  mask: {
    width: '1em',
    height: '1em',
    display: 'block',
    backgroundColor: 'currentColor',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
  },
});

const strokeProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function MailIcon() {
  return (
    <svg {...strokeProps} {...stylex.props(styles.brand)}>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg {...strokeProps} {...stylex.props(styles.brand)}>
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg {...strokeProps} {...stylex.props(styles.brand)}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function BrandIcon({src}: {src: string}) {
  // Decorative: the link's accessible name comes from its label text, and the
  // wrapping span is aria-hidden.
  //
  // The mask URL is an inline style rather than StyleX because it is genuinely
  // per-instance: StyleX's dynamic-style path silently dropped `maskImage`
  // here (computed value came back `none`), so the static geometry stays in
  // StyleX and only the image itself is inline.
  // The URL must be quoted: Vite inlines these as `data:image/svg+xml,…`
  // payloads containing parentheses and quotes, which break an unquoted
  // `url()` — the declaration is dropped and the mask silently does nothing,
  // leaving a solid `currentColor` block.
  const mask = `url("${src}")`;
  return (
    <span
      {...stylex.props(styles.mask)}
      style={{maskImage: mask, WebkitMaskImage: mask}}
    />
  );
}

/**
 * `kind` picks the family. For `forge` it is not enough on its own — Codeberg
 * and GitHub are both forges — so the host refines it. An unrecognised forge
 * falls back to the generic link mark rather than guessing a brand.
 */
function iconFor(link: ContactLink) {
  if (link.kind === 'forge') {
    const host = link.href.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    if (host.endsWith('codeberg.org')) return <BrandIcon src={codebergUrl} />;
    if (host.endsWith('github.com')) return <BrandIcon src={githubUrl} />;
    return <ExternalLinkIcon />;
  }
  switch (link.kind) {
    case 'email':
      return <MailIcon />;
    case 'pgp':
      return <KeyIcon />;
    case 'matrix':
      return <BrandIcon src={matrixUrl} />;
    default:
      return <ExternalLinkIcon />;
  }
}

export interface ContactIconProps {
  link: ContactLink;
}

export function ContactIcon({link}: ContactIconProps) {
  return (
    <span aria-hidden="true" data-kind={link.kind} {...stylex.props(styles.glyph)}>
      {iconFor(link)}
    </span>
  );
}

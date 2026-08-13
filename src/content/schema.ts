export type ContactKind = 'email' | 'forge' | 'pgp' | 'matrix' | 'other';

const CONTACT_KINDS: readonly ContactKind[] = ['email', 'forge', 'pgp', 'matrix', 'other'];

export interface Meta {
  name: string;
  tagline: string;
  location: string;
  pageTitle: string;
  metaDescription: string;
}

export interface About {
  heading: string;
  paragraphs: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  language: string;
  tags: string[];
  url: string;
  mirrorUrl: string | null;
  featured: boolean;
}

export interface Contribution {
  project: string;
  role: string;
  detail: string;
  url: string;
}

export interface ContactLink {
  label: string;
  href: string;
  kind: ContactKind;
}

export interface Legal {
  heading: string;
  body: string[];
}

export interface Content {
  meta: Meta;
  about: About;
  skills: SkillGroup[];
  projects: Project[];
  contributions: Contribution[];
  contact: ContactLink[];
  legal: Legal | null;
}

export class ContentError extends Error {
  constructor(message: string) {
    super(`content.json: ${message}`);
    this.name = 'ContentError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) throw new ContentError(`${path} is not an object`);
  return value;
}

function requireString(value: unknown, path: string): string {
  if (typeof value !== 'string') throw new ContentError(`${path} is not a string`);
  return value;
}

function requireBoolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') throw new ContentError(`${path} is not a boolean`);
  return value;
}

function requireArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) throw new ContentError(`${path} is not an array`);
  return value;
}

function requireStringArray(value: unknown, path: string): string[] {
  return requireArray(value, path).map((item, i) => requireString(item, `${path}[${i}]`));
}

function requirePresent(source: Record<string, unknown>, key: string): unknown {
  if (!(key in source) || source[key] === undefined || source[key] === null) {
    throw new ContentError(`${key} is missing`);
  }
  return source[key];
}

function parseMeta(raw: unknown): Meta {
  const o = requireRecord(raw, 'meta');
  return {
    name: requireString(o.name, 'meta.name'),
    tagline: requireString(o.tagline, 'meta.tagline'),
    location: requireString(o.location, 'meta.location'),
    pageTitle: requireString(o.pageTitle, 'meta.pageTitle'),
    metaDescription: requireString(o.metaDescription, 'meta.metaDescription'),
  };
}

function parseAbout(raw: unknown): About {
  const o = requireRecord(raw, 'about');
  return {
    heading: requireString(o.heading, 'about.heading'),
    paragraphs: requireStringArray(o.paragraphs, 'about.paragraphs'),
  };
}

function parseSkills(raw: unknown): SkillGroup[] {
  return requireArray(raw, 'skills').map((entry, i) => {
    const o = requireRecord(entry, `skills[${i}]`);
    return {
      group: requireString(o.group, `skills[${i}].group`),
      items: requireStringArray(o.items, `skills[${i}].items`),
    };
  });
}

function parseProjects(raw: unknown): Project[] {
  const list = requireArray(raw, 'projects');
  if (list.length === 0) throw new ContentError('projects is empty');
  return list.map((entry, i) => {
    const o = requireRecord(entry, `projects[${i}]`);
    const mirror = o.mirrorUrl;
    return {
      id: requireString(o.id, `projects[${i}].id`),
      name: requireString(o.name, `projects[${i}].name`),
      tagline: requireString(o.tagline, `projects[${i}].tagline`),
      description: requireString(o.description, `projects[${i}].description`),
      language: requireString(o.language, `projects[${i}].language`),
      tags: requireStringArray(o.tags, `projects[${i}].tags`),
      url: requireString(o.url, `projects[${i}].url`),
      mirrorUrl:
        mirror === undefined || mirror === null
          ? null
          : requireString(mirror, `projects[${i}].mirrorUrl`),
      featured: requireBoolean(o.featured, `projects[${i}].featured`),
    };
  });
}

function parseContributions(raw: unknown): Contribution[] {
  if (raw === undefined || raw === null) return [];
  return requireArray(raw, 'contributions').map((entry, i) => {
    const o = requireRecord(entry, `contributions[${i}]`);
    return {
      project: requireString(o.project, `contributions[${i}].project`),
      role: requireString(o.role, `contributions[${i}].role`),
      detail: requireString(o.detail, `contributions[${i}].detail`),
      url: requireString(o.url, `contributions[${i}].url`),
    };
  });
}

function parseContact(raw: unknown): ContactLink[] {
  return requireArray(raw, 'contact').map((entry, i) => {
    const o = requireRecord(entry, `contact[${i}]`);
    const kind = o.kind;
    return {
      label: requireString(o.label, `contact[${i}].label`),
      href: requireString(o.href, `contact[${i}].href`),
      kind:
        typeof kind === 'string' && (CONTACT_KINDS as readonly string[]).includes(kind)
          ? (kind as ContactKind)
          : 'other',
    };
  });
}

/**
 * Optional. A malformed legal block is dropped with a warning rather than
 * failing the page, because it is decorative relative to the rest of the site.
 */
function parseLegal(raw: unknown): Legal | null {
  if (raw === undefined || raw === null) return null;
  try {
    const o = requireRecord(raw, 'legal');
    return {
      heading: requireString(o.heading, 'legal.heading'),
      body: requireStringArray(o.body, 'legal.body'),
    };
  } catch (error) {
    console.warn(
      `Dropping invalid optional field: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}

export function parseContent(raw: unknown): Content {
  if (!isRecord(raw)) throw new ContentError('root is not an object');
  return {
    meta: parseMeta(requirePresent(raw, 'meta')),
    about: parseAbout(requirePresent(raw, 'about')),
    skills: parseSkills(requirePresent(raw, 'skills')),
    projects: parseProjects(requirePresent(raw, 'projects')),
    contributions: parseContributions(raw.contributions),
    contact: parseContact(requirePresent(raw, 'contact')),
    legal: parseLegal(raw.legal),
  };
}

/** Featured first; otherwise input order is preserved. Does not mutate. */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
}

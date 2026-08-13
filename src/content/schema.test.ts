import {describe, expect, it, vi} from 'vitest';
import {ContentError, parseContent, sortProjects} from './schema';
import {contentFixture} from '../test/fixtures';

describe('parseContent', () => {
  it('accepts a valid content object', () => {
    const parsed = parseContent(contentFixture());
    expect(parsed.meta.name).toBe('Niklas');
    expect(parsed.projects).toHaveLength(2);
  });

  it('rejects a non-object', () => {
    expect(() => parseContent(null)).toThrow(ContentError);
    expect(() => parseContent('nope')).toThrow(/content\.json: root is not an object/);
  });

  it('names the missing required field', () => {
    const bad = contentFixture() as unknown as Record<string, unknown>;
    delete bad.meta;
    expect(() => parseContent(bad)).toThrow(/content\.json: meta is missing/);
  });

  it('names the field path for a wrong type', () => {
    const bad = contentFixture();
    // @ts-expect-error deliberately wrong type
    bad.projects[1].url = 42;
    expect(() => parseContent(bad)).toThrow(
      /content\.json: projects\[1\]\.url is not a string/,
    );
  });

  it('rejects a non-array skills field', () => {
    const bad = contentFixture();
    // @ts-expect-error deliberately wrong type
    bad.skills = {};
    expect(() => parseContent(bad)).toThrow(/content\.json: skills is not an array/);
  });

  it('treats absent contributions as an empty list', () => {
    const bad = contentFixture() as unknown as Record<string, unknown>;
    delete bad.contributions;
    expect(parseContent(bad).contributions).toEqual([]);
  });

  it('drops an invalid optional legal block and warns', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const bad = contentFixture();
    // @ts-expect-error deliberately wrong type
    bad.legal = {heading: 'Impressum'};
    const parsed = parseContent(bad);
    expect(parsed.legal).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/legal\.body/));
    warn.mockRestore();
  });

  it('falls back to kind "other" for an unknown contact kind', () => {
    const input = contentFixture();
    // @ts-expect-error deliberately unknown kind
    input.contact[0].kind = 'carrier-pigeon';
    expect(parseContent(input).contact[0].kind).toBe('other');
  });

  it('rejects an empty projects array', () => {
    const bad = contentFixture();
    bad.projects = [];
    expect(() => parseContent(bad)).toThrow(/content\.json: projects is empty/);
  });
});

describe('sortProjects', () => {
  it('puts featured projects first', () => {
    const sorted = sortProjects(contentFixture().projects);
    expect(sorted.map((p) => p.id)).toEqual(['nix-flake-graph', 'tessera']);
  });

  it('preserves array order within the same featured value', () => {
    const projects = contentFixture().projects.map((p) => ({...p, featured: false}));
    expect(sortProjects(projects).map((p) => p.id)).toEqual(['tessera', 'nix-flake-graph']);
  });

  it('does not mutate its input', () => {
    const projects = contentFixture().projects;
    const before = projects.map((p) => p.id);
    sortProjects(projects);
    expect(projects.map((p) => p.id)).toEqual(before);
  });
});

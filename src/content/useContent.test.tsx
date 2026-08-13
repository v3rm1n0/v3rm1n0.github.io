import {describe, expect, it, vi, afterEach} from 'vitest';
import {renderHook, waitFor} from '@testing-library/react';
import {useContent} from './useContent';
import {contentFixture} from '../test/fixtures';

function mockFetchOnce(impl: () => Promise<Response>) {
  vi.stubGlobal('fetch', vi.fn(impl));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useContent', () => {
  it('starts in the loading state', () => {
    mockFetchOnce(() => new Promise(() => {}));
    const {result} = renderHook(() => useContent());
    expect(result.current.status).toBe('loading');
  });

  it('resolves to ready with parsed content', async () => {
    mockFetchOnce(async () => new Response(JSON.stringify(contentFixture()), {status: 200}));
    const {result} = renderHook(() => useContent());
    await waitFor(() => expect(result.current.status).toBe('ready'));
    if (result.current.status !== 'ready') throw new Error('expected ready');
    expect(result.current.content.meta.name).toBe('Niklas');
  });

  it('reports the status code on a non-200 response', async () => {
    mockFetchOnce(async () => new Response('not found', {status: 404}));
    const {result} = renderHook(() => useContent());
    await waitFor(() => expect(result.current.status).toBe('error'));
    if (result.current.status !== 'error') throw new Error('expected error');
    expect(result.current.message).toMatch(/404/);
  });

  it('reports a network failure', async () => {
    mockFetchOnce(async () => {
      throw new TypeError('Failed to fetch');
    });
    const {result} = renderHook(() => useContent());
    await waitFor(() => expect(result.current.status).toBe('error'));
    if (result.current.status !== 'error') throw new Error('expected error');
    expect(result.current.message).toMatch(/Failed to fetch/);
  });

  it('reports malformed JSON', async () => {
    mockFetchOnce(async () => new Response('{not json', {status: 200}));
    const {result} = renderHook(() => useContent());
    await waitFor(() => expect(result.current.status).toBe('error'));
    if (result.current.status !== 'error') throw new Error('expected error');
    expect(result.current.message).toMatch(/could not be parsed as JSON/);
  });

  it('surfaces the schema error message', async () => {
    const bad = contentFixture() as Record<string, unknown>;
    delete bad.meta;
    mockFetchOnce(async () => new Response(JSON.stringify(bad), {status: 200}));
    const {result} = renderHook(() => useContent());
    await waitFor(() => expect(result.current.status).toBe('error'));
    if (result.current.status !== 'error') throw new Error('expected error');
    expect(result.current.message).toMatch(/content\.json: meta is missing/);
  });

  it('fetches the given url', async () => {
    mockFetchOnce(async () => new Response(JSON.stringify(contentFixture()), {status: 200}));
    renderHook(() => useContent('/other.json'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/other.json', expect.anything()));
  });
});

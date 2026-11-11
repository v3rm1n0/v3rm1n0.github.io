import {useEffect, useState} from 'react';
import {type Content, ContentError, parseContent} from './schema';

export type ContentState =
  | {status: 'loading'}
  | {status: 'ready'; content: Content}
  | {status: 'error'; message: string};

export function useContent(url = '/content.json', initialContent?: Content): ContentState {
  const [state, setState] = useState<ContentState>(() => {
    if (initialContent) {
      return {status: 'ready', content: initialContent};
    }
    if (typeof document !== 'undefined') {
      const embedded = document.getElementById('content-data');
      if (embedded?.textContent) {
        try {
          return {status: 'ready', content: parseContent(JSON.parse(embedded.textContent))};
        } catch {
          // Fall through to network fetch
        }
      }
    }
    return {status: 'loading'};
  });

  useEffect(() => {
    if (state.status === 'ready' && url === '/content.json') {
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function load() {
      let body: string;
      try {
        const response = await fetch(url, {signal: controller.signal});
        if (!response.ok) {
          throw new Error(`request failed with status ${response.status}`);
        }
        body = await response.text();
      } catch (error) {
        if (controller.signal.aborted) return;
        if (active) {
          setState({
            status: 'error',
            message: `Could not load ${url}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
        }
        return;
      }

      let raw: unknown;
      try {
        raw = JSON.parse(body);
      } catch (error) {
        if (active) {
          setState({
            status: 'error',
            message: `${url} could not be parsed as JSON: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
        }
        return;
      }

      try {
        const content = parseContent(raw);
        if (active) setState({status: 'ready', content});
      } catch (error) {
        if (active) {
          setState({
            status: 'error',
            message:
              error instanceof ContentError
                ? error.message
                : `Unexpected validation failure: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
          });
        }
      }
    }

    void load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  return state;
}

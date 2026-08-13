import {describe, expect, it, vi, afterEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {App} from './App';
import {contentFixture} from './test/fixtures';
import {MODE_STORAGE_KEY} from './theme';

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

function mockContent(body: unknown, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(body), {status})),
  );
}

describe('App', () => {
  it('renders the nav before content arrives', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    render(<App />);
    expect(screen.getByRole('navigation', {name: 'Main'})).toBeInTheDocument();
  });

  it('renders every section once content loads', async () => {
    mockContent(contentFixture());
    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Niklas'),
    );
    expect(screen.getByRole('heading', {name: 'About'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Skills'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Projects'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Contact'})).toBeInTheDocument();
  });

  it('shows the diagnostic error when content fails to validate', async () => {
    const bad = contentFixture() as unknown as Record<string, unknown>;
    delete bad.about;
    mockContent(bad);
    render(<App />);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByText(/about is missing/)).toBeInTheDocument();
  });

  it('persists a theme mode change', async () => {
    mockContent(contentFixture());
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', {name: /switch to/i}));
    await waitFor(() => expect(localStorage.getItem(MODE_STORAGE_KEY)).toBe('light'));
  });

  it('sets the document title from meta', async () => {
    mockContent(contentFixture());
    render(<App />);
    await waitFor(() => expect(document.title).toBe('Niklas'));
  });
});

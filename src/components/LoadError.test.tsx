import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {LoadError} from './LoadError';

describe('LoadError', () => {
  it('shows the diagnostic message verbatim', () => {
    render(<LoadError message="content.json: projects[2].url is not a string" />);
    expect(
      screen.getByText('content.json: projects[2].url is not a string'),
    ).toBeInTheDocument();
  });

  it('is announced as an alert', () => {
    render(<LoadError message="boom" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

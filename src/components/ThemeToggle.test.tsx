import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ThemeToggle} from './ThemeToggle';

describe('ThemeToggle', () => {
  it('labels the button with the mode it will switch to', () => {
    render(<ThemeToggle mode="system" onChange={() => {}} />);
    expect(screen.getByRole('button', {name: /switch to light/i})).toBeInTheDocument();
  });

  it('calls onChange with the next mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ThemeToggle mode="light" onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('cycles back to system from dark', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ThemeToggle mode="dark" onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('system');
  });
});

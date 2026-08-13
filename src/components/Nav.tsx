import {ThemeToggle} from './ThemeToggle';
import type {Mode} from '../theme';

export const SECTIONS = [
  {id: 'about', label: 'About'},
  {id: 'skills', label: 'Skills'},
  {id: 'projects', label: 'Projects'},
  {id: 'contact', label: 'Contact'},
] as const;

export interface NavProps {
  name: string;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function Nav({name, mode, onModeChange}: NavProps) {
  return (
    <header>
      <a href="#main">Skip to content</a>
      <nav aria-label="Main">
        <span>{name}</span>
        <ul>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
        <ThemeToggle mode={mode} onChange={onModeChange} />
      </nav>
    </header>
  );
}

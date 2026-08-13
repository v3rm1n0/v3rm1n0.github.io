import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  alert: {
    marginBlock: '3rem',
    padding: '1.25rem',
    borderRadius: 'var(--radius-container)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--color-error)',
    backgroundColor: 'var(--color-error-muted)',
  },
  heading: {
    margin: '0 0 0.5rem',
    fontSize: '1.0625rem',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
  },
  message: {
    margin: 0,
    fontFamily: 'var(--font-family-code)',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--color-text-primary)',
    overflowWrap: 'anywhere',
  },
  hint: {
    margin: '0.75rem 0 0',
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  },
});

export interface LoadErrorProps {
  message: string;
}

export function LoadError({message}: LoadErrorProps) {
  return (
    <div role="alert" {...stylex.props(styles.alert)}>
      <h2 {...stylex.props(styles.heading)}>Content failed to load</h2>
      <p {...stylex.props(styles.message)}>{message}</p>
      <p {...stylex.props(styles.hint)}>Check the file, then reload the page.</p>
    </div>
  );
}

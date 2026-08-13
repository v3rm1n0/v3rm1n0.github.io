export interface LoadErrorProps {
  message: string;
}

export function LoadError({message}: LoadErrorProps) {
  return (
    <div role="alert">
      <h2>Content failed to load</h2>
      <p>{message}</p>
      <p>Check the file, then reload the page.</p>
    </div>
  );
}

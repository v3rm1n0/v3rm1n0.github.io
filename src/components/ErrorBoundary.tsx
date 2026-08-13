import {Component, type ErrorInfo, type ReactNode} from 'react';
import {LoadError} from './LoadError';

interface Props {
  children: ReactNode;
}

interface State {
  message: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {message: null};

  static getDerivedStateFromError(error: unknown): State {
    return {message: error instanceof Error ? error.message : String(error)};
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled render error', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.message !== null) {
      return <LoadError message={`Render error: ${this.state.message}`} />;
    }
    return this.props.children;
  }
}

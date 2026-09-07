import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown): void {
    console.error("ErrorBoundary capturou erro:", error, info);
  }

  private tentarNovamente = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="card badge-warn" role="alert">
          <p>Algo deu errado ao montar esta etapa do LGR.</p>
          <button
            type="button"
            className="primary"
            onClick={this.tentarNovamente}
          >
            Tentar de novo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

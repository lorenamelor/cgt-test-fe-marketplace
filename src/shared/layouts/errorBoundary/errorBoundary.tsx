import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Button } from '../../components/button';

export type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Can be integrated with a logging service (Sentry, etc.) later
    // eslint-disable-next-line no-console
    console.error('Uncaught error in ErrorBoundary', error, errorInfo);
  }

  private handleReload = () => {
    // For the MVP, a simple reload is enough.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_22px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-2xl font-semibold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-sm text-slate-600">
              An unexpected error occurred. You can try reloading the page to continue shopping.
            </p>

            <div className="mt-6">
              <Button type="button" onClick={this.handleReload}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

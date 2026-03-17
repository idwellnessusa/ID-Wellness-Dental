import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  props: Props;
  state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      window.location.reload();
      return { hasError: false };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light text-brand-dark p-4 text-center">
          <div>
            <h1 className="text-2xl font-serif mb-4">Something went wrong.</h1>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-gold text-white px-6 py-2 rounded-full hover:bg-brand-gold-hover transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

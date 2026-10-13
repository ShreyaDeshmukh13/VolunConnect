import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('UI error:', error, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="container py-5 text-center">
        <h2>Something went wrong</h2>
        <button className="btn btn-primary mt-3" onClick={() => window.location.assign('/')}>Back to Home</button>
      </div>
    );
  }
}

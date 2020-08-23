import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.group('com did catch');
    console.log(error);
    console.log(info);
    console.groupEnd();
  }
  render() {
    const { error } = this.state;
    if (error !== null) {
      return (
        <div>
          <h2>Somthing went wrong</h2>
          <div>{error.toString()}</div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;

import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('❌ Unhandled Promise rejection:', event.reason);
      setErrorCount(prev => prev + 1);
      
      const errorMessage = event.reason?.message || String(event.reason);
      setError({
        message: errorMessage,
        type: 'Promise Rejection',
        timestamp: new Date().toLocaleString()
      });
    };

    const handleError = (event) => {
      console.error('❌ Global error:', event.error);
      setErrorCount(prev => prev + 1);
      
      setError({
        message: event.error?.message || event.message || 'Unknown error',
        type: 'Global Error',
        timestamp: new Date().toLocaleString()
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="error-boundary animate-fade-in">
        <div className="error-boundary-title">
          ❌ Oops! {error.type}
        </div>
        
        <p className="error-boundary-details mb-3">
          {error.message}
        </p>

        <p className="text-xs text-gray-600 mb-4">
          {error.timestamp} (Error #{errorCount})
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setError(null)}
            className="btn btn-secondary btn-sm"
          >
            Dismiss
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-danger btn-sm"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;

/* import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      // You can log the error to an error reporting service here
      console.error('Error caught by ErrorBoundary');
    }
  }, [hasError]);

  const handleComponentError = () => {
    setHasError(true);
  };

  if (hasError) {
    // Render fallback UI when an error occurs
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <React.Fragment>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { handleComponentError });
        }
        return child;
      })}
    </React.Fragment>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary; */
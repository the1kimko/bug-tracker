import { useEffect } from 'react';

const useLogger = (componentName) => {
  useEffect(() => {
    console.log(`✓ ${componentName} mounted`);
    return () => {
      console.log(`✗ ${componentName} unmounted`);
    };
  }, [componentName]);

  const logAction = (action, data) => {
    console.log(`📝 [${componentName}] ${action}`, data);
  };

  const logError = (error, context) => {
    console.error(`❌ [${componentName}] ${context}`, error);
  };

  return { logAction, logError };
};

export default useLogger;

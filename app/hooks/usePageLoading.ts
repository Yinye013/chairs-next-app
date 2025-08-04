import { useState, useEffect } from 'react';

function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handler for the `load` event
    const handlePageLoad = (): void => setIsLoading(false);

    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Check if the page has already loaded (for fast-loading scenarios)
      if (document.readyState === 'complete') {
        setIsLoading(false);
      } else {
        // Listen for the `load` event if the page hasn't loaded yet
        window.addEventListener('load', handlePageLoad);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('load', handlePageLoad);
      }
    } else {
      // On server side, set loading to false immediately
      setIsLoading(false);
    }
  }, []);

  return isLoading;
}

export default usePageLoading;

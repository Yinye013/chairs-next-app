'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function useRouteLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start loading when pathname changes
    console.log('Route change detected, starting loading state.');
    setIsLoading(true);

    // Complete loading after a longer delay to make it visible
    const timer = setTimeout(() => {
      console.log('Stopping loading state.');
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isLoading;
}

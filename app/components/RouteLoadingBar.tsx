'use client';

import LoadingBar from './LoadingBar';
import useRouteLoading from '../hooks/useRouteLoading';

/**
 * Wraps the route-change progress bar so the `useSearchParams()` inside
 * `useRouteLoading` is isolated to this subtree.
 *
 * Next 14.2 bails out of static prerendering for any client component reading
 * search params unless it sits under a Suspense boundary. Keeping it in its
 * own component means only this bar opts into client-side rendering, instead
 * of forcing every page in the app to render dynamically.
 */
export default function RouteLoadingBar() {
  const isLoading = useRouteLoading();
  return <LoadingBar isLoading={isLoading} />;
}

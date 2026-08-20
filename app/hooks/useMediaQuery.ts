'use client';

import { useSyncExternalStore, useCallback } from 'react';

/**
 * Subscribes to a CSS media query and re-renders when it changes.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect` so the
 * value is read during render on the client and stays consistent with React's
 * concurrent rendering. The server snapshot is always `false`: the server has
 * no viewport, so markup is rendered mobile-first and corrects on hydration.
 *
 * Prefer Tailwind's responsive classes for pure styling. Reach for these hooks
 * only when the *markup or behaviour* has to differ — rendering a different
 * component, changing a slide count, disabling a listener.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !window.matchMedia) {
        return () => {};
      }
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  // No viewport on the server — always report "not matching".
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Breakpoints mirror Tailwind's defaults so the hooks and the utility classes
 * never disagree about where a layout changes.
 *   mobile  : < 768px   (below `md`)
 *   tablet  : 768–1023px (`md` up to `lg`)
 *   desktop : >= 1024px  (`lg` and up)
 */
export const BREAKPOINTS = {
  md: 768,
  lg: 1024,
} as const;

/** True below Tailwind's `md` (< 768px). */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/** True between `md` and `lg` (768px–1023px). */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  );
}

/** True at `lg` and above (>= 1024px). */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

/**
 * True once the component has hydrated on the client. Pair with the hooks
 * above when a wrong first paint would be visible, so you can defer rendering
 * viewport-dependent markup until the real value is known.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

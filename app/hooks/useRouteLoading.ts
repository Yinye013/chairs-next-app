'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * True while a route change is in flight.
 *
 * The previous version ran its effect *after* navigation had already
 * committed, then held the bar up for a fixed 800ms — so it showed progress
 * for a page that had finished loading, missed the actual wait entirely, and
 * flashed once on first mount when nothing was loading.
 *
 * This version starts the bar when a link is clicked (capture phase, before
 * the router takes over) and clears it once the committed URL changes. That
 * covers the real wait, which in this app can be seconds — a `[slug]` route
 * compiling in dev, or a Sanity fetch on a cold ISR entry.
 *
 * A `<Link>` click is the only navigation this can observe from userland.
 * Back/forward is handled via `popstate`; programmatic `router.push` in other
 * components is not covered and would need the router events Next 14's App
 * Router does not expose.
 */
export default function useRouteLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The URL that was current when a navigation started, so the effect below
  // can tell a real commit from an unrelated re-render.
  const startedAt = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Ignore anything the browser would not treat as an in-app navigation.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      // Same-page anchors and external links are not route changes.
      if (href.startsWith('#') || href.startsWith('mailto:')) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      startedAt.current = window.location.pathname + window.location.search;
      setIsLoading(true);
    };

    const onPopState = () => {
      startedAt.current = window.location.pathname + window.location.search;
      setIsLoading(true);
    };

    // Capture phase: run before the router's own click handler.
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Clear once the URL actually changes — that is the commit.
  useEffect(() => {
    if (startedAt.current === null) return;
    const current = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    if (current !== startedAt.current) {
      startedAt.current = null;
      setIsLoading(false);
    }
  }, [pathname, searchParams]);

  // Safety valve: never leave the bar stuck if a navigation is cancelled or
  // the URL never changes (a failed route, a click that resolves to nothing).
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      startedAt.current = null;
      setIsLoading(false);
    }, 10_000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return isLoading;
}

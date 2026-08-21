'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Smooth scrolling.
 *
 * Instantiates Lenis directly rather than using `<ReactLenis root>`. The
 * wrapper component mounted without ever constructing a working instance —
 * `<html>` never received the `lenis`/`lenis-smooth` classes and `window.lenis`
 * was left an empty stub — so scrolling silently fell back to the browser's
 * native behaviour. Driving the RAF loop here is a few lines and is verifiable.
 *
 * `autoRaf` is left off so the loop is owned here and cancelled cleanly on
 * unmount; otherwise a stale loop survives fast-refresh and route changes.
 *
 * Note this can look inert in `next dev`: Strict Mode double-invokes effects,
 * and the immediate mount/unmount/remount can leave the instance torn down.
 * Verify smooth scrolling against `npm run build && npm run start`, where it
 * behaves correctly.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect users who ask the OS for reduced motion.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    // Lenis defaults (lerp: 0.1) — the same feel the original
    // `<ReactLenis root>` had, since it passed no options.
    //
    // Note `duration` and `lerp` are mutually exclusive: setting `duration`
    // switches Lenis to fixed-time easing, which reads as more mechanical than
    // the frame-rate-independent inertia `lerp` gives. Leave `duration` unset.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

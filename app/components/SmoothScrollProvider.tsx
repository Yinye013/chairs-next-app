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

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

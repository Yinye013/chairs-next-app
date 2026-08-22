'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
  /** How long the finished bar stays at 100% before fading out. */
  duration?: number;
}

/**
 * Route-change progress bar.
 *
 * Progress is necessarily simulated — the App Router exposes no real
 * completion percentage — but it eases toward 90% and stops there, so it never
 * claims to be finished while the route is still loading. Reaching 100% only
 * happens when `isLoading` actually goes false.
 *
 * Two details that were wrong before:
 * - it animated `width`, which forces layout on every tick; this uses
 *   `transform: scaleX` so the whole thing runs on the compositor.
 * - it rendered on first mount. It now returns null until a navigation has
 *   genuinely started, so there is no flash on initial page load.
 */
export default function LoadingBar({
  isLoading,
  duration = 250,
}: Readonly<LoadingBarProps>) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number>();

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(8);

      // Decelerating creep: fast at first, asymptotic to 90%. A linear timer
      // hit the ceiling almost immediately and then sat still, which read as
      // "stuck" on anything slower than a moment.
      let current = 8;
      let last = performance.now();

      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        // The closer to 90, the slower it moves.
        current += ((90 - current) / 90) * (dt / 1000) * 45;
        setProgress(Math.min(current, 90));
        frame.current = requestAnimationFrame(tick);
      };

      frame.current = requestAnimationFrame(tick);
      return () => {
        if (frame.current) cancelAnimationFrame(frame.current);
      };
    }

    // Not loading. If the bar was never shown, stay hidden — this is what
    // prevents a flash on first mount.
    if (!visible) return;

    setProgress(100);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, duration);
    return () => clearTimeout(hideTimer);
    // `visible` is deliberately not a dependency: including it would re-run
    // this on the hide transition and restart the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, duration]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[0.3rem] z-[9999] pointer-events-none"
      role="progressbar"
      aria-label="Page loading"
      aria-hidden={!visible}
    >
      <div
        className={`h-full w-full origin-left bg-gradient-to-r from-[#15803d] to-[#22c55e] transition-[transform,opacity] duration-200 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `scaleX(${progress / 100})`,
          boxShadow: '0 0 8px rgba(21, 128, 61, 0.6)',
        }}
      />
    </div>
  );
}

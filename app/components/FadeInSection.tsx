'use client';

import { useInView } from 'react-intersection-observer';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * One-shot reveal: fades and rises into place the first time it scrolls into
 * view, then stays put.
 *
 * Plain CSS transitions rather than framer-motion. The animation is a single
 * opacity + translateY on entry — both compositor properties — so the library
 * bought nothing here while shipping ~104KB and running its own render loop.
 * `triggerOnce` means there is no exit state to manage either.
 *
 * The observer still comes from react-intersection-observer (already a
 * dependency, ~2KB) rather than a hand-rolled one, so the SSR-safe behaviour
 * and cleanup stay handled.
 *
 * ⚠️ Do not reintroduce a "fade back out on exit" here: setting opacity to 0
 * when the section leaves the viewport is what made sections render blank.
 */
export default function FadeInSection({
  children,
  className,
  id,
}: FadeInSectionProps) {
  // rootMargin starts the reveal slightly before the edge so it is not
  // visibly late.
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px',
  });

  return (
    <div
      ref={ref}
      id={id}
      className={[
        'transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[25px]',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMultipleAnimations from '@/app/hooks/useMultipleAnimations';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function FadeInSection({
  children,
  className,
  id,
}: FadeInSectionProps) {
  // `triggerOnce` so the reveal plays once and the section then stays put.
  // Without it the observer fires on every crossing and the hook below resets
  // the section to `opacity: 0` whenever it leaves the viewport — the cause of
  // sections rendering blank — while re-running the animation on each scroll
  // adds main-thread work and forced reflow for no visual gain.
  // `rootMargin` starts the reveal slightly before the edge so it is not
  // visibly late.
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px',
  });
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.div ref={ref} animate={animation} className={className} id={id}>
      {children}
    </motion.div>
  );
}

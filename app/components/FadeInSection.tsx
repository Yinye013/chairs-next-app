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
  const { ref, inView } = useInView();
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.div ref={ref} animate={animation} className={className} id={id}>
      {children}
    </motion.div>
  );
}

'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/app/hooks/useCountUp';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter = ({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  className = ''
}: AnimatedCounterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { count, startCounting } = useCountUp({
    end,
    duration,
    decimals,
    startOnInView: true,
  });

  useEffect(() => {
    if (inView) {
      startCounting();
    }
  }, [inView, startCounting]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};
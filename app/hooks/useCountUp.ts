import { useState, useEffect } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  startOnInView?: boolean;
  decimals?: number;
}

export const useCountUp = ({
  end,
  duration = 2000,
  startOnInView = true,
  decimals = 0
}: UseCountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startCounting = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = startValue + (end - startValue) * easeOut;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!startOnInView) {
      startCounting();
    }
  }, [startOnInView]);

  return {
    count: decimals > 0 ? Number(count.toFixed(decimals)) : Math.floor(count),
    startCounting
  };
};
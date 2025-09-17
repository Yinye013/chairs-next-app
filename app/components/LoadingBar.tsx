'use client';

import { useEffect, useState } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
  duration?: number;
}

export default function LoadingBar({
  isLoading,
  duration = 300,
}: Readonly<LoadingBarProps>) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('LoadingBar: isLoading changed to', isLoading);

    if (isLoading) {
      // console.log('LoadingBar: Starting loading animation');
      setVisible(true);
      setProgress(10);

      // Simulate progress with realistic increments
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Don't complete until loading is done
          const newProgress = prev + Math.random() * 10 + 5;
          console.log('LoadingBar: Progress updated to', newProgress);
          return Math.min(newProgress, 90);
        });
      }, 50);

      return () => clearInterval(progressTimer);
    } else {
      setProgress(100);

      // Hide after completing
      const hideTimer = setTimeout(() => {
        console.log('LoadingBar: Hiding');
        setVisible(false);
        setProgress(0);
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [isLoading, duration]);

  console.log(
    'LoadingBar: Rendering with visible=',
    visible,
    'progress=',
    progress,
  );

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
      <div
        className={`h-2 bg-gradient-to-r from-[#15803d] to-[#22c55e] transition-all duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${progress}%`,
          boxShadow:
            '0 0 15px rgba(21, 128, 61, 1), 0 0 8px rgba(21, 128, 61, 0.7)',
        }}
      />
    </div>
  );
}

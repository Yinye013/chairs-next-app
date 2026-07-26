'use client';

import dynamic from 'next/dynamic';
import LoadingAnimation from '@/animations/loading.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Lottie animationData={LoadingAnimation} />
    </div>
  );
}

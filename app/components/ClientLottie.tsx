'use client';

import dynamic from 'next/dynamic';
import type { LottieComponentProps } from 'lottie-react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function ClientLottie(props: LottieComponentProps) {
  return <Lottie {...props} />;
}

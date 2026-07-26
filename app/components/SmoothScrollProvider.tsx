'use client';

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { LottieComponentProps } from 'lottie-react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Animation JSON is 100–760KB each. Imported statically it is inlined into the
// route's JS chunk, so it blocks parsing even though nothing can play until
// lottie-react has loaded anyway. Fetching from /animations at runtime keeps it
// out of the bundle entirely and lets the browser cache it separately.
//
// Deliberately NOT gated on visibility. These sit inside FadeInSection, which
// holds its subtree at opacity:0 until scrolled into view — an IntersectionObserver
// here would be racing a wrapper that is invisible for unrelated reasons.
type ClientLottieProps = Omit<LottieComponentProps, 'animationData'> & {
  /** Path under /public, e.g. '/animations/story.json'. */
  src: string;
};

export default function ClientLottie({ src, ...props }: ClientLottieProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);
  // Guards against a slow fetch resolving after the component has unmounted.
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (alive.current) setAnimationData(data);
      })
      .catch((err) => {
        // A missing animation is decorative, not fatal — leave the reserved
        // space empty rather than taking the page down.
        console.error(`ClientLottie: failed to load ${src}`, err);
      });

    return () => {
      alive.current = false;
    };
  }, [src]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} {...props} />;
}

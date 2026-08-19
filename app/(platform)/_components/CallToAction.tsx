'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ShoppingCart, Star, Truck, RotateCcw } from 'lucide-react';
import { AnimatedCounter } from '@/app/components/AnimatedCounter';

const STATS = [
  { end: 10000, suffix: '+', label: 'Happy Customers', duration: 2500 },
  { end: 4.9, decimals: 1, label: 'Average Rating', duration: 2000, star: true },
  { end: 500, suffix: '+', label: 'Chair Models', duration: 2200 },
];

const CallToAction = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      ref={ref}
      className="py-[9.6rem] mb-[4rem] rounded-3xl bg-gradient-to-br from-[#14532d] via-[#15803d] to-[#16a34a] relative overflow-hidden"
    >
      {/* soft ambient glows for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-[10%] w-[45rem] h-[45rem] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -left-[10%] w-[40rem] h-[40rem] rounded-full bg-[#22c55e]/20 blur-3xl"
      />

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            {...fade(0.1)}
            className="subheading !text-white/70 !mb-[1.6rem]"
          >
            READY TO SHOP?
          </motion.p>

          <motion.h2
            {...fade(0.2)}
            className="heading-secondary !text-white !mb-[2.4rem] !text-[3.6rem] lg:!text-[4.4rem] leading-tight"
          >
            Discover Your Perfect Chair Today
          </motion.h2>

          <motion.p
            {...fade(0.3)}
            className="text-[1.8rem] text-white/80 mb-[5.6rem] leading-relaxed max-w-[60ch] mx-auto"
          >
            Join thousands of satisfied customers who have transformed their
            homes with our premium chairs &mdash; unmatched comfort, timeless
            design, and quality that lasts for years.
          </motion.p>

          {/* Stats */}
          <motion.div
            {...fade(0.4)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-[3.2rem] mb-[5.6rem] py-[3.2rem] border-y border-white/20"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center items-center gap-2 mb-[0.8rem]">
                  {stat.star && (
                    <Star
                      className="w-7 h-7 text-yellow-300 fill-current"
                      aria-hidden
                    />
                  )}
                  <span className="text-[3.6rem] font-bold text-white leading-none">
                    <AnimatedCounter
                      end={stat.end}
                      duration={stat.duration}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      className="inline-block"
                    />
                  </span>
                </div>
                <div className="text-[1.5rem] uppercase tracking-[1px] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            {...fade(0.5)}
            className="flex flex-col sm:flex-row gap-[1.6rem] justify-center items-center mb-[3.2rem]"
          >
            <Link
              href="/bestsellers"
              className="group inline-flex items-center justify-center bg-white text-[#15803d] text-[1.8rem] font-bold py-[1.6rem] px-[3.2rem] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Shop Now
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cart"
              className="group inline-flex items-center justify-center border-2 border-white/60 text-white text-[1.8rem] font-semibold py-[1.6rem] px-[3.2rem] rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              View Cart
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Reassurance strip */}
          <motion.ul
            {...fade(0.6)}
            className="flex flex-wrap justify-center items-center gap-x-[3.2rem] gap-y-[1.2rem] text-[1.4rem] text-white/70"
          >
            <li className="flex items-center gap-2">
              <Truck className="w-5 h-5" aria-hidden /> Free shipping
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" aria-hidden /> 30-day returns
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-5 h-5" aria-hidden /> Lifetime warranty
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

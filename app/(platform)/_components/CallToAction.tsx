'use client';

import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMultipleAnimations from '@/app/hooks/useMultipleAnimations';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { AnimatedCounter } from '@/app/components/AnimatedCounter';

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.section
      ref={ref}
      animate={animation}
      className="py-[9.6rem] mb-[4rem] bg-gradient-to-br from-[#15803d] via-[#16a34a] to-[#22c55e] relative overflow-hidden"
    >
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subheading */}
          <motion.p
            className="subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            READY TO SHOP?
          </motion.p>

          <motion.h2
            className="heading-secondary !text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Discover Your Perfect Chair Today
          </motion.h2>

          <motion.p
            className="text-[1.8rem] text-white/90 mb-12 leading-relaxed max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Join thousands of satisfied customers who have transformed their
            homes with our premium chairs. Experience unmatched comfort,
            timeless design, and exceptional quality that lasts for years.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 mb-[6.4rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={10000}
                  duration={2500}
                  suffix="+"
                  className="inline-block"
                />
              </div>
              <div className="text-white/80 text-lg">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center mb-2">
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
                <span className="text-4xl font-bold text-white ml-2">
                  <AnimatedCounter
                    end={4.9}
                    duration={2000}
                    decimals={1}
                    className="inline-block"
                  />
                </span>
              </div>
              <div className="text-[1.6rem] text-[#666]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={500}
                  duration={2200}
                  suffix="+"
                  className="inline-block"
                />
              </div>
              <div className="text-white/80 text-lg">Chair Models</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-[2.4rem] justify-center items-center mb-[4.8rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/bestsellers"
              className="group inline-flex items-center justify-center bg-[#15803d] text-white text-[1.8rem] font-semibold py-[1.6rem] px-[3.2rem] rounded-lg hover:bg-[#166534] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <ShoppingCart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Shop Now
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cart"
              className="group inline-flex items-center justify-center border-2 border-[#15803d] text-[#15803d] text-[1.8rem] font-semibold py-[1.6rem] px-[3.2rem] rounded-lg hover:bg-[#15803d] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              View Cart
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            className="pt-[3.2rem] border-t border-[#15803d]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-[3.2rem] text-[#666]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#15803d] rounded-full"></div>
                <span className="text-[1.6rem]">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#15803d] rounded-full"></div>
                <span className="text-[1.6rem]">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#15803d] rounded-full"></div>
                <span className="text-[1.6rem]">Lifetime Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;

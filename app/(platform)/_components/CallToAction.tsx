'use client';

import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMultipleAnimations from '@/app/hooks/useMultipleAnimations';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';

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
      className="pt-[4.8rem] pb-[9.6rem] mb-[4rem] bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]"
    >
      <div className="container relative">
        <div className="text-center max-w-7xl mx-auto">
          <motion.p
            className="subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            READY TO SHOP?
          </motion.p>

          <motion.h2
            className="heading-secondary mb-[2.4rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Discover Your Perfect Chair Today
          </motion.h2>

          <motion.p
            className="text-[1.8rem] leading-relaxed mb-[4.8rem] max-w-5xl mx-auto"
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
              <div className="text-[3.6rem] font-bold text-[#15803d] mb-[1.2rem]">
                10K+
              </div>
              <div className="text-[1.6rem] text-[#666]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center mb-[1.2rem]">
                <Star className="w-8 h-8 text-[#e67e22] fill-current mr-2" />
                <span className="text-[3.6rem] font-bold text-[#15803d]">
                  4.9
                </span>
              </div>
              <div className="text-[1.6rem] text-[#666]">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-[3.6rem] font-bold text-[#15803d] mb-[1.2rem]">
                500+
              </div>
              <div className="text-[1.6rem] text-[#666]">Chair Models</div>
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

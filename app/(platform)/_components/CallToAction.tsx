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
      className="py-[9.6rem] bg-gradient-to-br from-[#15803d] via-[#16a34a] to-[#22c55e] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subheading */}
          <motion.p
            className="subheading text-white/90 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            READY TO TRANSFORM YOUR SPACE?
          </motion.p>

          {/* Main heading */}
          <motion.h2
            className="heading-secondary text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Discover Your Perfect Chair Today
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[1.8rem] text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Join thousands of satisfied customers who have transformed their homes with our premium chairs.
            Experience unmatched comfort, timeless design, and exceptional quality that lasts for years.
          </motion.p>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-lg">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center mb-2">
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
                <span className="text-4xl font-bold text-white ml-2">4.9</span>
              </div>
              <div className="text-white/80 text-lg">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 text-lg">Chair Models</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/bestsellers"
              className="group inline-flex items-center justify-center bg-white text-[#15803d] text-[1.8rem] font-semibold py-6 px-10 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-[200px]"
            >
              <ShoppingCart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Shop Now
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cart"
              className="group inline-flex items-center justify-center border-2 border-white text-white text-[1.8rem] font-semibold py-6 px-10 rounded-xl hover:bg-white hover:text-[#15803d] transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              View Cart
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <span className="text-lg">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <span className="text-lg">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <span className="text-lg">Lifetime Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
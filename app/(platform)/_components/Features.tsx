'use client';

import React from 'react';
import { featuresArr } from '../../utils/featuresFiles';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMultipleAnimations from '../../hooks/useMultipleAnimations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

function Features() {
  let { ref, inView } = useInView();
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.div ref={ref} animate={animation} className="">
      <p className="subheading">As featured in</p>
      <h2 className="heading-secondary">Where Our Chairs Have Been</h2>
      <>
        <div className="w-full h-[200px] overflow-hidden flex justify-center items-center">
          <Swiper
            spaceBetween={10} // Space between slides
            slidesPerView={3} // Number of visible slides
            loop={true} // Enables infinite loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false, // Continue scrolling on user interaction
            }}
            speed={2000} // Scrolling speed (lower is faster)
            modules={[Autoplay]}
            className="flex justify-center items-center"
          >
            {featuresArr.concat(featuresArr).map((feat) => (
              <SwiperSlide key={feat.id}>
                <div className="h-[200px] flex justify-center items-center">
                  <Image src={feat.imgPath} alt={'featured images'} width={200} height={200} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </motion.div>
  );
}

export default Features;

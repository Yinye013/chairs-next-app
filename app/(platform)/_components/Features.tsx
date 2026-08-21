'use client';

import React from 'react';
import { featuresArr } from '../../utils/featuresFiles';
import Image from 'next/image';
import FadeInSection from '../../components/FadeInSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

function Features() {
  return (
    <FadeInSection>
      <p className="subheading">As featured in</p>
      <h2 className="heading-secondary">Where Our Chairs Have Been</h2>
      <>
        <div className="w-full h-[200px] overflow-hidden flex justify-center items-center">
          <Swiper
            spaceBetween={10} // Space between slides
            // 200px-wide logos don't fit three-up on a phone; step the count
            // with the viewport so they never crowd or clip.
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            loop={true} // Enables infinite loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false, // Continue scrolling on user interaction
            }}
            speed={2000} // Scrolling speed (lower is faster)
            modules={[Autoplay]}
            className="flex justify-center items-center"
          >
            {featuresArr.map((feat) => (
              <SwiperSlide key={feat.id}>
                <div className="h-[200px] flex justify-center items-center">
                  <Image
                    src={feat.imgPath}
                    alt={'featured images'}
                    width={200}
                    height={200}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </FadeInSection>
  );
}

export default Features;

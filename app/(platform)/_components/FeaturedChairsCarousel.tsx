'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { urlFor } from '@/sanity/lib/image';
import type { Product } from '@/app/utils/types';

const FeaturedChairsCarousel = ({ featured }: { featured: Product[] }) => {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      speed={2000}
      modules={[Autoplay]}
      // The wrapper is full-bleed (-ml-[50vw] w-screen), so it escapes
      // .container's 3.2rem gutter. Pad the track by the same amount to line
      // the cards up with the heading above instead of running edge to edge.
      // Padding rather than margin: margin would narrow the track itself and
      // clip slides mid-transition.
      className="!px-[3.2rem]"
    >
      {featured.map((product) => (
        <SwiperSlide key={product.id}>
          <Link href="/bestsellers" className="block group">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={urlFor(product.imageRef).width(400).height(320).url()}
                alt={product.alt || product.title}
                width={400}
                height={320}
                className="w-full h-[24rem] object-cover transition-transform duration-500 group-hover:scale-110"
                {...(product.blurDataURL
                  ? {
                      placeholder: 'blur' as const,
                      blurDataURL: product.blurDataURL,
                    }
                  : {})}
              />
            </div>
            <div className="pt-[1.2rem] flex justify-between items-center">
              <h3 className="text-[1.8rem] font-semibold">{product.title}</h3>
              <span className="text-[1.6rem] font-bold text-green-700">
                &#8358;{product.price.toLocaleString()}
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedChairsCarousel;

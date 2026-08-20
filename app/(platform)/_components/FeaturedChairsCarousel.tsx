'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useIsMobile } from '@/app/hooks/useMediaQuery';
import { urlFor } from '@/sanity/lib/image';
import type { Product } from '@/app/utils/types';

const FeaturedChairsCarousel = ({ featured }: { featured: Product[] }) => {
  // Autoplay competes with touch-scrolling on phones, so let mobile users
  // drive the carousel themselves.
  const isMobile = useIsMobile();

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={24}
      slidesPerView={1.15}
      slidesOffsetBefore={32}
      slidesOffsetAfter={32}
      breakpoints={{
        640: { slidesPerView: 2.15 },
        1024: { slidesPerView: 3.15 },
        1440: { slidesPerView: 4.15 },
      }}
      navigation
      autoplay={isMobile ? false : { delay: 3500, disableOnInteraction: false }}
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

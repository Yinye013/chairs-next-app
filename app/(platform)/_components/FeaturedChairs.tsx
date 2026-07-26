'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { productsArr } from '@/app/utils/testFile';

const featured = productsArr.slice(0, 9);

const FeaturedChairs = () => {
  return (
    <div className="section-pad">
      <div className="container">
        <p className="subheading">the collection</p>
        <h2 className="heading-secondary">Featured Chairs</h2>
      </div>
      {/* Full-bleed: breaks out of the ancestor .container's max-width/padding to span the viewport */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
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
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {featured.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href="/bestsellers" className="block group">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={product.imgPath}
                    alt={product.title}
                    width={400}
                    height={320}
                    className="w-full h-[24rem] object-cover transition-transform duration-500 group-hover:scale-110"
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
      </div>
    </div>
  );
};

export default FeaturedChairs;

'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Quote, Star } from 'lucide-react';
import { testArr } from '@/app/utils/testFile';

const Testimonials = () => {
  return (
    <div className="section-pad">
      <div className="container">
        {/* Header: heading on the left, aggregate proof on the right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[2.4rem] mb-[5rem]">
          <div>
            <p className="subheading">testimonials</p>
            <h2 className="heading-secondary !mb-0 max-w-[20ch] !text-[2.4rem] sm:!text-[3rem]">
              Loved by people who sit for a living
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-[1.2rem]">
            <div className="flex -space-x-3">
              {testArr.slice(0, 4).map((t) => (
                <Image
                  key={t.clientName}
                  src={t.imgPath}
                  alt=""
                  width={44}
                  height={44}
                  className="w-[3.6rem] h-[3.6rem] sm:w-[4.4rem] sm:h-[4.4rem] rounded-full object-cover border-2 border-white"
                />
              ))}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    aria-hidden
                  />
                ))}
                <span className="text-[1.5rem] font-bold text-[#333] ml-2">
                  4.9
                </span>
              </div>
              <p className="text-[1.3rem] text-[#6b6b6b]">
                from 10,000+ verified buyers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed: breaks out of the ancestor .container's max-width/padding to span the viewport */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          speed={2000}
          modules={[Autoplay]}
          // !px matches .container's gutter — see the note in
          // FeaturedChairsCarousel.
          className="testimonial-swiper !pb-[1rem] !px-[3.2rem]"
        >
          {testArr.map((test) => (
            <SwiperSlide key={test.clientName} className="!h-auto">
              <figure className="group relative flex flex-col justify-between h-full bg-white border border-[#e8e8e8] rounded-2xl p-[2.2rem] sm:p-[3.2rem] transition-all duration-300 hover:border-[#15803d] hover:shadow-[0_12px_32px_-12px_rgba(21,128,61,0.25)]">
                <Quote
                  className="absolute top-[2.4rem] right-[2.4rem] w-8 h-8 text-[#15803d]/10 group-hover:text-[#15803d]/25 transition-colors"
                  aria-hidden
                />

                <div>
                  <div
                    className="flex items-center gap-1 mb-[1.6rem]"
                    role="img"
                    aria-label={`${test.rating} out of 5 stars`}
                  >
                    {Array.from({ length: test.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>

                  <blockquote className="text-[1.6rem] sm:text-[1.8rem] leading-[1.6] text-[#333] mb-[2.4rem]">
                    &ldquo;{test.testimonial}&rdquo;
                  </blockquote>
                </div>

                <figcaption>
                  <p className="text-[1.3rem] text-[#15803d] font-semibold mb-[1.6rem]">
                    Verified purchase &middot; {test.product}
                  </p>
                  <div className="flex items-center gap-[1.2rem] pt-[1.6rem] border-t border-[#eee] min-w-0">
                    <Image
                      src={test.imgPath}
                      alt=""
                      width={48}
                      height={48}
                      // Swiper transforms .swiper-wrapper, which defeats the
                      // browser's lazy-load visibility check and leaves these
                      // avatars permanently unloaded.
                      loading="eager"
                      className="w-[4rem] h-[4rem] sm:w-[4.8rem] sm:h-[4.8rem] shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[1.6rem] font-bold text-[#222] leading-tight">
                        {test.clientName}
                      </p>
                      <p className="text-[1.3rem] text-[#6b6b6b]">
                        {test.role} &middot; {test.location}
                      </p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;

"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { testArr } from "../testFile";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useMultipleAnimations from "../hooks/useMultipleAnimations";

const Testimonials = () => {
  let { ref, inView } = useInView();
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className="pt-[4.8rem] pb-[9.6rem]"
    >
      <div className="container">
        <p className="subheading">TESTIMONIALS</p>
        <h2 className="heading-secondary">What Clients Say</h2>

        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={true}
            pagination={{ clickable: true }}
          >
            {testArr.map((test) => (
              <SwiperSlide key={test.clientName}>
                <div className="gridding py-[6rem] px-[2rem] rounded-md">
                  <div
                    className="flex justify-center "
                    style={{ borderRadius: "100px" }}
                  >
                    <Image
                      src={test.imgPath}
                      alt="testimonial"
                      width={500}
                      height={300}
                      className="text-2xl rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-[2.3rem] text-white tracking-[1.8]">
                      {test.testimonial}
                      &mdash; {test.clientName}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;

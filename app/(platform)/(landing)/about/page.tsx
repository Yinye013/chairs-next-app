"use client";

import Lottie from "lottie-react";
import ChairAnimation from "@/animations/animation.json";
import StoryAnimation from "@/animations/story.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useMultipleAnimations from "@/app/hooks/useMultipleAnimations";

export default function AboutPage() {
  let { ref, inView } = useInView();
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);
  return (
    <motion.div ref={ref} animate={animation}>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2  ">
        <div className="left-text ">
          <h1 className="text-[3rem] text-[#555] font-bold tracking-wide">
            Our <span className="text-green-700">Mission</span>
          </h1>
          <p className="text-[1.6rem] tracking-wide mt-[3rem]">
            {" "}
            At TheChairShop, our mission is to craft timeless comfort and style
            through the artistry of seating. We are dedicated to providing our
            customers with meticulously designed and expertly crafted chairs
            that seamlessly blend aesthetics, functionality, and durability.
            Committed to quality craftsmanship, sustainable practices, and
            customer satisfaction, we strive to enhance the spaces where people
            gather, work, and relax. With a passion for innovation and a focus
            on customer-centric solutions, we aim to be the destination of
            choice for those seeking exceptional chairs that enrich both the
            form and function of their surroundings. Welcome to a world where
            seating becomes an expression of art and comfort at TheChairShop.
          </p>
        </div>
        <div>
          <Lottie animationData={ChairAnimation} width={20} />
        </div>
      </div>
      <div>
        <div className="text-center">
          <h1 className="text-[3rem] text-[#555] font-bold tracking-wide">
            Our <span className="text-green-700">Story</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <Lottie animationData={StoryAnimation} />
          </div>
          <div>
            <p className="text-[1.6rem] tracking-wide mt-[3rem] pb-[2rem] ">
              In a quaint town, a disparate group of artisans and craftsmen
              serendipitously discovered a shared love for the art of
              chair-making. Recognizing the potential in their combined skills,
              they forged a close-knit team. Fueled by a common passion, they
              embarked on a journey to create a haven for exceptional chairs.
              Through unwavering dedication and collaborative spirit, they
              turned their dream into reality, birthing a chair shop that
              harmonized craftsmanship, creativity, and community, echoing their
              shared commitment to quality and the joy of seating.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

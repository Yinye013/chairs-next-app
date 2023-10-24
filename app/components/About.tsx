"use client";
import { GiFizzingFlask } from "react-icons/gi";
import { GoSmiley } from "react-icons/go";
import { GiTechnoHeart } from "react-icons/gi";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useMultipleAnimations from "../hooks/useMultipleAnimations";

const About = () => {
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
        <p className="subheading">what sets our chairs apart</p>
        <h2 className="heading-secondary">What Makes Our Chairs Unique?</h2>
        <div className="grid grid-cols-3 gap-20">
          <div className="pt-4 pb-4">
            <GiFizzingFlask size="50px" color="#15803D" />
            <h3 className="heading-tertiary mt-5">Science Meets Design</h3>
            <p className="text-[1.5rem] font-[500] leading-[1.5] tracking-[2]">
              Revolutionary chairs unite science and design for style and
              comfort. With ergonomic shapes and unique materials, they elevate
              decor and enhance posture. Make a statement with these distinctive
              pieces in any room.
            </p>
          </div>
          <div className="pt-4 pb-4">
            <GoSmiley size="50px" color="#15803D" />
            <h3 className="heading-tertiary mt-5">Maximum Reliability</h3>
            <p className="text-[1.5rem] font-[500] leading-[1.5] tracking-[2]">
              Selecting the right chair for ultimate reliability is crucial. We
              offer chairs built to last, enhancing daily life with ergonomic
              features and advanced materials. Don't compromise on comfort – buy
              from us today.
            </p>
          </div>
          <div className="pt-4 pb-4">
            {" "}
            <GiTechnoHeart size="50px" color="#15803D" />
            <h3 className="heading-tertiary mt-5">Ethical & Long-Term</h3>
            <p className="text-[1.5rem] font-[500] leading-[1.5] tracking-[2]">
              Chairs, an everyday item, serve various purposes in our lives.
              Their diverse forms and materials require us to consider ethics
              and long-term consequences when buying.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;

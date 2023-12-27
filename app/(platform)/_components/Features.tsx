"use client";

import React from "react";
import { featuresArr } from "../../utils/featuresFiles";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useMultipleAnimations from "../../hooks/useMultipleAnimations";

function Features() {
  let { ref, inView } = useInView();
  const animation = useAnimation();
  useMultipleAnimations(inView, animation);

  return (
    <motion.div ref={ref} animate={animation} className="section-pad">
      <p className="subheading">As featured in</p>
      <h2 className="heading-secondary">Where Our Chairs Have Been</h2>
      <div className="grid gap-[3rem] items-center grid-cols-2 lg:grid-cols-5  ">
        {featuresArr.map((feat) => (
          <div key={feat.id}>
            <Image src={feat.imgPath} alt={"featured images"} width={200} height={200} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Features;

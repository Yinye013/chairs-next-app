"use client";
import { useEffect } from "react";
const useMultipleAnimations = (inView: boolean, animation: any) => {
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "easeInOut",
          duration: 1,
          delay: 0.25,
        },
      });
    }
    if (!inView) {
      animation.start({
        x: 25,
        opacity: 0,
      });
    }
  }, [inView, animation]);
};

export default useMultipleAnimations;

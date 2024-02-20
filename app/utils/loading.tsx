"use client";

import Lottie from "lottie-react";
import LoadingAnimation from "@/animations/loading.json";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center backdrop-blur-md">
      <Lottie animationData={LoadingAnimation} />
    </div>
  );
}

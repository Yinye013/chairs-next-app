"use client";

import React from "react";
import Lottie from "lottie-react";
import HelloAnimation from "@/animations/hello.json";
import Signup from "./_components/Signup";

export default function SignUpPage() {
  return (
    <main className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lottie">
          <Lottie animationData={HelloAnimation} />
        </div>

        <div className="pt-[7rem] mb-[10rem]">
          <Signup />
        </div>
      </div>
    </main>
  );
}

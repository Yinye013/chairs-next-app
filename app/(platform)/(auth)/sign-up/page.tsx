"use client";

import React from "react";
import Lottie from "lottie-react";
import HelloAnimation from "@/animations/hello.json";
import Logo from "../../_components/Logo";
import Signup from "./_components/Signup";

export default function SignUpPage() {
  return (
    <div className="h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className=" flex items-center">
          <Lottie animationData={HelloAnimation} />
        </div>
        <div className="p-5">
          <div className="pl-[9rem]">
            <Logo />
            <p className="mt-[2rem] text-[1.8rem] md:text-[1.4rem]">Sign into your account</p>
          </div>

          <div className="pt-[7rem] mb-[10rem]">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

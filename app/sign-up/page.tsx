"use client";

import React from "react";
import Lottie from "lottie-react";
import HelloAnimation from "@/animations/hello.json";
import Signup from "../ui/Signup";

function page() {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lottie">
            {" "}
            <Lottie animationData={HelloAnimation} />
          </div>
          <div className="pt-[7rem] mb-[10rem]">
            <Signup />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

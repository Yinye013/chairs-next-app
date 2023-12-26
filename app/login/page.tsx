"use client";
import React from "react";
import Lottie from "lottie-react";
import WaveAnimation from "@/animations/wave.json";
import Link from "next/link";
import Login from "../ui/Login";

export default function LoginPage() {
  return (
    <div className=" container">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {" "}
          <Lottie animationData={WaveAnimation} />
        </div>
        <div className="bg-[#fcfbf9] ">
          <div className=" pt-[7rem] mb-[10rem]">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

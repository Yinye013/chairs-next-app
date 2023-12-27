"use client";

import React from "react";
import About from "./(platform)/_components/About";
import Features from "./(platform)/_components/Features";
import Herosection from "./(platform)/_components/Herosection";
import Testimonials from "./(platform)/_components/Testimonials";

const page = () => {
  return (
    <>
      <Herosection />
      <About />
      <Testimonials />
      <Features />
    </>
  );
};

export default page;

import React from "react";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import About from "./components/About";
import Testimonials from "./components/Testimonials";

const page = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <About />
      <Testimonials />
    </>
  );
};

export default page;

import React from "react";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import About from "./components/About";

const page = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <About />
    </>
  );
};

export default page;

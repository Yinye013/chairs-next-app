"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Herosection from "./components/Herosection";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Features from "./components/Features";

const queryClient = new QueryClient();

const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Herosection />
      <About />
      <Testimonials />
      <Features />
    </QueryClientProvider>
  );
};

export default page;

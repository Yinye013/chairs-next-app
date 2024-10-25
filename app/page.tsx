"use client";

import React from "react";
import About from "./(platform)/_components/About";
import Features from "./(platform)/_components/Features";
import Herosection from "./(platform)/_components/Herosection";
import Testimonials from "./(platform)/_components/Testimonials";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "./hooks/useSession";

const page = () => {
  useSession();
  const queryClient = new QueryClient();
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

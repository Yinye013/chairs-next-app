'use client';
import React from 'react';
import About from './(platform)/_components/About';
import Features from './(platform)/_components/Features';
import Herosection from './(platform)/_components/Herosection';
import Testimonials from './(platform)/_components/Testimonials';
import CallToAction from './(platform)/_components/CallToAction';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Home = () => {
  // TODO: CHECK TO GET SESSION, WILL OUTSOURCE TO IT'S HOOK Later: JUST HERE FOR THE TIME BEING, PUT IN PROTECTED COMPONENTS/PAGES

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Herosection />
      <Features />
      <About />
      <Testimonials />
      <CallToAction />
    </QueryClientProvider>
  );
};

export default Home;

'use client';
import React, { useEffect } from 'react';
import About from './(platform)/_components/About';
import Features from './(platform)/_components/Features';
import Herosection from './(platform)/_components/Herosection';
import Testimonials from './(platform)/_components/Testimonials';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import supabase from './services/supabase';
import usePageLoading from './hooks/usePageLoading';
import Loading from './utils/loading';
// import { useSession } from "./hooks/useSession";

const page = () => {
  // TODO: CHECK TO GET SESSION, WILL OUTSOURCE TO IT'S HOOK Later: JUST HERE FOR THE TIME BEING, PUT IN PROTECTED COMPONENTS/PAGES
  const router = useRouter();
  const isLoading = usePageLoading();

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        router.push('/login');
      }
      console.log(session);
    };
    checkSession();
  }, [router]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Herosection />
      <Features />
      <About />
      <Testimonials />
    </QueryClientProvider>
  );
};

export default page;

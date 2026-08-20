'use client';

import Footer from './(platform)/_components/Footer';
import Navbar from './(platform)/_components/Navbar';
import RouteLoadingBar from './components/RouteLoadingBar';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';

type ClientLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function ClientLayout({ children }: ClientLayoutProps) {
  // Memoize QueryClient to prevent recreation on every render: learnt this from the React Query documentation
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
    [],
  );

  const pathname = usePathname();
  const noNavbarFooterRoutes = ['/login', '/sign-up'];
  const showNavbarFooter = !noNavbarFooterRoutes.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        {/* Isolated behind Suspense: it reads searchParams, which would
            otherwise opt every page out of static prerendering. */}
        <Suspense fallback={null}>
          <RouteLoadingBar />
        </Suspense>
        <div className="relative">
          {showNavbarFooter && <Navbar />}
          {/* Navbar is fixed, so reserve its height in the flow */}
          {showNavbarFooter && <div className="h-[9.6rem]" aria-hidden />}
          <main className="container min-h-screen">{children}</main>
          {showNavbarFooter && <Footer />}
        </div>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}

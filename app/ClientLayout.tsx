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
  // `trailingSlash: true` in next.config.js means usePathname() returns
  // '/login/', not '/login' — a plain includes() against the bare paths never
  // matched, so the navbar rendered on the auth pages it was meant to hide on.
  const noNavbarFooterRoutes = ['/login', '/sign-up'];
  const normalisedPath = pathname.replace(/\/+$/, '') || '/';
  const showNavbarFooter = !noNavbarFooterRoutes.includes(normalisedPath);

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
          {/* min-h-screen keeps the footer down the page on short routes. The
              auth pages have no navbar or footer and centre themselves, so
              forcing a full viewport there only adds dead space. */}
          <main
            className={`container ${showNavbarFooter ? 'min-h-screen' : ''}`}
          >
            {children}
          </main>
          {showNavbarFooter && <Footer />}
        </div>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}

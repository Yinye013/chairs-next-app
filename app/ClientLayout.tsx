'use client';

import Footer from './(platform)/_components/Footer';
import Navbar from './(platform)/_components/Navbar';
import LoadingBar from './components/LoadingBar';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import useRouteLoading from './hooks/useRouteLoading';

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
  const isRouteLoading = useRouteLoading();

  console.log(
    'ClientLayout: isRouteLoading =',
    isRouteLoading,
    'pathname =',
    pathname,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <LoadingBar isLoading={isRouteLoading} />
        <div className="relative">
          {showNavbarFooter && <Navbar />}
          <main className="container min-h-screen">{children}</main>
          {showNavbarFooter && <Footer />}
        </div>
      </>
    </QueryClientProvider>
  );
}

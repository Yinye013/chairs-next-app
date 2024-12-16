'use client';
import Footer from './(platform)/_components/Footer';
import Navbar from './(platform)/_components/Navbar';
import Loading from './utils/loading';
import { Suspense } from 'react';
import './globals.css';
import { usePathname } from 'next/navigation';
import type { Metadata } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePageLoading from './hooks/usePageLoading';

const metadata: Metadata = {
  title: 'Chairs App',
  description: 'Get Your High Quality Chairs for Affordable Prices!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // refactoring the login and signup pages
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const noNavbarFooterRoutes = ['/login', '/sign-up'];
  const showNavbarFooter = !noNavbarFooterRoutes.includes(pathname);
  const isLoading = usePageLoading();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          <div className="relative">
            {isLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-white">
                {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
                <Loading />
              </div>
            )}

            {showNavbarFooter && <Navbar />}
            <main className={isLoading ? 'hidden' : 'container min-h-screen'}>
              {children}
            </main>
            {showNavbarFooter && <Footer />}
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}

'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// QUERYCLIENTPROVIDER AND TOAST CONTAINERS ARE USED IN LAYOUTS, NOT HOMEPAGE
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from '../utils/loading';
import { Suspense } from 'react';
import ClientToastContainer from '../components/ClientToastContainer';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ClientToastContainer />
      </QueryClientProvider>
    </Suspense>
  );
}

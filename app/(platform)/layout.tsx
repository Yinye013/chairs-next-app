import Loading from '../utils/loading';
import { Suspense } from 'react';
import ClientToastContainer from '../components/ClientToastContainer';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
      <ClientToastContainer />
    </Suspense>
  );
}

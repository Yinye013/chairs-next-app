'use client';

import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = dynamic(
  () =>
    import('react-toastify').then((mod) => ({ default: mod.ToastContainer })),
  {
    ssr: false,
  },
);

export default function ClientToastContainer() {
  return <ToastContainer />;
}

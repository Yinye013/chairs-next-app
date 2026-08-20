import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import { satoshi } from './fonts/satoshi';

export const metadata: Metadata = {
  title: 'Chairs App',
  description: 'Get Your High Quality Chairs for Affordable Prices!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

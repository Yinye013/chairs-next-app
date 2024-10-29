"use client";
import Footer from "./(platform)/_components/Footer";
import Navbar from "./(platform)/_components/Navbar";
import Loading from "./utils/loading";
import { Suspense } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const metadata: Metadata = {
  title: "Chairs App",
  description: "Get Your High Quality Chairs for Affordable Prices!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // refactoring the login and signup pages
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const noNavbarFooterRoutes = ["/login", "/sign-up"];
  const showNavbarFooter = !noNavbarFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          {showNavbarFooter && <Navbar />}
          <Suspense fallback={<Loading />}>
            <main className="container">{children}</main>
          </Suspense>

          {showNavbarFooter && <Footer />}
        </body>
      </QueryClientProvider>
    </html>
  );
}

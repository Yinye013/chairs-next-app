"use client";

// QUERYCLIENTPROVIDER AND TOAST CONTAINERS ARE USED IN LAYOUTS, NOT HOMEPAGE
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "../utils/loading";
import { Suspense } from "react";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Suspense>
  );
}

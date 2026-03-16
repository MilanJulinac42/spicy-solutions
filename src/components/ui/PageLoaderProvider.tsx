"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PageLoader } from "./PageLoader";

export function PageLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isInitialLoad = useRef(true);
  const prevPathname = useRef(pathname);

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      isInitialLoad.current = false;
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Route change loader (shorter)
  useEffect(() => {
    if (isInitialLoad.current) return;
    if (pathname === prevPathname.current) return;

    prevPathname.current = pathname;
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <PageLoader />}</AnimatePresence>
      {children}
    </>
  );
}

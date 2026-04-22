"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageview } from "@/lib/analytics";

/**
 * Re-fires GA4 page_view on every client-side route change.
 * The initial pageview is already sent by `gtag('config', ...)` in layout.
 * This catches every subsequent SPA navigation.
 */
export function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
}

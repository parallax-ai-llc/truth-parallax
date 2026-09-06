"use client";

import { useReportWebVitals } from "next/web-vitals";

// Reports Core Web Vitals (LCP, CLS, INP, FCP, TTFB) as Google Analytics
// events so they show up as real-user (field) data alongside the gtag
// config in app/layout.tsx. View them in GA4 under
// Reports → Engagement → Events (event name "web_vitals").
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "web_vitals", {
      event_category: "Web Vitals",
      event_label: metric.id, // unique id per page load, lets GA dedupe
      metric_name: metric.name, // LCP | CLS | INP | FCP | TTFB
      metric_rating: metric.rating, // good | needs-improvement | poor
      // CLS is unitless, others are ms. Round to whole numbers for GA.
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  });

  return null;
}

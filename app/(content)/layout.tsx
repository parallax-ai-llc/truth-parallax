import { SiteLayoutClient } from "@/components/site-layout-client";

// The search index (~38k entries) is fetched from /api/search when the dialog opens.
// Embedding it here put it in every page's HTML and RSC payload, which multiplied
// ISR write units, origin transfer and render CPU on every page.
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayoutClient>{children}</SiteLayoutClient>;
}

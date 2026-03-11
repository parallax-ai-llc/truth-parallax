import { getScriptureSearchIndex } from "@/lib/scriptures";
import { SiteLayoutClient } from "@/components/site-layout-client";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = getScriptureSearchIndex();

  return <SiteLayoutClient searchIndex={searchIndex}>{children}</SiteLayoutClient>;
}

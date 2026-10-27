"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { Footer } from "@/components/footer";
import { useMounted } from "@/lib/use-mounted";

interface SiteLayoutClientProps {
  children: React.ReactNode;
}

export function SiteLayoutClient({ children }: SiteLayoutClientProps) {
  const mounted = useMounted();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchIndex, setSearchIndex] = React.useState<SearchItem[]>([]);
  const indexRequested = React.useRef(false);

  // Load the index once, the first time search opens (static file served from the CDN).
  React.useEffect(() => {
    if (!searchOpen || indexRequested.current) return;
    indexRequested.current = true;
    fetch("/api/search")
      .then((res) => (res.ok ? res.json() : []))
      .then((items: SearchItem[]) => setSearchIndex(items))
      .catch(() => {
        indexRequested.current = false;
      });
  }, [searchOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onSearchClick={() => setSearchOpen(true)} />

      <main className="flex-1">{children}</main>

      <div className="relative z-10 bg-background">
        <Footer />
      </div>

      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={searchIndex} />
        </div>
      )}
    </div>
  );
}

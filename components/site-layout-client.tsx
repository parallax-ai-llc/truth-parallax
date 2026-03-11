"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { Footer } from "@/components/footer";

interface SiteLayoutClientProps {
  searchIndex: SearchItem[];
  children: React.ReactNode;
}

export function SiteLayoutClient({ searchIndex, children }: SiteLayoutClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

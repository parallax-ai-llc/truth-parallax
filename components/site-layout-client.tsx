"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { Footer } from "@/components/footer";
import { useMounted } from "@/lib/use-mounted";

interface SiteLayoutClientProps {
  searchIndex: SearchItem[];
  children: React.ReactNode;
}

export function SiteLayoutClient({ searchIndex, children }: SiteLayoutClientProps) {
  const mounted = useMounted();
  const [searchOpen, setSearchOpen] = React.useState(false);

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

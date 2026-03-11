"use client";

import * as React from "react";
import { Search, GitPullRequest, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import type { ScriptureMeta } from "@/lib/scripture-types";
import { RELIGION_GROUPS } from "@/lib/scripture-constants";
import Link from "next/link";

interface HomeClientProps {
  scriptures: ScriptureMeta[];
}

export function HomeClient({ scriptures }: HomeClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const totalDocs = scriptures.length;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Group scriptures by religion for display
  const grouped = scriptures.reduce<Record<string, ScriptureMeta[]>>((acc, s) => {
    const key = s.religion;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
    const orderA = RELIGION_GROUPS[a]?.order ?? 99;
    const orderB = RELIGION_GROUPS[b]?.order ?? 99;
    return orderA - orderB;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute right-4 top-4 z-50 flex items-center gap-2">
        <Link
          href="/contribute"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <GitPullRequest className="h-4 w-4" />
          Contribute
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl leading-[1.2] min-h-[1.2em] text-primary">
              Truth Parallax
            </h1>
            <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
              &ldquo;One scripture, many parallax&rdquo;
            </p>
            {totalDocs > 0 && (
              <p className="mt-2 text-xs text-muted-foreground/60">
                {totalDocs.toLocaleString()} scripture{totalDocs !== 1 ? "s" : ""} archived
              </p>
            )}
          </div>

          <Button
            variant="outline"
            className="h-12 w-full justify-start px-4 text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-3 h-5 w-5" />
            <span>Search scriptures and interpretations...</span>
            <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium sm:flex">
              <span>Ctrl</span>K
            </kbd>
          </Button>

          {/* Browse Scriptures Link */}
          <div className="flex justify-center">
            <Link
              href="/s"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Browse all scriptures
            </Link>
          </div>

          {/* Quick links by religion */}
          {sortedGroups.length > 0 && (
            <div className="space-y-3 text-left">
              {sortedGroups.map(([religion, items]) => (
                <div key={religion}>
                  <h3 className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-2">
                    {RELIGION_GROUPS[religion]?.label || religion}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/s/${s.slug}`}
                        className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={[]} />
        </div>
      )}
    </div>
  );
}

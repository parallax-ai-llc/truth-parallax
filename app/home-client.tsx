"use client";

import * as React from "react";
import { Search, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Footer } from "@/components/footer";
import { useLocale } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import type { ScriptureMeta } from "@/lib/scripture-types";
import { RELIGION_GROUPS } from "@/lib/scripture-constants";
import Link from "next/link";

interface HomeClientProps {
  scriptures: ScriptureMeta[];
  totalFiles: number;
}

export function HomeClient({ scriptures, totalFiles }: HomeClientProps) {
  const { t } = useLocale();
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const totalDocs = scriptures.length;

  const filtered = React.useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return scriptures.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.aliases?.some((a) => a.toLowerCase().includes(q)) ||
        s.tags?.some((t) => t.toLowerCase().includes(q)) ||
        s.religion.toLowerCase().includes(q)
    );
  }, [scriptures, search]);

  const groupedResults = React.useMemo(() => {
    const grouped = filtered.reduce<Record<string, ScriptureMeta[]>>((acc, s) => {
      const key = s.religion;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    }, {});
    return Object.entries(grouped).sort(([a], [b]) => {
      const orderA = RELIGION_GROUPS[a]?.order ?? 99;
      const orderB = RELIGION_GROUPS[b]?.order ?? 99;
      return orderA - orderB;
    });
  }, [filtered]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const showResults = focused && search.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute right-4 top-4 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-6 text-center">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl leading-[1.2] min-h-[1.2em] text-primary">
              Truth Parallax
            </h1>
            <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
              &ldquo;{t("tagline")}&rdquo;
            </p>
            {totalDocs > 0 && (
              <p className="mt-2 text-xs text-muted-foreground/60">
                {t("scripturesCount", { count: totalDocs.toLocaleString() })} &middot; {t("docsCount", { files: totalFiles.toLocaleString() })}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                className="h-12 w-full rounded-lg border border-input bg-background pl-12 pr-16 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground sm:inline-flex">
                <span>Ctrl</span>K
              </kbd>
            </div>

            {showResults && (
              <div className="absolute z-50 mt-2 w-full rounded-lg border bg-popover shadow-lg max-h-96 overflow-y-auto text-left">
                {filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {t("noResults", { query: search })}
                  </p>
                ) : (
                  <div className="py-2">
                    {groupedResults.map(([religion, items]) => (
                      <div key={religion}>
                        <p className="px-4 py-1.5 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                          {RELIGION_GROUPS[religion]?.label || religion}
                        </p>
                        {items.map((s) => (
                          <button
                            key={s.slug}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              router.push(`/s/${s.slug}`);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                          >
                            <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="font-medium">{s.title}</span>
                            {s.aliases?.[0] && (
                              <span className="text-xs text-muted-foreground">{s.aliases[0]}</span>
                            )}
                            <span className="ml-auto text-xs text-muted-foreground/50">
                              {s.totalChapters} ch
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                    <p className="px-4 py-2 text-xs text-muted-foreground/50 text-center border-t">
                      {t("results", { count: filtered.length })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Link
              href="/s"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              {t("browseAll")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface TraditionTabsProps {
  scriptureSlug: string;
  traditions: { slug: string; displayName: string }[];
  currentTradition: string;
  chapterNum?: number;
}

export function TraditionTabs({
  scriptureSlug,
  traditions,
  currentTradition,
  chapterNum,
}: TraditionTabsProps) {

  return (
    <div className="mb-8 border-b border-border">
      <nav aria-label="Tradition interpretations" className="-mb-px flex gap-0 overflow-x-auto">
        {traditions.map((t) => {
          const href = chapterNum
            ? `/s/${scriptureSlug}/${t.slug}/${chapterNum}`
            : `/s/${scriptureSlug}/${t.slug}`;
          const isActive = t.slug === currentTradition;

          return (
            <Link
              key={t.slug}
              href={href}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {t.displayName}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

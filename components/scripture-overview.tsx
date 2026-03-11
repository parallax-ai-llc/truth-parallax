import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { ScriptureMeta, TraditionMeta } from "@/lib/scriptures";
import { RELIGION_GROUPS } from "@/lib/scriptures";

interface ScriptureOverviewProps {
  meta: ScriptureMeta;
  content: string;
  traditions: TraditionMeta[];
}

export function ScriptureOverview({ meta, content, traditions }: ScriptureOverviewProps) {
  return (
    <article className="flex-1 min-w-0">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-3">
          Last updated: {meta.lastUpdated || "Unknown"}
        </p>

        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {meta.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="px-2 py-0.5 bg-secondary rounded">
            {RELIGION_GROUPS[meta.religion]?.label || meta.religion}
          </span>
          {meta.totalChapters > 0 && (
            <span>{meta.totalChapters} chapters</span>
          )}
          {meta.aliases.length > 0 && (
            <span className="italic">
              Also: {meta.aliases.join(", ")}
            </span>
          )}
        </div>

        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="article-content mb-12" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Available Traditions */}
      {traditions.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight mb-6">
            Interpretive Traditions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {traditions.map((t) => (
              <Link
                key={t.tradition}
                href={`/s/${meta.slug}/${t.tradition}`}
                className="group rounded-lg border border-border p-5 transition-colors hover:bg-accent hover:border-border/80"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-foreground">
                      {t.traditionDisplayName}
                    </h3>
                    {t.keyThemes.length > 0 && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {t.keyThemes.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

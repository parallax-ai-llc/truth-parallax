import Link from "next/link";
import { FileText } from "lucide-react";
import type { TraditionMeta, ChapterMeta, ScriptureMeta } from "@/lib/scriptures";

interface TraditionOverviewProps {
  meta: TraditionMeta;
  content: string;
  chapters: ChapterMeta[];
  scriptureMeta: ScriptureMeta;
}

export function TraditionOverview({ meta, content, chapters, scriptureMeta }: TraditionOverviewProps) {
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
          <Link
            href={`/s/${meta.scripture}`}
            className="px-2 py-0.5 bg-secondary rounded hover:bg-secondary/80 transition-colors"
          >
            {scriptureMeta.title}
          </Link>
          <span className="px-2 py-0.5 bg-primary/10 rounded text-primary">
            {meta.traditionDisplayName}
          </span>
        </div>

        {meta.keyThemes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.keyThemes.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="article-content mb-12" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Chapter List */}
      {chapters.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight mb-6">
            Chapters
          </h2>
          <div className="grid gap-3">
            {chapters.map((ch) => (
              <Link
                key={ch.chapter}
                href={`/s/${meta.scripture}/${meta.tradition}/${ch.chapter}`}
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent hover:border-border/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                  {ch.chapter}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground truncate">
                    {ch.chapterLabel}
                  </h3>
                  {ch.tags.length > 0 && (
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      {ch.tags.join(" · ")}
                    </p>
                  )}
                </div>
                <FileText className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

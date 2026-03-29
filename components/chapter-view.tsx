import Link from "next/link";
import type { ChapterMeta, ScriptureMeta, TraditionMeta } from "@/lib/scriptures";
import { ChapterNav } from "./chapter-nav";

interface ChapterViewProps {
  meta: ChapterMeta;
  content: string;
  scriptureMeta: ScriptureMeta;
  traditionMeta: TraditionMeta;
  prevChapter: number | null;
  nextChapter: number | null;
  sourceText?: string | null;
}

export function ChapterView({
  meta,
  content,
  scriptureMeta,
  traditionMeta,
  prevChapter,
  nextChapter,
  sourceText,
}: ChapterViewProps) {
  return (
    <article className="flex-1 min-w-0">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-3">
          Last updated: {meta.lastUpdated || "Unknown"}
        </p>

        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {meta.chapterLabel}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Link
            href={`/s/${meta.scripture}`}
            className="px-2 py-0.5 bg-secondary rounded hover:bg-secondary/80 transition-colors"
          >
            {scriptureMeta.title}
          </Link>
          <Link
            href={`/s/${meta.scripture}/${meta.tradition}`}
            className="px-2 py-0.5 bg-primary/10 rounded text-primary hover:bg-primary/20 transition-colors"
          >
            {traditionMeta.traditionDisplayName}
          </Link>
          {meta.verseCount && (
            <span>{meta.verseCount} verses</span>
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

      {/* Source text */}
      {sourceText && (
        <details className="mb-8 rounded-lg border border-border">
          <summary className="cursor-pointer px-5 py-4 text-sm font-medium hover:bg-accent transition-colors select-none">
            원문 보기 (View Original Text)
          </summary>
          <div className="px-5 pb-5 pt-2 border-t border-border">
            <div className="article-content prose-sm" dangerouslySetInnerHTML={{ __html: sourceText }} />
          </div>
        </details>
      )}

      {/* Main content */}
      <div className="article-content" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Chapter navigation */}
      <ChapterNav
        scriptureSlug={meta.scripture}
        traditionSlug={meta.tradition}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />
    </article>
  );
}

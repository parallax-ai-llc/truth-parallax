import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChapterNavProps {
  scriptureSlug: string;
  traditionSlug: string;
  prevChapter: number | null;
  nextChapter: number | null;
}

export function ChapterNav({
  scriptureSlug,
  traditionSlug,
  prevChapter,
  nextChapter,
}: ChapterNavProps) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-12 flex items-center justify-between border-t border-border pt-6"
    >
      {prevChapter !== null ? (
        <Link
          href={`/s/${scriptureSlug}/${traditionSlug}/${prevChapter}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Chapter {prevChapter}
        </Link>
      ) : (
        <div />
      )}

      {nextChapter !== null ? (
        <Link
          href={`/s/${scriptureSlug}/${traditionSlug}/${nextChapter}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Chapter {nextChapter}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}

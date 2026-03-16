import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getAllScriptures, RELIGION_GROUPS } from "@/lib/scriptures";
import type { ScriptureMeta } from "@/lib/scriptures";

export const revalidate = 3600;

export const metadata = {
  title: "Scriptures",
  description: "Browse sacred texts across world religions and explore how different traditions interpret the same scriptures.",
};

export default function ScripturesPage() {
  const scriptures = getAllScriptures();

  // Group by religion
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
    <div className="container max-w-4xl py-12 px-4">
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Scriptures
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore how different religious traditions interpret the same sacred texts.
        </p>
        {scriptures.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground/60">
            {scriptures.length} scripture{scriptures.length !== 1 ? "s" : ""} across{" "}
            {sortedGroups.length} tradition{sortedGroups.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {sortedGroups.map(([religion, items]) => (
        <section key={religion} className="mb-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight mb-5 flex items-center gap-2">
            {RELIGION_GROUPS[religion]?.label || religion}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((s) => (
              <Link
                key={s.slug}
                href={`/s/${s.slug}`}
                className="group rounded-lg border border-border p-5 transition-colors hover:bg-accent hover:border-border/80"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {s.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {s.totalChapters > 0 && (
                        <span>{s.totalChapters} chapters</span>
                      )}
                      {s.traditions.length > 0 && (
                        <span>{s.traditions.length} traditions</span>
                      )}
                    </div>
                    {s.aliases.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground/70 italic truncate">
                        {s.aliases.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {scriptures.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No scriptures available yet.</p>
          <p className="mt-2 text-sm">
            <Link href="/contribute" className="text-primary hover:underline">
              Contribute
            </Link>{" "}
            to add scripture interpretations.
          </p>
        </div>
      )}
    </div>
  );
}

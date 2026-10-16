import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  RELIGION_GROUPS,
  getAllScriptures,
  getScriptureMeta,
  getTotalContentFiles,
  getTraditionMeta,
} from "@/lib/scriptures";

// Read-only JSON for the Parallax iOS app (/api/app/*).
// The app renders Markdown natively, so these endpoints return raw Markdown
// instead of the HTML the web pages use. Nothing here changes web behavior.

const scripturesDirectory = path.join(process.cwd(), "content/scriptures");

const SLUG = /^[a-z0-9][a-z0-9-]*$/i;

export const APP_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
};

/** Family of a religion, from the order buckets in lib/scripture-constants.ts. */
function familyOf(religion: string): string {
  const order = RELIGION_GROUPS[religion]?.order ?? 99;
  if (order < 20) return "abrahamic";
  if (order < 30) return "dharmic";
  if (order < 40) return "east-asian";
  if (order < 45) return "iranian";
  if (order < 50) return "tibetan";
  if (order < 55) return "new-religions";
  if (order < 60) return "esoteric";
  if (order < 70) return "ancient-near-east";
  if (order < 75) return "classical";
  if (order < 80) return "european";
  if (order < 85) return "americas";
  if (order < 90) return "oceania-africa";
  return "other";
}

function readBody(file: string): string | null {
  try {
    return matter(fs.readFileSync(file, "utf8")).content.trim();
  } catch {
    return null;
  }
}

function listDirs(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "source")
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

function chapterNumbers(dir: string): number[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") && f !== "overview.md")
      .map((f) => parseInt(f.replace(".md", ""), 10))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

function firstParagraph(markdown: string): string {
  return (
    markdown
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p.length > 0 && !p.startsWith("#") && !p.startsWith("|")) ?? ""
  );
}

function dayNumber(): number {
  return Math.floor(Date.now() / 86_400_000);
}

/** One chapter read by every tradition that has it, rotating daily. */
function buildFeatured(scriptures: ReturnType<typeof getAllScriptures>) {
  const candidates = scriptures.filter((s) => s.traditions.length >= 2 && s.totalChapters > 0);
  if (candidates.length === 0) return null;
  const day = dayNumber();
  const scripture = candidates[day % candidates.length];
  const traditions = listDirs(path.join(scripturesDirectory, scripture.slug));
  const shared = traditions.length > 0 ? chapterNumbers(path.join(scripturesDirectory, scripture.slug, traditions[0])) : [];
  if (shared.length === 0) return null;
  const chapter = shared[day % shared.length];

  const readings = traditions
    .map((tradition) => {
      const file = path.join(scripturesDirectory, scripture.slug, tradition, `${chapter}.md`);
      const body = readBody(file);
      if (body === null) return null;
      const meta = getTraditionMeta(scripture.slug, tradition);
      return {
        tradition,
        displayName: meta?.traditionDisplayName ?? tradition,
        excerpt: firstParagraph(body),
      };
    })
    .filter((r): r is { tradition: string; displayName: string; excerpt: string } => r !== null);
  if (readings.length < 2) return null;

  let chapterLabel = `Chapter ${chapter}`;
  try {
    const { data } = matter(
      fs.readFileSync(path.join(scripturesDirectory, scripture.slug, readings[0].tradition, `${chapter}.md`), "utf8")
    );
    chapterLabel = (data.chapterLabel as string) || (data.title as string) || chapterLabel;
  } catch {
    // keep the default label
  }

  const source = readBody(path.join(scripturesDirectory, scripture.slug, "source", `${chapter}.md`));

  return {
    scripture: scripture.slug,
    title: scripture.title,
    religion: scripture.religion,
    totalChapters: scripture.totalChapters,
    chapter,
    chapterLabel,
    sourceExcerpt: source ? firstParagraph(source) : null,
    readings,
  };
}

export function buildOverview() {
  const scriptures = getAllScriptures();
  const religions = new Map<string, { id: string; label: string; family: string; order: number; count: number }>();
  for (const s of scriptures) {
    const entry = religions.get(s.religion) ?? {
      id: s.religion,
      label: RELIGION_GROUPS[s.religion]?.label ?? s.religion,
      family: familyOf(s.religion),
      order: RELIGION_GROUPS[s.religion]?.order ?? 99,
      count: 0,
    };
    entry.count += 1;
    religions.set(s.religion, entry);
  }

  return {
    scriptureCount: scriptures.length,
    documentCount: getTotalContentFiles(),
    religions: [...religions.values()].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label)),
    scriptures: scriptures.map((s) => ({
      slug: s.slug,
      title: s.title,
      religion: s.religion,
      family: familyOf(s.religion),
      aliases: s.aliases,
      totalChapters: s.totalChapters,
      traditions: s.traditions,
      tags: s.tags,
    })),
    featured: buildFeatured(scriptures),
  };
}

/** /api/app/s/<scripture>[/<tradition>[/<chapter>]] */
export function buildEntry(slug: string[]) {
  if (slug.length < 1 || slug.length > 3) return null;
  const [scriptureSlug, traditionSlug, chapterPart] = slug;
  if (!SLUG.test(scriptureSlug) || (traditionSlug !== undefined && !SLUG.test(traditionSlug))) return null;

  const scripture = getScriptureMeta(scriptureSlug);
  if (!scripture) return null;
  const scriptureDir = path.join(scripturesDirectory, scriptureSlug);

  if (slug.length === 1) {
    const markdown = readBody(path.join(scriptureDir, "overview.md")) ?? "";
    const traditions = listDirs(scriptureDir)
      .map((t) => {
        const meta = getTraditionMeta(scriptureSlug, t);
        if (!meta) return null;
        return {
          tradition: t,
          displayName: meta.traditionDisplayName,
          title: meta.title,
          keyThemes: meta.keyThemes,
          chapterCount: chapterNumbers(path.join(scriptureDir, t)).length,
        };
      })
      .filter((t) => t !== null);
    return { kind: "scripture", scripture, markdown, traditions };
  }

  const tradition = getTraditionMeta(scriptureSlug, traditionSlug!);
  if (!tradition) return null;
  const traditionDir = path.join(scriptureDir, traditionSlug!);

  if (slug.length === 2) {
    const markdown = readBody(path.join(traditionDir, "overview.md")) ?? "";
    const chapters = chapterNumbers(traditionDir).map((n) => {
      try {
        const { data } = matter(fs.readFileSync(path.join(traditionDir, `${n}.md`), "utf8"));
        return {
          chapter: n,
          title: (data.title as string) || `Chapter ${n}`,
          chapterLabel: (data.chapterLabel as string) || `Chapter ${n}`,
        };
      } catch {
        return { chapter: n, title: `Chapter ${n}`, chapterLabel: `Chapter ${n}` };
      }
    });
    return { kind: "tradition", scripture, tradition, markdown, chapters };
  }

  if (!/^\d{1,4}$/.test(chapterPart!)) return null;
  const chapter = parseInt(chapterPart!, 10);
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(fs.readFileSync(path.join(traditionDir, `${chapter}.md`), "utf8"));
  } catch {
    return null;
  }
  const numbers = chapterNumbers(traditionDir);
  const index = numbers.indexOf(chapter);
  const siblings = listDirs(scriptureDir)
    .filter((t) => t !== traditionSlug && fs.existsSync(path.join(scriptureDir, t, `${chapter}.md`)))
    .map((t) => ({ tradition: t, displayName: getTraditionMeta(scriptureSlug, t)?.traditionDisplayName ?? t }));

  return {
    kind: "chapter",
    scripture,
    tradition,
    chapter,
    title: (parsed.data.title as string) || `Chapter ${chapter}`,
    chapterLabel: (parsed.data.chapterLabel as string) || `Chapter ${chapter}`,
    markdown: parsed.content.trim(),
    source: readBody(path.join(scriptureDir, "source", `${chapter}.md`)),
    siblings,
    prevChapter: index > 0 ? numbers[index - 1] : null,
    nextChapter: index >= 0 && index < numbers.length - 1 ? numbers[index + 1] : null,
  };
}

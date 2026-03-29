import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// ── Types (re-exported from shared module for client compat) ──

export type {
  ScriptureMeta,
  TraditionMeta,
  ChapterMeta,
  TocItem,
  SearchIndexItem,
} from "./scripture-types";

import type {
  ScriptureMeta,
  TraditionMeta,
  ChapterMeta,
  TocItem,
  SearchIndexItem,
} from "./scripture-types";

export interface ScriptureOverview {
  meta: ScriptureMeta;
  content: string;
  toc: TocItem[];
  traditions: TraditionMeta[];
}

export interface TraditionOverview {
  meta: TraditionMeta;
  content: string;
  toc: TocItem[];
  chapters: ChapterMeta[];
  scriptureMeta: ScriptureMeta;
}

export interface ChapterDetail {
  meta: ChapterMeta;
  content: string;
  toc: TocItem[];
  scriptureMeta: ScriptureMeta;
  traditionMeta: TraditionMeta;
  siblingTraditions: string[];
  prevChapter: number | null;
  nextChapter: number | null;
}

// ── Constants ───────────────────────────────────────────────

import { RELIGION_GROUPS } from "./scripture-constants";
export { RELIGION_GROUPS };

const scripturesDirectory = path.join(process.cwd(), "content/scriptures");

// ── Helpers ─────────────────────────────────────────────────

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(scripturesDirectory)) {
      fs.mkdirSync(scripturesDirectory, { recursive: true });
    }
  } catch {
    // Read-only filesystem (e.g. Vercel)
  }
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\[.*?\]\(.*?\)/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}

async function processMarkdown(rawContent: string): Promise<{ html: string; toc: TocItem[] }> {
  const toc = extractToc(rawContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(rawContent);

  let htmlContent = processedContent.toString();

  // Add IDs to headings for TOC navigation
  toc.forEach((item) => {
    const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `<h${item.level}>([^<]*${escapedText}[^<]*)</h${item.level}>`,
      "i"
    );
    htmlContent = htmlContent.replace(
      regex,
      `<h${item.level} id="${item.id}">$1</h${item.level}>`
    );
  });

  return { html: htmlContent, toc };
}

function readFrontmatter(filePath: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return matter(fileContents);
  } catch {
    return null;
  }
}

const RESERVED_DIRS = new Set(["source"]);

function listDirectories(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !RESERVED_DIRS.has(d.name))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

function listMdFiles(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath)
      .filter((f) => f.endsWith(".md") && f !== "overview.md")
      .sort((a, b) => {
        const numA = parseInt(a.replace(".md", ""), 10);
        const numB = parseInt(b.replace(".md", ""), 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });
  } catch {
    return [];
  }
}

// ── Scripture Level ─────────────────────────────────────────

export function getAllScriptureSlugs(): string[] {
  ensureDirectoryExists();
  return listDirectories(scripturesDirectory);
}

export function getTotalContentFiles(): number {
  function countMd(dir: string): number {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        count += countMd(path.join(dir, entry.name));
      } else if (entry.name.endsWith(".md")) {
        count++;
      }
    }
    return count;
  }
  return countMd(scripturesDirectory);
}

export function getAllScriptures(): ScriptureMeta[] {
  const slugs = getAllScriptureSlugs();

  return slugs
    .map((slug) => {
      const overviewPath = path.join(scripturesDirectory, slug, "overview.md");
      const parsed = readFrontmatter(overviewPath);
      if (!parsed) return null;

      const { data } = parsed;
      return {
        slug,
        title: (data.title as string) || slug,
        religion: (data.religion as string) || "unknown",
        aliases: (data.aliases as string[]) || [],
        totalChapters: (data.totalChapters as number) || 0,
        traditions: (data.traditions as string[]) || [],
        tags: (data.tags as string[]) || [],
        lastUpdated: (data.lastUpdated as string) || "",
      } as ScriptureMeta;
    })
    .filter((s): s is ScriptureMeta => s !== null)
    .sort((a, b) => {
      const orderA = RELIGION_GROUPS[a.religion]?.order ?? 99;
      const orderB = RELIGION_GROUPS[b.religion]?.order ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
}

export function getScriptureMeta(slug: string): ScriptureMeta | null {
  const overviewPath = path.join(scripturesDirectory, slug, "overview.md");
  const parsed = readFrontmatter(overviewPath);
  if (!parsed) return null;

  const { data } = parsed;
  return {
    slug,
    title: (data.title as string) || slug,
    religion: (data.religion as string) || "unknown",
    aliases: (data.aliases as string[]) || [],
    totalChapters: (data.totalChapters as number) || 0,
    traditions: (data.traditions as string[]) || [],
    tags: (data.tags as string[]) || [],
    lastUpdated: (data.lastUpdated as string) || "",
  };
}

export async function getScriptureOverview(slug: string): Promise<ScriptureOverview | null> {
  const overviewPath = path.join(scripturesDirectory, slug, "overview.md");
  const parsed = readFrontmatter(overviewPath);
  if (!parsed) return null;

  const { data, content } = parsed;
  const { html: htmlContent, toc } = await processMarkdown(content);

  const meta: ScriptureMeta = {
    slug,
    title: (data.title as string) || slug,
    religion: (data.religion as string) || "unknown",
    aliases: (data.aliases as string[]) || [],
    totalChapters: (data.totalChapters as number) || 0,
    traditions: (data.traditions as string[]) || [],
    tags: (data.tags as string[]) || [],
    lastUpdated: (data.lastUpdated as string) || "",
  };

  // Get available traditions
  const traditionDirs = listDirectories(path.join(scripturesDirectory, slug));
  const traditions = traditionDirs
    .map((tradSlug) => {
      const tradPath = path.join(scripturesDirectory, slug, tradSlug, "overview.md");
      const tradParsed = readFrontmatter(tradPath);
      if (!tradParsed) return null;

      const { data: td } = tradParsed;
      return {
        scripture: slug,
        tradition: tradSlug,
        traditionDisplayName: (td.traditionDisplayName as string) || tradSlug,
        title: (td.title as string) || "",
        religion: (td.religion as string) || meta.religion,
        keyThemes: (td.keyThemes as string[]) || [],
        lastUpdated: (td.lastUpdated as string) || "",
      } as TraditionMeta;
    })
    .filter((t): t is TraditionMeta => t !== null);

  return { meta, content: htmlContent, toc, traditions };
}

// ── Tradition Level ─────────────────────────────────────────

export function getTraditionMeta(scriptureSlug: string, traditionSlug: string): TraditionMeta | null {
  const tradPath = path.join(scripturesDirectory, scriptureSlug, traditionSlug, "overview.md");
  const parsed = readFrontmatter(tradPath);
  if (!parsed) return null;

  const { data } = parsed;
  return {
    scripture: scriptureSlug,
    tradition: traditionSlug,
    traditionDisplayName: (data.traditionDisplayName as string) || traditionSlug,
    title: (data.title as string) || "",
    religion: (data.religion as string) || "",
    keyThemes: (data.keyThemes as string[]) || [],
    lastUpdated: (data.lastUpdated as string) || "",
  };
}

export async function getTraditionOverview(
  scriptureSlug: string,
  traditionSlug: string
): Promise<TraditionOverview | null> {
  const scriptureMeta = getScriptureMeta(scriptureSlug);
  if (!scriptureMeta) return null;

  const tradPath = path.join(scripturesDirectory, scriptureSlug, traditionSlug, "overview.md");
  const parsed = readFrontmatter(tradPath);
  if (!parsed) return null;

  const { data, content } = parsed;
  const { html: htmlContent, toc } = await processMarkdown(content);

  const meta: TraditionMeta = {
    scripture: scriptureSlug,
    tradition: traditionSlug,
    traditionDisplayName: (data.traditionDisplayName as string) || traditionSlug,
    title: (data.title as string) || "",
    religion: (data.religion as string) || scriptureMeta.religion,
    keyThemes: (data.keyThemes as string[]) || [],
    lastUpdated: (data.lastUpdated as string) || "",
  };

  // List chapter files
  const chapterDir = path.join(scripturesDirectory, scriptureSlug, traditionSlug);
  const chapterFiles = listMdFiles(chapterDir);

  const chapters = chapterFiles
    .map((file) => {
      const chapterPath = path.join(chapterDir, file);
      const chParsed = readFrontmatter(chapterPath);
      if (!chParsed) return null;

      const { data: cd } = chParsed;
      const chNum = parseInt(file.replace(".md", ""), 10);

      return {
        scripture: scriptureSlug,
        tradition: traditionSlug,
        chapter: isNaN(chNum) ? 0 : chNum,
        title: (cd.title as string) || `Chapter ${chNum}`,
        chapterLabel: (cd.chapterLabel as string) || `Chapter ${chNum}`,
        verseCount: cd.verseCount as number | undefined,
        tags: (cd.tags as string[]) || [],
        lastUpdated: (cd.lastUpdated as string) || "",
      } as ChapterMeta;
    })
    .filter((c): c is ChapterMeta => c !== null);

  return { meta, content: htmlContent, toc, chapters, scriptureMeta };
}

// ── Chapter Level ───────────────────────────────────────────

export async function getChapter(
  scriptureSlug: string,
  traditionSlug: string,
  chapterNum: number
): Promise<ChapterDetail | null> {
  const scriptureMeta = getScriptureMeta(scriptureSlug);
  if (!scriptureMeta) return null;

  const traditionMeta = getTraditionMeta(scriptureSlug, traditionSlug);
  if (!traditionMeta) return null;

  const chapterPath = path.join(
    scripturesDirectory,
    scriptureSlug,
    traditionSlug,
    `${chapterNum}.md`
  );
  const parsed = readFrontmatter(chapterPath);
  if (!parsed) return null;

  const { data, content } = parsed;
  const { html: htmlContent, toc } = await processMarkdown(content);

  const meta: ChapterMeta = {
    scripture: scriptureSlug,
    tradition: traditionSlug,
    chapter: chapterNum,
    title: (data.title as string) || `Chapter ${chapterNum}`,
    chapterLabel: (data.chapterLabel as string) || `Chapter ${chapterNum}`,
    verseCount: data.verseCount as number | undefined,
    tags: (data.tags as string[]) || [],
    lastUpdated: (data.lastUpdated as string) || "",
  };

  // Find sibling traditions that have the same chapter
  const allTraditions = listDirectories(path.join(scripturesDirectory, scriptureSlug));
  const siblingTraditions = allTraditions.filter((t) => {
    if (t === traditionSlug) return false;
    const sibPath = path.join(scripturesDirectory, scriptureSlug, t, `${chapterNum}.md`);
    return fs.existsSync(sibPath);
  });

  // Find prev/next chapters
  const chapterDir = path.join(scripturesDirectory, scriptureSlug, traditionSlug);
  const chapterFiles = listMdFiles(chapterDir);
  const chapterNums = chapterFiles
    .map((f) => parseInt(f.replace(".md", ""), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  const currentIdx = chapterNums.indexOf(chapterNum);
  const prevChapter = currentIdx > 0 ? chapterNums[currentIdx - 1] : null;
  const nextChapter = currentIdx < chapterNums.length - 1 ? chapterNums[currentIdx + 1] : null;

  return {
    meta,
    content: htmlContent,
    toc,
    scriptureMeta,
    traditionMeta,
    siblingTraditions,
    prevChapter,
    nextChapter,
  };
}

// ── Source Text ─────────────────────────────────────────────

export async function getSourceText(
  scriptureSlug: string,
  chapterNum: number
): Promise<{ content: string } | null> {
  const sourcePath = path.join(
    scripturesDirectory,
    scriptureSlug,
    "source",
    `${chapterNum}.md`
  );
  const parsed = readFrontmatter(sourcePath);
  if (!parsed) return null;

  const { content } = parsed;
  const { html: htmlContent } = await processMarkdown(content);

  return { content: htmlContent };
}

// ── Search Index ────────────────────────────────────────────

export function getScriptureSearchIndex(): SearchIndexItem[] {
  ensureDirectoryExists();
  const items: SearchIndexItem[] = [];
  const slugs = getAllScriptureSlugs();

  for (const slug of slugs) {
    const meta = getScriptureMeta(slug);
    if (!meta) continue;

    items.push({
      id: slug,
      name: meta.title,
      type: "scripture",
      religion: meta.religion,
      path: `/s/${slug}`,
      tags: meta.tags,
    });

    const traditionDirs = listDirectories(path.join(scripturesDirectory, slug));
    for (const tradSlug of traditionDirs) {
      const tradMeta = getTraditionMeta(slug, tradSlug);
      if (!tradMeta) continue;

      items.push({
        id: `${slug}/${tradSlug}`,
        name: `${meta.title} — ${tradMeta.traditionDisplayName}`,
        type: "tradition",
        religion: meta.religion,
        path: `/s/${slug}/${tradSlug}`,
      });

      const chapterDir = path.join(scripturesDirectory, slug, tradSlug);
      const chapterFiles = listMdFiles(chapterDir);

      for (const file of chapterFiles) {
        const chPath = path.join(chapterDir, file);
        const chParsed = readFrontmatter(chPath);
        if (!chParsed) continue;

        const { data } = chParsed;
        const chNum = file.replace(".md", "");

        items.push({
          id: `${slug}/${tradSlug}/${chNum}`,
          name: (data.chapterLabel as string) || (data.title as string) || `${meta.title} Ch.${chNum}`,
          type: "chapter",
          religion: meta.religion,
          path: `/s/${slug}/${tradSlug}/${chNum}`,
          tags: (data.tags as string[]) || [],
        });
      }
    }
  }

  return items;
}

// ── Static Paths ────────────────────────────────────────────

export function getAllScripturePaths(): string[][] {
  ensureDirectoryExists();
  const paths: string[][] = [];
  const slugs = getAllScriptureSlugs();

  for (const slug of slugs) {
    paths.push([slug]);

    const traditionDirs = listDirectories(path.join(scripturesDirectory, slug));
    for (const tradSlug of traditionDirs) {
      paths.push([slug, tradSlug]);

      const chapterDir = path.join(scripturesDirectory, slug, tradSlug);
      const chapterFiles = listMdFiles(chapterDir);

      for (const file of chapterFiles) {
        const chNum = file.replace(".md", "");
        paths.push([slug, tradSlug, chNum]);
      }
    }
  }

  return paths;
}

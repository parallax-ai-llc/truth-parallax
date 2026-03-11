// Shared types for scripture data — safe for client and server use

export interface ScriptureMeta {
  slug: string;
  title: string;
  religion: string;
  aliases: string[];
  totalChapters: number;
  traditions: string[];
  tags: string[];
  lastUpdated: string;
}

export interface TraditionMeta {
  scripture: string;
  tradition: string;
  traditionDisplayName: string;
  title: string;
  religion: string;
  keyThemes: string[];
  lastUpdated: string;
}

export interface ChapterMeta {
  scripture: string;
  tradition: string;
  chapter: number;
  title: string;
  chapterLabel: string;
  verseCount?: number;
  tags: string[];
  lastUpdated: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface SearchIndexItem {
  id: string;
  name: string;
  type: "scripture" | "tradition" | "chapter";
  religion?: string;
  path: string;
  tags?: string[];
}

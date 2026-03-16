import { notFound } from "next/navigation";
import {
  getScriptureOverview,
  getTraditionOverview,
  getChapter,
  getAllScripturePaths,
  getScriptureMeta,
  getTraditionMeta,
} from "@/lib/scriptures";
import { ScriptureOverview } from "@/components/scripture-overview";
import { TraditionOverview } from "@/components/tradition-overview";
import { ChapterView } from "@/components/chapter-view";
import { ScriptureBreadcrumb } from "@/components/scripture-breadcrumb";
import { TraditionTabs } from "@/components/tradition-tabs";
import { SidebarToc } from "@/components/sidebar-toc";

export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

const GITHUB_REPO = "https://github.com/parallax-ai-llc/truth-parallax";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  // All pages generated on-demand via ISR — too many for build-time
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (slug.length === 1) {
    const meta = getScriptureMeta(slug[0]);
    if (!meta) return { title: "Not Found" };
    return {
      title: meta.title,
      description: `Explore how different traditions interpret ${meta.title} across ${meta.traditions.join(", ")}.`,
    };
  }

  if (slug.length === 2) {
    const sMeta = getScriptureMeta(slug[0]);
    const tMeta = getTraditionMeta(slug[0], slug[1]);
    if (!sMeta || !tMeta) return { title: "Not Found" };
    return {
      title: `${tMeta.traditionDisplayName} — ${sMeta.title}`,
      description: `${tMeta.traditionDisplayName} interpretation of ${sMeta.title}. Key themes: ${tMeta.keyThemes.join(", ")}.`,
    };
  }

  if (slug.length === 3) {
    const sMeta = getScriptureMeta(slug[0]);
    const tMeta = getTraditionMeta(slug[0], slug[1]);
    if (!sMeta || !tMeta) return { title: "Not Found" };
    return {
      title: `${sMeta.title} Ch.${slug[2]} — ${tMeta.traditionDisplayName}`,
      description: `${tMeta.traditionDisplayName} interpretation of ${sMeta.title} Chapter ${slug[2]}.`,
    };
  }

  return { title: "Not Found" };
}

export default async function ScriptureCatchAllPage({ params }: PageProps) {
  const { slug } = await params;

  // ── Scripture Overview (/s/genesis) ──
  if (slug.length === 1) {
    const data = await getScriptureOverview(slug[0]);
    if (!data) notFound();

    const breadcrumbs = [{ label: data.meta.title }];

    return (
      <div className="flex flex-1 py-8 px-4 md:px-6 lg:pl-96 2xl:pl-0">
        <SidebarToc items={data.toc} articleTitle={data.meta.title} />
        <div className="mx-auto w-full max-w-4xl">
          <ScriptureBreadcrumb items={breadcrumbs} />
          <ScriptureOverview
            meta={data.meta}
            content={data.content}
            traditions={data.traditions}
          />
        </div>
      </div>
    );
  }

  // ── Tradition Overview (/s/genesis/protestantism) ──
  if (slug.length === 2) {
    const data = await getTraditionOverview(slug[0], slug[1]);
    if (!data) notFound();

    const breadcrumbs = [
      { label: data.scriptureMeta.title, href: `/s/${slug[0]}` },
      { label: data.meta.traditionDisplayName },
    ];

    // Get all traditions for tabs
    const scriptureData = await getScriptureOverview(slug[0]);
    const traditions = scriptureData?.traditions.map((t) => ({
      slug: t.tradition,
      displayName: t.traditionDisplayName,
    })) || [];

    return (
      <div className="flex flex-1 py-8 px-4 md:px-6 lg:pl-96 2xl:pl-0">
        <SidebarToc items={data.toc} articleTitle={data.meta.title} />
        <div className="mx-auto w-full max-w-4xl">
          <ScriptureBreadcrumb items={breadcrumbs} />
          {traditions.length > 1 && (
            <TraditionTabs
              scriptureSlug={slug[0]}
              traditions={traditions}
              currentTradition={slug[1]}
            />
          )}
          <TraditionOverview
            meta={data.meta}
            content={data.content}
            chapters={data.chapters}
            scriptureMeta={data.scriptureMeta}
          />
          <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
            <a
              href={`${GITHUB_REPO}/edit/main/content/scriptures/${slug[0]}/${slug[1]}/overview.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-foreground transition-colors"
            >
              Edit this page on GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Chapter Detail (/s/genesis/protestantism/1) ──
  if (slug.length === 3) {
    const chapterNum = parseInt(slug[2], 10);
    if (isNaN(chapterNum)) notFound();

    const data = await getChapter(slug[0], slug[1], chapterNum);
    if (!data) notFound();

    const breadcrumbs = [
      { label: data.scriptureMeta.title, href: `/s/${slug[0]}` },
      { label: data.traditionMeta.traditionDisplayName, href: `/s/${slug[0]}/${slug[1]}` },
      { label: data.meta.chapterLabel },
    ];

    // Build tradition tabs including sibling traditions
    const scriptureData = await getScriptureOverview(slug[0]);
    const allTraditions = scriptureData?.traditions || [];

    // Filter to traditions that have this chapter
    const availableTraditions = allTraditions
      .filter((t) => t.tradition === slug[1] || data.siblingTraditions.includes(t.tradition))
      .map((t) => ({
        slug: t.tradition,
        displayName: t.traditionDisplayName,
      }));

    return (
      <div className="flex flex-1 py-8 px-4 md:px-6 lg:pl-96 2xl:pl-0">
        <SidebarToc items={data.toc} articleTitle={data.meta.chapterLabel} />
        <div className="mx-auto w-full max-w-4xl">
          <ScriptureBreadcrumb items={breadcrumbs} />
          {availableTraditions.length > 1 && (
            <TraditionTabs
              scriptureSlug={slug[0]}
              traditions={availableTraditions}
              currentTradition={slug[1]}
              chapterNum={chapterNum}
            />
          )}
          <ChapterView
            meta={data.meta}
            content={data.content}
            scriptureMeta={data.scriptureMeta}
            traditionMeta={data.traditionMeta}
            prevChapter={data.prevChapter}
            nextChapter={data.nextChapter}
          />
          <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
            <a
              href={`${GITHUB_REPO}/edit/main/content/scriptures/${slug[0]}/${slug[1]}/${chapterNum}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-foreground transition-colors"
            >
              Edit this page on GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }

  notFound();
}

import { ExternalLink, GitFork, GitPullRequest, FileEdit, CheckCircle, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Contribute",
  description: "Learn how to contribute to Truth Parallax by creating or editing scripture interpretation articles.",
};

const GITHUB_REPO = "https://github.com/parallax-ai-llc/truth-parallax";

export default function ContributePage() {
  return (
    <div className="bg-background overflow-x-hidden">
      <main className="container max-w-4xl py-12 px-4">
        <div className="space-y-2 mb-8">
          <h1 className="font-sans text-4xl font-bold tracking-tight">
            Contribute to Truth Parallax
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us build a comprehensive, balanced resource on how different religions interpret scriptures and sacred texts across traditions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`${GITHUB_REPO}/fork`} target="_blank" rel="noopener noreferrer">
              <GitFork className="mr-2 h-4 w-4" />
              Fork Repository
            </a>
          </Button>
        </div>

        <Separator className="my-8" />

        {/* Directory Structure */}
        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <FolderTree className="h-6 w-6" />
            Content Structure
          </h2>
          <p className="text-muted-foreground">
            All content lives in{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
              content/scriptures/
            </code>{" "}
            as a hierarchical directory structure. Each scripture has its own folder containing tradition-specific interpretations organized by chapter.
          </p>

          <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm leading-relaxed max-w-full">
            <code>{`content/scriptures/
  genesis/                          # Scripture folder (slug)
    overview.md                     # Scripture overview (cross-traditional)
    protestantism/                  # Interpretive tradition folder
      overview.md                   # Tradition-specific overview
      1.md                          # Chapter 1 interpretation
      2.md                          # Chapter 2 interpretation
      ...
    catholicism/
      overview.md
      1.md
      ...
  quran/
    overview.md
    sunni/
      overview.md
      1.md                          # Surah 1 (Al-Fatiha)
      ...`}</code>
          </pre>

          <p className="text-sm text-muted-foreground">
            This maps to URLs like{" "}
            <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">/s/genesis</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">/s/genesis/protestantism</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">/s/genesis/protestantism/1</code>.
          </p>
        </section>

        <Separator className="my-8" />

        {/* How to Contribute */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <FileEdit className="h-6 w-6" />
            Adding a New Interpretation
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Fork and Clone</h3>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>{`git clone https://github.com/YOUR_USERNAME/truth-parallax.git
git checkout -b feature/add-genesis-eastern-orthodox`}</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Create the Directory</h3>
                <p className="text-muted-foreground">
                  To add a new tradition to an existing scripture, create a folder under that scripture.
                  To add an entirely new scripture, create the scripture folder first with an{" "}
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">overview.md</code>.
                </p>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>{`# New tradition for existing scripture
mkdir -p content/scriptures/genesis/eastern-orthodox

# New scripture entirely
mkdir -p content/scriptures/bhagavad-gita/vaishnavism`}</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Write the Overview</h3>
                <p className="text-muted-foreground">
                  Every tradition folder needs an{" "}
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">overview.md</code>{" "}
                  with the correct frontmatter.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Add Chapter Interpretations</h3>
                <p className="text-muted-foreground">
                  Create numbered Markdown files ({" "}
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">1.md</code>,{" "}
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">2.md</code>, ...)
                  for each chapter interpretation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                5
              </div>
              <div className="space-y-2 min-w-0 flex-1">
                <h3 className="font-semibold">Commit and Open a PR</h3>
                <pre className="p-3 rounded-lg bg-muted overflow-x-auto text-sm max-w-full">
                  <code>{`git add content/scriptures/genesis/eastern-orthodox/
git commit -m "Add Eastern Orthodox interpretation of Genesis 1-3"
git push origin feature/add-genesis-eastern-orthodox`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Frontmatter Formats */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Frontmatter Formats</h2>
          <p className="text-muted-foreground">
            Each level of the hierarchy uses a specific frontmatter schema.
          </p>

          {/* Scripture overview */}
          <div className="space-y-2">
            <h3 className="font-semibold">
              Scripture Overview{" "}
              <code className="font-normal px-1 py-0.5 rounded bg-muted font-mono text-xs">
                genesis/overview.md
              </code>
            </h3>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm leading-relaxed max-w-full">
              <code>{`---
title: "Genesis"
slug: "genesis"
religion: "christianity"
aliases: ["Bereshit", "창세기"]
totalChapters: 50
traditions: ["protestantism", "catholicism", "eastern-orthodox"]
tags: ["creation", "patriarchs", "covenant"]
lastUpdated: "2026-03-12"
---

## Overview
Cross-traditional overview of the scripture...`}</code>
            </pre>
          </div>

          {/* Tradition overview */}
          <div className="space-y-2">
            <h3 className="font-semibold">
              Tradition Overview{" "}
              <code className="font-normal px-1 py-0.5 rounded bg-muted font-mono text-xs">
                genesis/protestantism/overview.md
              </code>
            </h3>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm leading-relaxed max-w-full">
              <code>{`---
title: "Protestant Interpretation of Genesis"
scripture: "genesis"
tradition: "protestantism"
traditionDisplayName: "Protestantism"
religion: "christianity"
keyThemes: ["sola scriptura", "covenant theology"]
lastUpdated: "2026-03-12"
---

## Overview
How this tradition approaches the scripture...`}</code>
            </pre>
          </div>

          {/* Chapter */}
          <div className="space-y-2">
            <h3 className="font-semibold">
              Chapter Interpretation{" "}
              <code className="font-normal px-1 py-0.5 rounded bg-muted font-mono text-xs">
                genesis/protestantism/1.md
              </code>
            </h3>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm leading-relaxed max-w-full">
              <code>{`---
title: "Genesis Chapter 1"
scripture: "genesis"
tradition: "protestantism"
chapter: 1
chapterLabel: "Chapter 1 — Creation"
verseCount: 31
tags: ["creation", "six days"]
lastUpdated: "2026-03-12"
---

## The Creation Account
Detailed interpretation from this tradition...`}</code>
            </pre>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Guidelines */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Content Guidelines</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Do</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write all content in English</li>
                <li>• Cite specific scripture passages with chapter/verse</li>
                <li>• Use authoritative theological and academic sources</li>
                <li>• Include the correct frontmatter for each file type</li>
                <li>• Respect all religious traditions equally</li>
                <li>• Represent the tradition&apos;s own perspective faithfully</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  ✕
                </span>
                <h3 className="font-semibold">Don&apos;t</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Modify code or configuration files</li>
                <li>• Declare one interpretation as &quot;correct&quot;</li>
                <li>• Include unsourced theological claims</li>
                <li>• Include proselytizing or promotional material</li>
                <li>• Denigrate or mock any religious tradition</li>
                <li>• Mix traditions — one folder per tradition</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Editing Existing */}
        <section className="space-y-6 mb-12">
          <h2 className="font-sans text-2xl font-semibold flex items-center gap-2">
            <GitPullRequest className="h-6 w-6" />
            Editing Existing Content
          </h2>

          <p className="text-muted-foreground">To edit an existing interpretation:</p>

          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">1.</span>
              Navigate to the scripture page on our website
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">2.</span>
              Click the &quot;Edit this page on GitHub&quot; link at the bottom of the page
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">3.</span>
              Click the pencil icon on GitHub to edit the file
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">4.</span>
              Make your changes and submit a pull request
            </li>
          </ol>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm">
              <strong>Tip:</strong> You can browse all content directly at{" "}
              <a
                href={`${GITHUB_REPO}/tree/main/content/scriptures`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {GITHUB_REPO}/tree/main/content/scriptures
              </a>
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Review Process */}
        <section className="space-y-4 mb-12">
          <h2 className="font-sans text-2xl font-semibold">Review Process</h2>
          <p className="text-muted-foreground">After you submit a pull request:</p>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>Your PR will be reviewed for correct directory structure and frontmatter</li>
            <li>Content will be verified for accuracy and balanced representation</li>
            <li>An editorial review will check for respectfulness and quality</li>
            <li>Once approved, your contribution will be merged and deployed</li>
          </ol>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <h2 className="font-sans text-2xl font-semibold">Ready to Contribute?</h2>
          <p className="text-muted-foreground max-w-md">
            Your contributions help create a more comprehensive understanding of how different traditions interpret the same sacred texts.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Go to GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

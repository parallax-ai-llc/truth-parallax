import { NextResponse } from "next/server";
import { APP_CACHE_HEADERS, buildEntry } from "@/lib/app-api";

// iOS app: scripture / tradition / chapter as metadata + raw Markdown.
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const entry = buildEntry(slug);
  if (!entry) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(entry, { headers: APP_CACHE_HEADERS });
}

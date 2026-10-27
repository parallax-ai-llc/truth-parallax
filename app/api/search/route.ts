import { NextResponse } from "next/server";
import { getScriptureSearchIndex } from "@/lib/scriptures";

// Content only changes on deploy: build this once and serve it from the CDN.
export const dynamic = "force-static";

export async function GET() {
  const index = getScriptureSearchIndex();
  return NextResponse.json(index);
}

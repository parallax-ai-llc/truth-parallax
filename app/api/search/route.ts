import { NextResponse } from "next/server";
import { getScriptureSearchIndex } from "@/lib/scriptures";

export async function GET() {
  const index = getScriptureSearchIndex();
  return NextResponse.json(index);
}

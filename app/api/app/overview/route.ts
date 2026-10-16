import { NextResponse } from "next/server";
import { APP_CACHE_HEADERS, buildOverview } from "@/lib/app-api";

// iOS app: counts, religions, every scripture (metadata) and today's shared chapter.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(buildOverview(), { headers: APP_CACHE_HEADERS });
}

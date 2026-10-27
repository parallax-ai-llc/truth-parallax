import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Truth Parallax";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export default async function Image() {
  // Font load: best-effort only. During `output: export` builds, external fetches can time out.
  let fontData: ArrayBuffer | null = null;
  try {
    const fontCss = await fetchWithTimeout(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } },
      3000
    ).then((res) => res.text());

    const fontUrl = fontCss.match(/src: url\(([^)]+)\)/)?.[1];
    if (fontUrl) {
      fontData = await fetchWithTimeout(fontUrl, {}, 3000).then((res) => res.arrayBuffer());
    }
  } catch {
    fontData = null;
  }

  // Satori needs at least one font; fall back to the bundled Google Sans Flex.
  const fallbackFont = fontData
    ? null
    : await readFile(path.join(process.cwd(), "app/fonts/google-sans-flex-700.ttf"));

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        fontFamily: fontData ? "Cormorant Garamond" : "Google Sans Flex",
      }}
    >
      <div
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        Truth Parallax
      </div>
      <div
        style={{
          fontSize: "32px",
          color: "#888",
        }}
      >
        One scripture, many parallax
      </div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Cormorant Garamond",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : [
            {
              name: "Google Sans Flex",
              data: fallbackFont!,
              style: "normal",
              weight: 700,
            },
          ],
    }
  );
}

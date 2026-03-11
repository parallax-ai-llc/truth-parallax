import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Serif 폰트 (로고, 기사 제목 등)
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Truth Parallax",
    template: "%s | Truth Parallax",
  },
  description: "Explore how different religions interpret the same scriptures and sacred texts across traditions",
  keywords: ["religion", "scripture", "bible", "quran", "torah", "buddhism", "hinduism", "comparative religion", "theology", "sacred texts", "interpretation"],
  authors: [{ name: "Parallax AI" }],
  creator: "Parallax AI",
  metadataBase: new URL("https://truth.parallax.kr"),
  openGraph: {
    title: "Truth Parallax",
    description: "Explore how different religions interpret the same scriptures and sacred texts across traditions",
    url: "https://truth.parallax.kr",
    siteName: "Truth Parallax",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Truth Parallax",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth Parallax",
    description: "Explore how different religions interpret the same scriptures and sacred texts across traditions",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LCP 최적화: 폰트 프리로드 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${cormorant.variable} font-sans antialiased`}>
        {/* WCAG AAA: 스킵 네비게이션 링크 */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="main-content" role="main" tabIndex={-1}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

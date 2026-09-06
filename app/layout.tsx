import Script from "next/script";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/i18n";
import { WebVitals } from "@/components/web-vitals";
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

// 본문 폰트 (Google Sans Flex) — Google Fonts 목록에 없어 self-host.
// 렌더링 차단 외부 스타일시트를 제거하고 preload + fallback 메트릭 보정으로 CLS 감소.
const googleSans = localFont({
  src: [
    { path: "./fonts/google-sans-flex-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/google-sans-flex-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/google-sans-flex-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/google-sans-flex-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
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
        {/* Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-W71QF2WLYQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W71QF2WLYQ');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} ${googleSans.variable} font-sans antialiased`}>
        <WebVitals />
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
          <LocaleProvider>
            <div id="main-content" role="main" tabIndex={-1}>
              {children}
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

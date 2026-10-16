"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

type FooterLink = {
  href: string;
  /** literal label (brand names) — takes precedence over labelKey */
  label?: string;
  /** i18n key for translated labels */
  labelKey?: string;
  /** true for this site's own pages (rendered with next/link, same tab) */
  internal?: boolean;
};

// Parallax 서비스 — parallax.kr 하단 서비스 섹션과 동일한 순서, 끝에 graygate 추가
const SERVICE_LINKS: FooterLink[] = [
  { label: "Sites", href: "https://sites.parallax.kr" },
  { label: "Iris", href: "https://parallax.kr/iris/templates" },
  { label: "Soulmate", href: "https://soulmate.parallax.kr" },
  { label: "Storage", href: "https://storage.parallax.kr" },
  { label: "Docs", href: "https://docs.parallax.kr" },
  { label: "Forms", href: "https://forms.parallax.kr" },
  { label: "Calendar", href: "https://calendar.parallax.kr" },
  { label: "Slides", href: "https://slides.parallax.kr" },
  { label: "Blog", href: "https://blog.parallax.kr" },
  { label: "Launch", href: "https://launch.parallax.kr" },
  { label: "Engage", href: "https://engage.parallax.kr" },
  { label: "Downloader", href: "https://downloader.parallax.kr" },
  { label: "Cloud", href: "https://cloud.parallax.kr" },
  { label: "DEX", href: "https://dex.parallax.kr" },
  { label: "Skills", href: "https://skills.parallax.kr" },
  { label: "Links", href: "https://links.parallax.kr" },
  { label: "Playground", href: "https://playground.parallax.kr" },
  { label: "Graygate", href: "https://graygate.app" },
];

const WIKI_LINKS: FooterLink[] = [
  { label: "Law", href: "https://legal.parallax.kr" },
  { label: "Truth", href: "/", internal: true },
  { label: "History", href: "https://historical.parallax.kr" },
  { label: "News", href: "https://pan.parallax.kr" },
  { label: "Orb", href: "https://orb.parallax.kr" },
];

const DOCUMENT_LINKS: FooterLink[] = [
  { labelKey: "contribute", href: "/contribute", internal: true },
  { labelKey: "termsOfService", href: "/terms-of-service", internal: true },
  { labelKey: "privacyPolicy", href: "/privacy-policy", internal: true },
  { labelKey: "contact", href: "https://cs.parallax.kr" },
  { labelKey: "serviceStatus", href: "https://status.parallax.kr" },
];

const linkClassName =
  "rounded-sm hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export function Footer() {
  const { t } = useLocale();

  const sections = [
    { id: "services", title: t("footerServices"), links: SERVICE_LINKS },
    { id: "wiki", title: t("footerWiki"), links: WIKI_LINKS },
    { id: "documents", title: t("footerDocuments"), links: DOCUMENT_LINKS },
  ];

  return (
    <footer
      className="border-t border-border/40 py-10"
      role="contentinfo"
      aria-label={t("footerAriaLabel")}
    >
      <div className="container flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-mark.svg" alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-serif text-lg font-semibold">Truth Parallax</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            {t("poweredBy")}{" "}
            <a
              href="https://parallax.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label={t("poweredByAriaLabel")}
            >
              Parallax AI, LLC
            </a>
          </p>
        </div>
        <nav
          aria-label={t("footerNavAriaLabel")}
          className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:gap-16"
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className={section.id === "services" ? "col-span-2 sm:col-span-1" : undefined}
            >
              <h2 id={`footer-${section.id}`} className="mb-3 font-semibold text-foreground">
                {section.title}
              </h2>
              <ul
                aria-labelledby={`footer-${section.id}`}
                className={
                  section.id === "services"
                    ? "grid grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground"
                    : "flex flex-col gap-2 text-muted-foreground"
                }
              >
                {section.links.map((link) => {
                  const label = link.label ?? t(link.labelKey!);
                  return (
                    <li key={link.href}>
                      {link.internal ? (
                        <Link href={link.href} className={linkClassName}>
                          {label}
                        </Link>
                      ) : (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}

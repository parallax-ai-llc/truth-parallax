"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

// Mirrors the service list at the bottom of parallax.kr, plus Graygate.
const SERVICES: FooterLink[] = [
  { label: "Sites", href: "https://parallax.kr", external: true },
  { label: "Iris", href: "https://iris.parallax.kr", external: true },
  { label: "Soulmate", href: "https://soulmate.parallax.kr", external: true },
  { label: "Storage", href: "https://storage.parallax.kr", external: true },
  { label: "Docs", href: "https://docs.parallax.kr", external: true },
  { label: "Forms", href: "https://forms.parallax.kr", external: true },
  { label: "Cloud", href: "https://cloud.parallax.kr", external: true },
  { label: "DEX", href: "https://dex.parallax.kr", external: true },
  { label: "Playground", href: "https://playground.parallax.kr", external: true },
  { label: "Graygate", href: "https://graygate.app", external: true },
];

const WIKIS: FooterLink[] = [
  { label: "Law", href: "https://legal.parallax.kr", external: true },
  { label: "Truth", href: "/" },
  { label: "History", href: "https://historical.parallax.kr", external: true },
  { label: "News", href: "https://news.parallax.kr", external: true },
  { label: "Orb", href: "https://orb.parallax.kr", external: true },
];

const linkClassName =
  "rounded-sm hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 text-sm font-semibold text-foreground">{title}</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className={linkClassName}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { t } = useLocale();

  const resources: FooterLink[] = [
    { label: t("about"), href: "https://parallax.kr/en/about", external: true },
    { label: t("contribute"), href: "/contribute" },
    { label: t("termsOfService"), href: "/terms-of-service" },
    { label: t("privacyPolicy"), href: "/privacy-policy" },
    { label: t("contact"), href: "https://cs.parallax.kr", external: true },
    { label: t("serviceStatus"), href: "https://status.parallax.kr", external: true },
  ];

  return (
    <footer className="border-t border-border/40 py-10" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn title={t("footerServices")} links={SERVICES} />
          <FooterColumn title={t("footerWiki")} links={WIKIS} />
          <FooterColumn title={t("footerResources")} links={resources} />
        </div>

        <div className="mt-10 flex items-center gap-2 border-t border-border/40 pt-6 text-sm text-muted-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand-mark.svg" alt="" width={20} height={20} className="h-5 w-5" />
          <p>
            {t("poweredBy")}{" "}
            <Link
              href="https://parallax.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Parallax AI, LLC (opens in new tab)"
            >
              Parallax AI, LLC
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

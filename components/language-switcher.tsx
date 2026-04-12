"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "简体中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "pt", name: "Português" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-md border bg-popover p-1 shadow-md z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code as typeof locale);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground ${
                locale === lang.code ? "bg-accent text-accent-foreground font-medium" : ""
              }`}
            >
              <span>{lang.name}</span>
            </button>
          ))}
          <div className="mt-1 border-t px-2 py-1.5 text-[10px] text-muted-foreground/70">
            {t("translationsComingSoon")}
          </div>
        </div>
      )}
    </div>
  );
}

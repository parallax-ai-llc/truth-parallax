"use client";

import * as React from "react";
import { X } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kr.parallax.app&pcampaignid=web_share";
const DISMISS_KEY = "parallax-app-banner-dismissed";
const DISMISS_EVENT = "parallax-app-banner-dismiss";

// localStorage 를 못 쓰는 환경(시크릿 모드 등)에서도 닫기가 동작하도록 메모리 폴백
let dismissedInMemory = false;

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(DISMISS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function shouldShow() {
  if (!/android/i.test(navigator.userAgent)) return false;
  if (dismissedInMemory) return false;
  try {
    return localStorage.getItem(DISMISS_KEY) !== "1";
  } catch {
    return true;
  }
}

function dismiss() {
  dismissedInMemory = true;
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(DISMISS_EVENT));
}

/** Android 모바일 접속 시 하단에 Parallax 앱(Play 스토어) 설치 배너를 띄운다. */
export function AndroidAppBanner() {
  const { t } = useLocale();
  const visible = React.useSyncExternalStore(subscribe, shouldShow, () => false);

  if (!visible) return null;

  return (
    <>
      {/* 고정 배너가 페이지 하단(푸터)을 가리지 않도록 같은 높이만큼 여백 확보 */}
      <div aria-hidden="true" className="h-16 md:hidden" />
      <aside
        aria-label={t("appBannerTitle")}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
      >
        <div className="container flex h-16 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand-mark.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-lg border border-border/40 p-1.5"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{t("appBannerTitle")}</p>
            <p className="truncate text-xs text-muted-foreground">{t("appBannerDescription")}</p>
          </div>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("appBannerInstall")}
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("appBannerDismiss")}
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </aside>
    </>
  );
}

"use client";

import * as React from "react";

const STORAGE_KEY = "preferred-locale";

type Locale = "en" | "ko" | "zh" | "es" | "fr" | "de" | "ja" | "pt" | "ar" | "hi";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    tagline: "One scripture, many parallax",
    searchPlaceholder: "Search scriptures...",
    scripturesCount: "{count} scriptures",
    docsCount: "{files} interpretation documents",
    browseAll: "Browse all scriptures",
    noResults: 'No scriptures found for "{query}"',
    results: "{count} results",
    contribute: "Contribute",
    search: "Search...",
    poweredBy: "Powered by",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    translationsComingSoon: "Translations coming soon",
    editOnGithub: "Edit this page on GitHub",
    footerServices: "Services",
    footerWiki: "Wiki",
    footerResources: "Resources",
    about: "About",
    contact: "Contact",
    serviceStatus: "Service Status",
    footerDocuments: "Documents",
    footerAriaLabel: "Site footer",
    footerNavAriaLabel: "Footer navigation",
    poweredByAriaLabel: "Parallax AI, LLC (opens in new tab)",
    appBannerTitle: "Parallax App",
    appBannerDescription: "Read more comfortably in the app",
    appBannerInstall: "Install",
    appBannerDismiss: "Dismiss",
  },
  ko: {
    tagline: "하나의 경전, 다양한 시차",
    searchPlaceholder: "경전 검색...",
    scripturesCount: "{count}개 경전",
    docsCount: "{files}개 해석 문서",
    browseAll: "모든 경전 탐색",
    noResults: '"{query}"에 대한 경전을 찾을 수 없습니다',
    results: "{count}개 결과",
    contribute: "기여하기",
    search: "검색...",
    poweredBy: "제공",
    termsOfService: "이용약관",
    privacyPolicy: "개인정보처리방침",
    translationsComingSoon: "번역이 곧 제공됩니다",
    editOnGithub: "GitHub에서 이 페이지 편집",
    footerServices: "서비스",
    footerWiki: "위키",
    footerResources: "문서",
    about: "소개",
    contact: "문의하기",
    serviceStatus: "서비스 상태",
    footerDocuments: "문서",
    footerAriaLabel: "사이트 하단",
    footerNavAriaLabel: "하단 내비게이션",
    poweredByAriaLabel: "Parallax AI, LLC (새 탭에서 열림)",
    appBannerTitle: "Parallax 앱",
    appBannerDescription: "앱에서 더 편하게 읽어보세요",
    appBannerInstall: "설치",
    appBannerDismiss: "닫기",
  },
  zh: {
    tagline: "一部经典，多重视差",
    searchPlaceholder: "搜索经典...",
    scripturesCount: "{count} 部经典",
    docsCount: "{files} 篇解读文档",
    browseAll: "浏览所有经典",
    noResults: '未找到与"{query}"相关的经典',
    results: "{count} 个结果",
    contribute: "贡献",
    search: "搜索...",
    poweredBy: "技术支持",
    termsOfService: "服务条款",
    privacyPolicy: "隐私政策",
    translationsComingSoon: "翻译即将推出",
    editOnGithub: "在GitHub上编辑此页",
    footerServices: "服务",
    footerWiki: "百科",
    footerResources: "文档",
    about: "关于",
    contact: "联系我们",
    serviceStatus: "服务状态",
    footerDocuments: "文档",
    footerAriaLabel: "网站页脚",
    footerNavAriaLabel: "页脚导航",
    poweredByAriaLabel: "Parallax AI, LLC（在新标签页中打开）",
    appBannerTitle: "Parallax 应用",
    appBannerDescription: "在应用中阅读更方便",
    appBannerInstall: "安装",
    appBannerDismiss: "关闭",
  },
  es: {
    tagline: "Una escritura, muchas paralajes",
    searchPlaceholder: "Buscar escrituras...",
    scripturesCount: "{count} escrituras",
    docsCount: "{files} documentos de interpretación",
    browseAll: "Ver todas las escrituras",
    noResults: 'No se encontraron escrituras para "{query}"',
    results: "{count} resultados",
    contribute: "Contribuir",
    search: "Buscar...",
    poweredBy: "Desarrollado por",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    translationsComingSoon: "Traducciones próximamente",
    editOnGithub: "Editar esta página en GitHub",
    footerServices: "Servicios",
    footerWiki: "Wiki",
    footerResources: "Recursos",
    about: "Acerca de",
    contact: "Contacto",
    serviceStatus: "Estado del servicio",
    footerDocuments: "Documentos",
    footerAriaLabel: "Pie de página del sitio",
    footerNavAriaLabel: "Navegación del pie de página",
    poweredByAriaLabel: "Parallax AI, LLC (se abre en una nueva pestaña)",
    appBannerTitle: "App de Parallax",
    appBannerDescription: "Lee más cómodamente en la app",
    appBannerInstall: "Instalar",
    appBannerDismiss: "Cerrar",
  },
  fr: {
    tagline: "Une écriture, de nombreuses parallaxes",
    searchPlaceholder: "Rechercher des écritures...",
    scripturesCount: "{count} écritures",
    docsCount: "{files} documents d'interprétation",
    browseAll: "Parcourir toutes les écritures",
    noResults: 'Aucune écriture trouvée pour « {query} »',
    results: "{count} résultats",
    contribute: "Contribuer",
    search: "Rechercher...",
    poweredBy: "Propulsé par",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    translationsComingSoon: "Traductions à venir",
    editOnGithub: "Modifier cette page sur GitHub",
    footerServices: "Services",
    footerWiki: "Wiki",
    footerResources: "Ressources",
    about: "À propos",
    contact: "Contact",
    serviceStatus: "État du service",
    footerDocuments: "Documents",
    footerAriaLabel: "Pied de page du site",
    footerNavAriaLabel: "Navigation du pied de page",
    poweredByAriaLabel: "Parallax AI, LLC (s'ouvre dans un nouvel onglet)",
    appBannerTitle: "Application Parallax",
    appBannerDescription: "Lisez plus confortablement dans l’application",
    appBannerInstall: "Installer",
    appBannerDismiss: "Fermer",
  },
  de: {
    tagline: "Eine Schrift, viele Parallaxen",
    searchPlaceholder: "Schriften durchsuchen...",
    scripturesCount: "{count} Schriften",
    docsCount: "{files} Interpretationsdokumente",
    browseAll: "Alle Schriften durchsuchen",
    noResults: 'Keine Schriften gefunden für „{query}"',
    results: "{count} Ergebnisse",
    contribute: "Beitragen",
    search: "Suchen...",
    poweredBy: "Bereitgestellt von",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutz",
    translationsComingSoon: "Übersetzungen folgen",
    editOnGithub: "Diese Seite auf GitHub bearbeiten",
    footerServices: "Dienste",
    footerWiki: "Wiki",
    footerResources: "Ressourcen",
    about: "Über uns",
    contact: "Kontakt",
    serviceStatus: "Dienststatus",
    footerDocuments: "Dokumente",
    footerAriaLabel: "Website-Fußzeile",
    footerNavAriaLabel: "Fußzeilen-Navigation",
    poweredByAriaLabel: "Parallax AI, LLC (öffnet in neuem Tab)",
    appBannerTitle: "Parallax-App",
    appBannerDescription: "Bequemer lesen in der App",
    appBannerInstall: "Installieren",
    appBannerDismiss: "Schließen",
  },
  ja: {
    tagline: "一つの聖典、多くの視差",
    searchPlaceholder: "聖典を検索...",
    scripturesCount: "{count}の聖典",
    docsCount: "{files}の解釈文書",
    browseAll: "すべての聖典を見る",
    noResults: '「{query}」に該当する聖典が見つかりません',
    results: "{count}件の結果",
    contribute: "貢献する",
    search: "検索...",
    poweredBy: "提供",
    termsOfService: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    translationsComingSoon: "翻訳は近日公開予定",
    editOnGithub: "GitHubでこのページを編集",
    footerServices: "サービス",
    footerWiki: "ウィキ",
    footerResources: "ドキュメント",
    about: "概要",
    contact: "お問い合わせ",
    serviceStatus: "サービス状況",
    footerDocuments: "ドキュメント",
    footerAriaLabel: "サイトフッター",
    footerNavAriaLabel: "フッターナビゲーション",
    poweredByAriaLabel: "Parallax AI, LLC（新しいタブで開く）",
    appBannerTitle: "Parallax アプリ",
    appBannerDescription: "アプリでもっと快適に読めます",
    appBannerInstall: "インストール",
    appBannerDismiss: "閉じる",
  },
  pt: {
    tagline: "Uma escritura, muitas paralaxes",
    searchPlaceholder: "Pesquisar escrituras...",
    scripturesCount: "{count} escrituras",
    docsCount: "{files} documentos de interpretação",
    browseAll: "Explorar todas as escrituras",
    noResults: 'Nenhuma escritura encontrada para "{query}"',
    results: "{count} resultados",
    contribute: "Contribuir",
    search: "Pesquisar...",
    poweredBy: "Fornecido por",
    termsOfService: "Termos de serviço",
    privacyPolicy: "Política de privacidade",
    translationsComingSoon: "Traduções em breve",
    editOnGithub: "Editar esta página no GitHub",
    footerServices: "Serviços",
    footerWiki: "Wiki",
    footerResources: "Recursos",
    about: "Sobre",
    contact: "Contato",
    serviceStatus: "Status do serviço",
    footerDocuments: "Documentos",
    footerAriaLabel: "Rodapé do site",
    footerNavAriaLabel: "Navegação do rodapé",
    poweredByAriaLabel: "Parallax AI, LLC (abre em uma nova aba)",
    appBannerTitle: "App Parallax",
    appBannerDescription: "Leia com mais conforto no app",
    appBannerInstall: "Instalar",
    appBannerDismiss: "Fechar",
  },
  ar: {
    tagline: "كتاب واحد، منظورات متعددة",
    searchPlaceholder: "البحث في الكتب المقدسة...",
    scripturesCount: "{count} كتاب مقدس",
    docsCount: "{files} وثيقة تفسيرية",
    browseAll: "تصفح جميع الكتب المقدسة",
    noResults: 'لم يتم العثور على كتب مقدسة لـ "{query}"',
    results: "{count} نتائج",
    contribute: "المساهمة",
    search: "بحث...",
    poweredBy: "مدعوم من",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    translationsComingSoon: "الترجمات قادمة قريباً",
    editOnGithub: "تحرير هذه الصفحة على GitHub",
    footerServices: "الخدمات",
    footerWiki: "ويكي",
    footerResources: "الموارد",
    about: "حول",
    contact: "اتصل بنا",
    serviceStatus: "حالة الخدمة",
    footerDocuments: "المستندات",
    footerAriaLabel: "تذييل الموقع",
    footerNavAriaLabel: "تنقل التذييل",
    poweredByAriaLabel: "Parallax AI, LLC (يفتح في تبويب جديد)",
    appBannerTitle: "تطبيق Parallax",
    appBannerDescription: "اقرأ براحة أكبر في التطبيق",
    appBannerInstall: "تثبيت",
    appBannerDismiss: "إغلاق",
  },
  hi: {
    tagline: "एक शास्त्र, अनेक दृष्टिकोण",
    searchPlaceholder: "शास्त्र खोजें...",
    scripturesCount: "{count} शास्त्र",
    docsCount: "{files} व्याख्या दस्तावेज़",
    browseAll: "सभी शास्त्र देखें",
    noResults: '"{query}" के लिए कोई शास्त्र नहीं मिला',
    results: "{count} परिणाम",
    contribute: "योगदान करें",
    search: "खोजें...",
    poweredBy: "द्वारा संचालित",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    translationsComingSoon: "अनुवाद जल्द आ रहे हैं",
    editOnGithub: "GitHub पर इस पृष्ठ को संपादित करें",
    footerServices: "सेवाएँ",
    footerWiki: "विकी",
    footerResources: "संसाधन",
    about: "परिचय",
    contact: "संपर्क करें",
    serviceStatus: "सेवा स्थिति",
    footerDocuments: "दस्तावेज़",
    footerAriaLabel: "साइट फुटर",
    footerNavAriaLabel: "फुटर नेविगेशन",
    poweredByAriaLabel: "Parallax AI, LLC (नए टैब में खुलता है)",
    appBannerTitle: "Parallax ऐप",
    appBannerDescription: "ऐप में और आराम से पढ़ें",
    appBannerInstall: "इंस्टॉल करें",
    appBannerDismiss: "बंद करें",
  },
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = React.createContext<LocaleContextType | null>(null);

// localStorage-backed external store for the locale. Using useSyncExternalStore
// (instead of useState + useEffect rehydration) keeps SSR/hydration on "en" and
// switches to the stored locale without a setState-in-effect.
const LOCALE_CHANGE_EVENT = "preferred-locale-change";

// In-memory fallback so switching still works when localStorage is unavailable.
let memoryLocale: Locale = "en";

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && translations[stored]) return stored;
  } catch {
    /* ignore */
  }
  return memoryLocale;
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore<Locale>(subscribeToLocale, readStoredLocale, () => "en");

  const setLocale = React.useCallback((newLocale: Locale) => {
    memoryLocale = newLocale;
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let text = translations[locale]?.[key] || translations.en[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

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
  },
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = React.createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && translations[stored]) setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      /* ignore */
    }
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

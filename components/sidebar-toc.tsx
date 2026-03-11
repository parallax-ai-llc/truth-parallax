"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface SidebarTocProps {
  items: TocItem[];
  activeId?: string;
  articleTitle?: string;
}

export function SidebarToc({ items, activeId, articleTitle }: SidebarTocProps) {
  const [currentActive, setCurrentActive] = React.useState(activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
      // 포커스를 해당 섹션으로 이동 (접근성)
      element.focus();
    }
  };

  return (
    <aside
      className="hidden fixed top-14 left-0 z-30 w-80 h-[calc(100vh-3.5rem)] bg-background/50 backdrop-blur-sm lg:block"
      aria-label="Table of contents"
    >
      <div className="h-full py-6 pl-6 pr-4">
        <ScrollArea className="h-full">
          <nav aria-label="Article sections">
            {articleTitle && (
              <h2
                className="mb-4 text-sm font-semibold text-foreground/80 tracking-tight"
                id="toc-heading"
              >
                On this page
              </h2>
            )}
            <ul className="space-y-2" aria-labelledby="toc-heading">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    aria-current={currentActive === item.id ? "location" : undefined}
                    className={cn(
                      "block w-full text-left text-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm border-l-2 pl-3 -ml-[1px]",
                      item.level === 3 && "ml-3 border-l-0 pl-1", // h3 indentation
                      item.level === 4 && "ml-6 border-l-0 pl-1", // h4 indentation
                      currentActive === item.id
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border"
                    )}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}

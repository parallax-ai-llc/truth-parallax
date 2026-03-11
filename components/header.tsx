"use client";

import Link from "next/link";
import { Search, GitPullRequest, Pencil } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearchClick?: () => void;
  showContribute?: boolean;
  editUrl?: string;
}

export function Header({ onSearchClick, showContribute, editUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight font-bold">
            Legal Parallax
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-9 w-64 justify-start px-3 text-sm text-muted-foreground md:flex"
            onClick={onSearchClick}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search cases...</span>
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={onSearchClick}>
            <Search className="h-4 w-4" />
          </Button>

          {showContribute && (
            <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
              <Link href="/contribute">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Contribute
              </Link>
            </Button>
          )}

          {editUrl && (
            <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </a>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

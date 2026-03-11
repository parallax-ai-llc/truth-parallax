"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Users, FileText } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface SearchItem {
  id: string;
  name: string;
  type?: "scripture" | "tradition" | "chapter";
  religion?: string;
  path?: string;
  tags?: string[];
  // Legacy compat
  nationality?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchItem[];
}

const TYPE_ICONS = {
  scripture: BookOpen,
  tradition: Users,
  chapter: FileText,
};

const TYPE_LABELS = {
  scripture: "Scriptures",
  tradition: "Traditions",
  chapter: "Chapters",
};

export function SearchDialog({ open, onOpenChange, items }: SearchDialogProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!search) return items.slice(0, 20);

    const lowerSearch = search.toLowerCase();
    return items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.religion?.toLowerCase().includes(lowerSearch) ||
          item.tags?.some((t) => t.toLowerCase().includes(lowerSearch))
      )
      .slice(0, 20);
  }, [items, search]);

  const scriptures = filteredItems.filter((item) => item.type === "scripture");
  const traditions = filteredItems.filter((item) => item.type === "tradition");
  const chapters = filteredItems.filter((item) => item.type === "chapter");

  const handleSelect = (item: SearchItem) => {
    const path = item.path || `/s/${item.id}`;
    router.push(path);
    onOpenChange(false);
    setSearch("");
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const renderGroup = (
    items: SearchItem[],
    type: "scripture" | "tradition" | "chapter"
  ) => {
    if (items.length === 0) return null;
    const Icon = TYPE_ICONS[type];
    const label = TYPE_LABELS[type];

    return (
      <CommandGroup heading={label}>
        {items.map((item) => (
          <CommandItem
            key={`${type}-${item.id}`}
            value={`${type}-${item.id}-${item.name}`}
            onSelect={() => handleSelect(item)}
            className="cursor-pointer"
          >
            <Icon className="mr-2 h-4 w-4" />
            <span className="font-medium">{item.name}</span>
            {item.religion && (
              <span className="ml-auto text-xs text-muted-foreground capitalize">
                {item.religion}
              </span>
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Search scriptures, traditions, and chapters"
    >
      <CommandInput
        placeholder="Search scriptures and interpretations..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {renderGroup(scriptures, "scripture")}
        {renderGroup(traditions, "tradition")}
        {renderGroup(chapters, "chapter")}
      </CommandList>
    </CommandDialog>
  );
}

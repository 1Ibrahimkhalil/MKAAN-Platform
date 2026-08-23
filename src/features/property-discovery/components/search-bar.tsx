"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SearchBar({
  placeholder = "ابحث عن منطقة، حي، أو مشروع...",
  defaultValue = "",
  onSearch,
  className,
}: {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;
        onSearch?.(query);
      }}
      className={cn(
        "focus-within:ring-action rounded-full bg-white p-3 shadow-md transition-all focus-within:ring-2 md:p-4",
        className,
      )}
    >
      <div className="flex items-center">
        <span className="material-symbols-outlined text-muted-foreground ms-3 me-4 text-[24px]">
          search
        </span>
        <input
          name="search"
          type="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent font-[family-name:var(--font-numerals)] text-[18px] outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          className="bg-action hover:bg-action-hover shrink-0 cursor-pointer rounded-full px-12 py-4 text-[18px] font-bold text-white md:py-4"
        >
          بحث
        </Button>
      </div>
    </form>
  );
}

"use client";

import { Search, MapPin, ArrowRightLeft, Building2, Tag } from "lucide-react";
import {
  GOVERNORATES,
  HERO_TRANSACTIONS,
  HERO_PROPERTY_TYPES,
  HERO_PRICES,
} from "@/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function HeroSelect({
  icon: Icon,
  label,
  options,
  defaultValue = "الكل",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div className="group flex flex-col gap-2 text-right">
      <Label className="font-label-md text-muted-foreground px-1 text-sm font-bold">
        {label}
      </Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger
          hideChevron
          className="text-foreground border-border/30 hover:border-action focus:border-action focus:ring-action/20 data-[placeholder]:text-muted-foreground relative h-auto w-full cursor-pointer rounded-xl border bg-white/90 py-3 ps-9 pe-4 text-sm font-medium shadow-sm transition-colors hover:bg-white sm:py-4 sm:ps-10 sm:pe-5"
        >
          <Icon className="text-action pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 sm:start-4 sm:size-5" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          sideOffset={4}
          align="start"
          className="border-border/20 rounded-xl bg-white shadow-xl"
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function HeroSearchCard() {
  return (
    <div className="glass-card flex w-full max-w-5xl flex-col gap-[clamp(1rem,2vw,1.5rem)] rounded-3xl p-[clamp(1rem,2vw,2rem)] shadow-2xl">
      <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.5vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
        <HeroSelect icon={MapPin} label="الموقع" options={GOVERNORATES} />
        <HeroSelect
          icon={ArrowRightLeft}
          label="نوع المعاملة"
          options={HERO_TRANSACTIONS}
        />
        <HeroSelect
          icon={Building2}
          label="نوع العقار"
          options={HERO_PROPERTY_TYPES}
        />
        <HeroSelect icon={Tag} label="السعر" options={HERO_PRICES} />
      </div>

      <div className="border-border/20 mt-2 flex flex-col items-center gap-3 border-t pt-[clamp(0.75rem,1.5vw,1.5rem)] sm:flex-row sm:justify-between">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="btn-interactive w-full rounded-xl px-8 py-3 text-sm font-bold transition-all sm:w-auto"
          >
            اطلب عقار
          </Button>
          <Button
            type="button"
            variant="outline"
            className="btn-interactive w-full rounded-xl px-8 py-3 text-sm font-bold transition-all sm:w-auto"
          >
            اعرض عقارك
          </Button>
        </div>
        <Button
          type="button"
          size="xlg"
          className="bg-action hover:bg-action-hover btn-interactive shadow-action/20 hover:shadow-action/30 flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 sm:w-[200px]"
        >
          <Search className="size-5 font-bold" />
          بحث
        </Button>
      </div>
    </div>
  );
}

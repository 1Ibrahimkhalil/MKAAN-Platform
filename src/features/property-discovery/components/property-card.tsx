import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PropertyCardData } from "../types/property";

export type { PropertyCardData };

export function PropertyCard({
  property,
  className,
}: {
  property: PropertyCardData;
  className?: string;
}) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "bg-surface-secondary group/card border-border/20 relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300",
        "hover:shadow-md",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
        <div className="absolute end-2 top-2 flex gap-1">
          {property.featured && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-[10px]">
              مميز
            </span>
          )}
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px]",
              property.transactionType === "sale"
                ? "bg-action-container text-action-foreground"
                : "bg-primary text-primary-foreground",
            )}
          >
            {property.transactionType === "sale" ? "للبيع" : "للإيجار"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-foreground mb-1 text-base font-bold">
          {property.title}
        </h3>
        <div className="text-action mb-3 text-sm font-bold" dir="ltr">
          {property.price.toLocaleString("ar-EG")} ج.م
        </div>
        <div className="text-muted-foreground border-border/20 flex items-center justify-between border-t pt-3 text-sm">
          {property.area != null && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                straighten
              </span>
              {property.area} م²
            </div>
          )}
          {property.rooms != null && property.rooms > 0 && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bed</span>
              {property.rooms}
            </div>
          )}
          {property.bathrooms != null && property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bathtub</span>
              {property.bathrooms}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

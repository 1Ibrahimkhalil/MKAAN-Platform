import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { TRANSACTION_LABELS, CURRENCY_SYMBOL } from "@/config";
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
        "group border-border/30 shadow-card bg-surface-secondary hover:shadow-card-hover flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-[5px]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute end-3 top-3 flex gap-1.5 sm:end-4 sm:top-4 sm:gap-2">
          <Badge
            variant={property.transactionType === "sale" ? "sale" : "rental"}
            className="rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
          >
            {TRANSACTION_LABELS[property.transactionType]}
          </Badge>
          {property.badge && (
            <Badge
              variant={property.badge === "لقطة" ? "featured" : "new"}
              className="rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
            >
              {property.badge === "لقطة" && "★ "}
              {property.badge === "جديد" && "★ "}
              {property.badge}
            </Badge>
          )}
          {property.featured && !property.badge && (
            <Badge
              variant="featured"
              className="rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
            >
              ★ لقطة
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-[clamp(1rem,2vw,2rem)] transition-colors duration-300 group-hover:bg-white">
        <div className="text-action mb-3 text-[clamp(1rem,1.5vw+0.25rem,1.5rem)] font-extrabold">
          {formatPrice(property.price)}{" "}
          <span className="text-muted-foreground text-[clamp(0.75rem,0.8vw+0.125rem,0.875rem)] font-medium">
            {property.priceSuffix ?? CURRENCY_SYMBOL}
          </span>
        </div>
        <h3 className="text-foreground group-hover:text-action mb-2 line-clamp-1 text-[clamp(0.875rem,1vw+0.125rem,1.125rem)] font-bold transition-colors">
          {property.title}
        </h3>
        <p className="text-muted-foreground mb-4 flex items-center gap-2 text-[clamp(0.75rem,0.8vw+0.125rem,0.875rem)] font-medium">
          <MapPin className="text-action/80 size-4" />
          {property.location}
        </p>
        <div className="border-border/30 text-muted-foreground/90 mt-auto flex flex-wrap justify-between gap-2 border-t pt-4 text-[clamp(0.6875rem,0.7vw+0.125rem,0.8125rem)] font-semibold">
          {property.area != null && property.area > 0 && (
            <span className="bg-surface-tertiary/50 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3">
              <Square className="text-action size-4" />
              {property.area} م²
            </span>
          )}
          {property.rooms != null && property.rooms > 0 && (
            <span className="bg-surface-tertiary/50 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3">
              <BedDouble className="text-action size-4" />
              {property.rooms} غرف
            </span>
          )}
          {property.bathrooms != null && property.bathrooms > 0 && (
            <span className="bg-surface-tertiary/50 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3">
              <Bath className="text-action size-4" />
              {property.bathrooms} حمام
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

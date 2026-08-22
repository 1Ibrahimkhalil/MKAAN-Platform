import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { TRANSACTION_LABELS, CURRENCY_SYMBOL } from "@/config";

export interface PropertyCardData {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  image: string;
  category: string;
  transactionType: "sale" | "rent";
}

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
        "bg-surface-secondary group/card ring-border/50 hover:ring-action/30 flex flex-col overflow-hidden rounded-xl ring-1 transition-all hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
        <div className="absolute end-2 top-2 flex gap-1.5">
          <Badge
            variant="secondary"
            className="bg-surface-secondary/90 backdrop-blur-sm"
          >
            {property.category}
          </Badge>
          <Badge
            variant={
              property.transactionType === "sale" ? "default" : "outline"
            }
            className={cn(
              "backdrop-blur-sm",
              property.transactionType === "sale"
                ? "bg-action/90 text-white"
                : "bg-surface-secondary/90",
            )}
          >
            {TRANSACTION_LABELS[property.transactionType]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p
          className="font-numerals text-foreground text-lg font-bold"
          dir="ltr"
        >
          {formatPrice(property.price)} {CURRENCY_SYMBOL}
        </p>
        <h3 className="text-foreground line-clamp-1 text-sm font-semibold">
          {property.title}
        </h3>
        <div className="text-muted-foreground mt-auto flex items-center gap-1 text-xs">
          <MapPin className="size-3 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
      </div>
    </Link>
  );
}

import { cn } from "@/lib/utils";
import { PropertyCard } from "./property-card";
import type { PropertyCardData } from "../types/property";

export function PropertyGrid({
  properties,
  className,
}: {
  properties: PropertyCardData[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

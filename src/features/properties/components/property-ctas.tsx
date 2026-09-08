import type { PropertyDetail } from "../types/property";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PropertyCTAs({
  property,
  className,
}: {
  property: PropertyDetail;
  className?: string;
}) {
  const whatsappUrl = `https://wa.me/${property.whatsappPhone ?? "+201000000000"}?text=${encodeURIComponent("مرحباً، أنا مهتم بالعقار المعلن عنه على مكّان")}`;
  const telUrl = `tel:${property.phoneNumber ?? "+201000000000"}`;

  return (
    <div
      className={cn(
        "bg-surface-secondary border-border/30 shadow-elevated sticky top-24 rounded-xl border p-6",
        className,
      )}
    >
      <h1 className="text-headline-md text-foreground mb-2 text-2xl font-semibold">
        {property.title}
      </h1>
      <div className="text-muted-foreground mb-6 flex items-center text-base">
        <span className="material-symbols-outlined text-action ml-1">
          location_on
        </span>
        {property.location}
      </div>

      <div className="text-headline-lg text-action mb-6 text-3xl font-bold">
        {property.price.toLocaleString("ar-EG")}{" "}
        <span className="text-muted-foreground text-base font-normal">
          جنيه
        </span>
      </div>

      <div className="bg-surface-container-low mb-8 flex items-center justify-between rounded-lg p-4">
        {property.area != null && (
          <>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-muted-foreground mb-1">
                straighten
              </span>
              <span className="text-label-md font-bold">
                {property.area} م²
              </span>
            </div>
            <div className="bg-border/50 h-8 w-px" />
          </>
        )}
        {property.rooms != null && property.rooms > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-muted-foreground mb-1">
                bed
              </span>
              <span className="text-label-md font-bold">
                {property.rooms} غرف
              </span>
            </div>
            <div className="bg-border/50 h-8 w-px" />
          </>
        )}
        {property.bathrooms != null && property.bathrooms > 0 && (
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-muted-foreground mb-1">
              bathtub
            </span>
            <span className="text-label-md font-bold">
              {property.bathrooms} حمام
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Button
          variant="default"
          className="bg-action hover:bg-action-container text-action-foreground w-full rounded-lg py-3 text-sm font-bold shadow-sm"
        >
          اطلب معاينة
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          فريق MKAAN هيتواصل معاك لترتيب المعاينة
        </p>
        <div className="mt-2 flex gap-4">
          <a
            href={telUrl}
            className="border-action text-action hover:bg-action/5 flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm transition-colors"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            اتصال
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp/10 text-whatsapp hover:bg-whatsapp/20 flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm transition-colors"
          >
            واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

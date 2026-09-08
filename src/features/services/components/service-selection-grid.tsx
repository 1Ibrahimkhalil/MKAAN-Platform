"use client";

import { cn } from "@/lib/utils";
import { SERVICE_REQUEST_SERVICES, type ServiceId } from "../config";

export function ServiceSelectionGrid({
  selected,
  onSelect,
}: {
  selected: ServiceId;
  onSelect: (id: ServiceId) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {SERVICE_REQUEST_SERVICES.map((service) => {
        const active = service.id === selected;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            aria-pressed={active}
            className={cn(
              "bg-surface-secondary hover:border-action/40 group flex flex-col items-start gap-2 rounded-lg border p-4 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
              active
                ? "border-action bg-action/5 ring-action/20 ring-2"
                : "border-input",
            )}
          >
            <span className="flex w-full items-center justify-between">
              <span
                className={cn(
                  "material-symbols-outlined text-action text-3xl transition-transform group-hover:scale-110",
                )}
              >
                {service.icon}
              </span>
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                  active ? "border-action bg-action" : "border-input",
                )}
              >
                {active && (
                  <span className="material-symbols-outlined text-action-foreground text-sm">
                    check
                  </span>
                )}
              </span>
            </span>
            <h3 className="text-primary text-lg font-semibold">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

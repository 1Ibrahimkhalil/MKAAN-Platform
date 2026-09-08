import type { PropertyDetail } from "../types/property";

export function PropertyInfo({ property }: { property: PropertyDetail }) {
  return (
    <div className="flex flex-col gap-12">
      <section className="fade-in-up">
        <h2 className="text-headline-md text-primary border-action mb-4 inline-block border-b-2 pb-2 text-2xl font-semibold">
          عن العقار
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          {property.description}
        </p>
      </section>

      {property.dynamicFields && property.dynamicFields.length > 0 && (
        <section className="fade-in-up">
          <h2 className="text-headline-md text-primary border-action mb-6 inline-block border-b-2 pb-2 text-2xl font-semibold">
            تفاصيل العقار
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {property.dynamicFields.map((field) => (
              <div
                key={field.fieldId}
                className="bg-surface-secondary border-border/30 shadow-elevated rounded-lg border p-4"
              >
                <div className="text-muted-foreground mb-1 text-xs">
                  {field.label}
                </div>
                <div className="text-label-md text-foreground font-bold">
                  {String(field.value)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {property.features && property.features.length > 0 && (
        <section className="fade-in-up">
          <h2 className="text-headline-md text-primary border-action mb-6 inline-block border-b-2 pb-2 text-2xl font-semibold">
            مميزات العقار
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {property.features.map((feature) => (
              <div
                key={feature.icon}
                className="bg-surface-container-low flex flex-col items-center justify-center rounded-lg p-4 text-center"
              >
                <span className="material-symbols-outlined text-action mb-2 text-3xl">
                  {feature.icon}
                </span>
                <span className="text-xs font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="fade-in-up">
        <h2 className="text-headline-md text-primary border-action mb-6 inline-block border-b-2 pb-2 text-2xl font-semibold">
          موقع العقار
        </h2>
        <div className="bg-surface-container-high relative flex h-64 items-center justify-center overflow-hidden rounded-xl">
          <span className="material-symbols-outlined text-muted-foreground text-4xl">
            map
          </span>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          * الموقع التقريبي للعقار
        </p>
      </section>
    </div>
  );
}

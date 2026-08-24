const steps = [
  { icon: "visibility", label: "معاينة العقار" },
  {
    icon: "edit_note",
    label: "تحديد احتياجات الصيانة والتشطيب",
  },
  { icon: "handyman", label: "تنفيذ الأعمال" },
  {
    icon: "check_circle",
    label: "العقار جاهز للبيع أو الإيجار",
  },
];

export function PropertyPrepWorkflow() {
  return (
    <div className="bg-surface-tertiary border-border mt-3 rounded border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-0.5">
              <span className="material-symbols-outlined text-action">
                {step.icon}
              </span>
              <span className="text-foreground w-16 text-center text-xs font-semibold">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className="material-symbols-outlined text-muted-foreground mx-1 text-sm">
                arrow_back
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

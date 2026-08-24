const TRUST_BADGES = [
  {
    icon: "verified_user",
    title: "توثيق ومصداقية",
    description: "جميع العقارات يتم معاينتها لضمان الجودة.",
  },
  {
    icon: "trending_up",
    title: "وصول أسرع للعملاء",
    description: "تسويق احترافي يستهدف المهتمين فعلياً.",
  },
  {
    icon: "support_agent",
    title: "دعم مستمر",
    description: "فريقنا معاك خطوة بخطوة حتى إتمام الصفقة.",
  },
];

export function ListPropertySidebar() {
  return (
    <div className="space-y-6">
      {/* Photography Callout */}
      <div className="bg-primary relative overflow-hidden rounded-xl p-8 text-white shadow-lg">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold md:text-xl">
          التصوير علينا <span className="text-2xl">📸</span>
        </h3>
        <p className="text-sm leading-relaxed text-white/80">
          فريق MKAAN هيعاين العقار ويصوره بشكل واضح واحترافي قبل نشر الإعلان
          لضمان أفضل تقديم لعقارك للمشترين المحتملين.
        </p>
        <span
          className="material-symbols-outlined pointer-events-none absolute -bottom-4 -left-4 opacity-10"
          style={{ fontSize: "150px" }}
        >
          photo_camera
        </span>
      </div>

      {/* Trust Badges */}
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <h4 className="text-primary mb-4 border-b pb-2 text-lg font-semibold">
          ليه تعرض مع MKAAN؟
        </h4>
        <ul className="space-y-4">
          {TRUST_BADGES.map((badge) => (
            <li key={badge.title} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-action mt-1 text-xl">
                {badge.icon}
              </span>
              <div>
                <p className="text-sm font-bold">{badge.title}</p>
                <p className="text-muted-foreground text-xs">
                  {badge.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

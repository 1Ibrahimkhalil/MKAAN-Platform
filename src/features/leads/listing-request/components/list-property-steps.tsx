"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

const STEPS = [
  {
    icon: "description",
    title: "إرسال البيانات",
    description: "إملأ النموذج ببيانات العقار الأساسية",
  },
  {
    icon: "support_agent",
    title: "تواصل MKAAN",
    description: "فريقنا هيتواصل معاك لتأكيد التفاصيل",
  },
  {
    icon: "photo_camera",
    title: "المعاينة والتصوير",
    description: "زيارة احترافية لتصوير العقار",
  },
  {
    icon: "edit_document",
    title: "تجهيز الإعلان",
    description: "صياغة تفاصيل الإعلان بعناية",
  },
  {
    icon: "public",
    title: "نشر العقار",
    description: "عقارك متاح للمشترين/المستأجرين",
  },
];

export function ListPropertySteps() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep < STEPS.length - 1) {
      const timer = setTimeout(() => setActiveStep(activeStep + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  return (
    <RevealOnScroll>
      <section className="bg-surface-secondary mb-16 rounded-xl p-6 shadow-sm md:p-8">
        <h2 className="text-primary mb-8 text-center text-lg font-semibold md:mb-12 md:text-2xl">
          خطوات عرض عقارك
        </h2>

        {/* Mobile: Vertical layout */}
        <div className="relative md:hidden">
          {/* Vertical line */}
          <div className="bg-border absolute top-6 right-6 h-[calc(100%-48px)] w-0.5" />
          {/* Active vertical line */}
          <div
            className="bg-action absolute top-6 right-6 w-0.5 transition-all duration-1000"
            style={{
              height: `${(activeStep / (STEPS.length - 1)) * 100}%`,
            }}
          />

          <div className="space-y-6">
            {STEPS.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={step.title}
                  className="relative flex items-start gap-4"
                >
                  {/* Icon circle */}
                  <div
                    className={cn(
                      "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                      isActive
                        ? "bg-action text-white shadow-md"
                        : "text-muted-foreground border-border bg-card border-2",
                      isCurrent && "scale-110 shadow-lg",
                    )}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {step.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-2">
                    <h3
                      className={cn(
                        "mb-1 text-sm font-bold",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="relative hidden md:block">
          {/* Background line */}
          <div className="bg-border absolute top-6 right-[10%] left-[10%] h-0.5" />

          {/* Active progress line */}
          <div
            className="bg-action absolute top-6 right-[10%] h-0.5 transition-all duration-1000"
            style={{
              width: `${((activeStep + 1) / STEPS.length) * 80}%`,
            }}
          />

          <div className="flex justify-between">
            {STEPS.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-1 flex-col items-center"
                >
                  {/* Icon circle */}
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500",
                      isActive
                        ? "bg-action text-white shadow-md"
                        : "text-muted-foreground border-border bg-card border-2",
                      isCurrent && "scale-110 shadow-lg",
                    )}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {step.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "mb-2 text-sm font-bold",
                      isActive ? "text-primary" : "text-foreground",
                    )}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground max-w-[160px] text-center text-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}

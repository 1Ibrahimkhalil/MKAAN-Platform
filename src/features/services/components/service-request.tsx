"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ServiceSelectionGrid } from "./service-selection-grid";
import { ServiceRequestForm } from "./service-request-form";
import {
  DEFAULT_SERVICE_ID,
  SERVICE_REQUEST_SERVICES,
  type ServiceId,
} from "../config";

export function ServiceRequest({
  initialService,
}: {
  initialService?: ServiceId;
}) {
  const [selectedId, setSelectedId] = useState<ServiceId>(
    initialService ?? DEFAULT_SERVICE_ID,
  );
  const [successOpen, setSuccessOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const service =
    SERVICE_REQUEST_SERVICES.find((item) => item.id === selectedId) ??
    SERVICE_REQUEST_SERVICES[0];

  function handleSelect(id: ServiceId) {
    setSelectedId(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Container className="py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: "الخدمات", href: "/services" },
            { label: service.title },
          ]}
        />

        <div className="mt-4 mb-6 md:mb-8 md:w-2/3">
          <h1 className="text-primary font-headline-lg mb-3 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">
            اطلب خدمة
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
            اختار الخدمة اللي محتاجها، وسيب بياناتك لفريق MKAAN وإحنا هنتواصل
            معاك ونحدد الخطوات المناسبة.
          </p>
        </div>

        <ServiceSelectionGrid selected={selectedId} onSelect={handleSelect} />

        <div ref={formRef} className="mt-6 scroll-mt-20 md:mt-8">
          <ServiceRequestForm
            key={service.id}
            service={service}
            onSuccess={() => setSuccessOpen(true)}
          />
        </div>
      </Container>

      {successOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-request-success-title"
          className="bg-background/90 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="border-border bg-card w-full max-w-md rounded-xl border p-6 text-center shadow-lg md:p-8">
            <div className="bg-action/10 mx-auto mb-4 flex size-20 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-action text-4xl">
                check_circle
              </span>
            </div>
            <h2
              id="service-request-success-title"
              className="text-primary mb-2 text-2xl font-bold"
            >
              تم إرسال طلبك بنجاح 🎉
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed md:text-base">
              شكرًا ليك. فريق MKAAN هيتواصل معاك قريبًا لمراجعة الطلب وتحديد
              الخطوات المناسبة.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                variant="default"
                render={<Link href="/services" />}
                className="bg-action text-action-foreground hover:bg-action-hover w-full py-3 text-sm font-semibold"
              >
                العودة للخدمات
              </Button>
              <Button
                variant="outline"
                render={<Link href="/" />}
                className="w-full py-3 text-sm font-semibold"
              >
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

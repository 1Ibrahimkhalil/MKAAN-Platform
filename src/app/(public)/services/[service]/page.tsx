import type { Metadata } from "next";
import { ServiceRequest } from "@/features/services/components/service-request";
import { SERVICE_IDS, type ServiceId } from "@/features/services/config";

export const metadata: Metadata = {
  title: "اطلب خدمة | مكان",
  description:
    "اختار الخدمة اللي محتاجها وسيب بياناتك لفريق MKAAN وإحنا هنتواصل معاك ونحدد الخطوات المناسبة.",
};

export default async function ServiceRequestPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const initialService = (SERVICE_IDS as readonly string[]).includes(service)
    ? (service as ServiceId)
    : undefined;

  return <ServiceRequest initialService={initialService} />;
}

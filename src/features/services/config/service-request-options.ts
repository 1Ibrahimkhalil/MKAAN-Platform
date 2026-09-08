import { GOVERNORATES } from "@/config/locations";
import { SERVICE_PROPERTY_TYPE_OPTIONS } from "@/config/options";

export type ServiceId = "finishing" | "maintenance" | "prep";

export type ServiceField =
  | {
      type: "select";
      name: string;
      label: string;
      required?: boolean;
      fullWidth?: boolean;
      options: readonly { value: string; label: string }[];
    }
  | {
      type: "number";
      name: string;
      label: string;
      required?: boolean;
      unit?: string;
      placeholder?: string;
      min?: number;
    }
  | {
      type: "textarea";
      name: string;
      label: string;
      required?: boolean;
      fullWidth?: boolean;
      placeholder?: string;
    };

export interface ServiceRequestDefinition {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
  sectionTitle: string;
  fields: ServiceField[];
}

export const SERVICE_IDS = ["finishing", "maintenance", "prep"] as const;

export const DEFAULT_SERVICE_ID: ServiceId = "finishing";

export const SERVICE_LOCATIONS = GOVERNORATES.filter(
  (location) => location.value !== "الكل",
);

export const SERVICE_REQUEST_SERVICES: ServiceRequestDefinition[] = [
  {
    id: "finishing",
    title: "التشطيبات",
    description: "تشطيب متكامل أو جزئي بأفضل الخامات.",
    icon: "format_paint",
    sectionTitle: "طلب خدمة التشطيبات",
    fields: [
      {
        type: "select",
        name: "propertyType",
        label: "نوع العقار",
        required: true,
        options: SERVICE_PROPERTY_TYPE_OPTIONS,
      },
      {
        type: "select",
        name: "location",
        label: "المكان",
        required: true,
        options: SERVICE_LOCATIONS,
      },
      {
        type: "select",
        name: "condition",
        label: "حالة العقار",
        required: true,
        options: [
          { value: "half", label: "نصف تشطيب" },
          { value: "brick", label: "على الطوب" },
        ],
      },
      {
        type: "select",
        name: "finishingType",
        label: "نوع التشطيب",
        required: true,
        options: [
          { value: "full", label: "تشطيب كامل" },
          { value: "partial", label: "تشطيب جزئي" },
        ],
      },
      {
        type: "number",
        name: "area",
        label: "المساحة",
        required: true,
        unit: "م²",
        placeholder: "مثال: 120",
        min: 1,
      },
      {
        type: "textarea",
        name: "details",
        label: "تفاصيل التشطيب",
        placeholder: "اكتب أي تفاصيل إضافية عن التشطيب المطلوب...",
        fullWidth: true,
      },
    ],
  },
  {
    id: "maintenance",
    title: "الصيانة",
    description: "حلول سريعة لأعطال الكهرباء والسباكة وغيرها.",
    icon: "build",
    sectionTitle: "طلب خدمة الصيانة",
    fields: [
      {
        type: "select",
        name: "serviceType",
        label: "نوع الخدمة",
        required: true,
        options: [
          { value: "electrical", label: "كهرباء" },
          { value: "plumbing", label: "سباكة" },
          { value: "ac", label: "تكييف" },
          { value: "general", label: "صيانة عامة" },
          { value: "other", label: "أخرى" },
        ],
      },
      {
        type: "select",
        name: "propertyType",
        label: "نوع العقار",
        required: true,
        options: SERVICE_PROPERTY_TYPE_OPTIONS,
      },
      {
        type: "select",
        name: "location",
        label: "المكان",
        required: true,
        options: SERVICE_LOCATIONS,
      },
      {
        type: "textarea",
        name: "details",
        label: "وصف المشكلة",
        required: true,
        placeholder: "اكتب وصفًا واضحًا للمشكلة المطلوب إصلاحها...",
        fullWidth: true,
      },
    ],
  },
  {
    id: "prep",
    title: "تجهيز العقار للبيع أو الإيجار",
    description: "تهيئة عقارك لزيادة قيمته التسويقية.",
    icon: "real_estate_agent",
    sectionTitle: "طلب تجهيز العقار",
    fields: [
      {
        type: "select",
        name: "targetTransaction",
        label: "المعاملة المستهدفة",
        required: true,
        options: [
          { value: "sale", label: "بيع" },
          { value: "rent", label: "إيجار" },
        ],
      },
      {
        type: "select",
        name: "propertyType",
        label: "نوع العقار",
        required: true,
        options: SERVICE_PROPERTY_TYPE_OPTIONS,
      },
      {
        type: "select",
        name: "location",
        label: "المكان",
        required: true,
        options: SERVICE_LOCATIONS,
      },
      {
        type: "select",
        name: "condition",
        label: "الحالة الحالية",
        required: true,
        options: [
          { value: "maintenance", label: "يحتاج صيانة" },
          { value: "finishing", label: "يحتاج تشطيب" },
          { value: "ready", label: "جاهز مع تحسينات" },
        ],
      },
      {
        type: "textarea",
        name: "details",
        label: "تفاصيل إضافية",
        placeholder: "اكتب أي تفاصيل تساعد الفريق في تجهيز العقار...",
        fullWidth: true,
      },
    ],
  },
];

export const SERVICE_CONTACT_METHODS = [
  { value: "call", label: "مكالمة" },
  { value: "whatsapp", label: "واتساب" },
] as const;

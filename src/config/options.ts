export const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "شقة" },
  { value: "villa", label: "فيلا" },
  { value: "house", label: "بيت" },
  { value: "duplex", label: "دوبلكس" },
] as const;

export const CATEGORIES = [
  { value: "residential", label: "سكني" },
  { value: "commercial", label: "تجاري" },
  { value: "administrative", label: "إداري" },
  { value: "medical", label: "طبي" },
  { value: "land", label: "أرض" },
] as const;

export const FINISHING_STATUS = [
  { value: "any", label: "أي حالة" },
  { value: "super_lux", label: "سوبر لوكس" },
  { value: "lux", label: "لوكس" },
  { value: "semi", label: "نصف تشطيب" },
  { value: "red_brick", label: "طوب أحمر" },
] as const;

export const TRANSACTION_OPTIONS = [
  { value: "sale", label: "للبيع" },
  { value: "rent", label: "للإيجار" },
] as const;

export const SERVICE_PROPERTY_TYPE_OPTIONS = PROPERTY_TYPE_OPTIONS.filter(
  (option) =>
    option.value === "apartment" ||
    option.value === "villa" ||
    option.value === "house",
);

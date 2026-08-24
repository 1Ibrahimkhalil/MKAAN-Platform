export const REQUEST_PROPERTY_TRANSACTION_TYPES = [
  { value: "buy", label: "شراء", icon: "key" },
  { value: "rent", label: "إيجار", icon: "calendar_month" },
] as const;

export const CATEGORIES = [
  { value: "", label: "اختر التصنيف..." },
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

export const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "شقة" },
  { value: "house", label: "بيت" },
  { value: "villa", label: "فيلا" },
  { value: "duplex", label: "دوبلكس" },
] as const;

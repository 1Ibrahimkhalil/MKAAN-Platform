export const LOCATIONS = [
  { value: "shibin", label: "شبين الكوم" },
  { value: "quesna", label: "قويسنا" },
  { value: "bagour", label: "الباجور" },
  { value: "villages", label: "القرى" },
] as const;

export const TRANSACTION_TYPES = [
  { value: "sale", label: "بيع", icon: "sell" },
  { value: "rent", label: "إيجار", icon: "calendar_month" },
] as const;

export const CHECKBOXES = [
  { id: "finished", label: "تشطيب كامل" },
  { id: "furnished", label: "مفروش" },
  { id: "elevator", label: "يوجد مصعد" },
  { id: "parking", label: "موقف سيارات" },
] as const;

export const CONTACT_METHODS = [
  { value: "call", label: "مكالمة هاتفية" },
  { value: "whatsapp", label: "واتساب" },
] as const;

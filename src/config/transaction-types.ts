export const TRANSACTION_TYPES = [
  { value: "sale", label: "للبيع" },
  { value: "rent", label: "للإيجار" },
] as const;

export const TRANSACTION_LABELS: Record<string, string> = {
  sale: "للبيع",
  rent: "للإيجار",
};

export const HERO_TRANSACTIONS = [
  { value: "الكل", label: "بيع / إيجار" },
  { value: "للبيع", label: "للبيع" },
  { value: "للإيجار", label: "للإيجار" },
  { value: "كمبوند-جديد", label: "كمبوند جديد" },
  { value: "إعادة-بيع", label: "إعادة بيع" },
];

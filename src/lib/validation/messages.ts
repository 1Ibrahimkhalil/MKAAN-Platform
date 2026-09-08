export const VALIDATION_MESSAGES = {
  required: "هذا الحقل مطلوب",
  invalidPhone: "من فضلك أدخل رقم هاتف صحيح",
  invalidSelect: "من فضلك اختر قيمة صحيحة",
  invalidNumber: "من فضلك أدخل رقمًا صحيحًا",
  invalidName: "من فضلك أدخل اسمًا صحيحًا",
  minNumber: (min: number) => `يجب ألا يقل الرقم عن ${min}`,
  maxLength: (max: number) => `يجب ألا يزيد النص عن ${max} حرفًا`,
  priceMinMax: "الحد الأدنى للسعر يجب ألا يزيد عن الحد الأقصى",
} as const;

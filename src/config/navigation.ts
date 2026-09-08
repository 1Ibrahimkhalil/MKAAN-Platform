import { ROUTES } from "./routes";

export const NAV_LINKS = [
  { href: ROUTES.HOME, label: "الرئيسية" },
  { href: ROUTES.PROPERTIES, label: "العقارات" },
  { href: ROUTES.SERVICES, label: "الخدمات" },
  { href: ROUTES.ABOUT, label: "عن مكان" },
];

export const FOOTER_PROPERTY_LINKS = [
  { href: ROUTES.PROPERTIES, label: "كل العقارات" },
  { href: `${ROUTES.PROPERTIES}?type=sale`, label: "للبيع" },
  { href: `${ROUTES.PROPERTIES}?type=rent`, label: "للإيجار" },
  { href: ROUTES.REQUEST_PROPERTY, label: "اطلب عقار" },
  { href: ROUTES.LIST_PROPERTY, label: "اعرض عقارك" },
];

export const FOOTER_SERVICE_LINKS = [
  { href: ROUTES.SERVICE_FINISHING, label: "التشطيبات" },
  { href: ROUTES.SERVICE_MAINTENANCE, label: "الصيانة" },
  { href: ROUTES.SERVICE_PREP, label: "تجهيز العقار للبيع أو الإيجار" },
];

export const FOOTER_LEGAL_LINKS = [
  { href: ROUTES.PRIVACY, label: "سياسة الخصوصية" },
  { href: ROUTES.TERMS, label: "الشروط والأحكام" },
];

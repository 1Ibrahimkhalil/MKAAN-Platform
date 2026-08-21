export interface FeaturedProperty {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  image: string;
  category: string;
  transactionType: "sale" | "rent";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export const MOCK_FEATURED_PROPERTIES: FeaturedProperty[] = [
  {
    id: "1",
    slug: "apartment-fifth-settlement",
    title: "شقة فاخرة في التجمع الخامس",
    location: "القاهرة, التجمع الخامس",
    price: 4500000,
    image: "https://picsum.photos/seed/mkaan1/800/600",
    category: "شقة",
    transactionType: "sale",
  },
  {
    id: "2",
    slug: "villa-sheikh-zayed",
    title: "فيلا حديثة في الشيخ زايد",
    location: "الجيزة, الشيخ زايد",
    price: 12000000,
    image: "https://picsum.photos/seed/mkaan2/800/600",
    category: "فيلا",
    transactionType: "sale",
  },
  {
    id: "3",
    slug: "apartment-madinet-nasr",
    title: "شقة عائلية في مدينة نصر",
    location: "القاهرة, مدينة نصر",
    price: 2800000,
    image: "https://picsum.photos/seed/mkaan3/800/600",
    category: "شقة",
    transactionType: "sale",
  },
  {
    id: "4",
    slug: "duplex-smouha",
    title: "دوبلكس في سموحة",
    location: "الإسكندرية, سموحة",
    price: 6500000,
    image: "https://picsum.photos/seed/mkaan4/800/600",
    category: "دوبلكس",
    transactionType: "sale",
  },
  {
    id: "5",
    slug: "studio-downtown",
    title: "استوديو في وسط البلد",
    location: "القاهرة, وسط البلد",
    price: 15000,
    image: "https://picsum.photos/seed/mkaan5/800/600",
    category: "استوديو",
    transactionType: "rent",
  },
  {
    id: "6",
    slug: "apartment-nile-view",
    title: "شقة بإطلالة على النيل",
    location: "الجيزة, الدقي",
    price: 3200000,
    image: "https://picsum.photos/seed/mkaan6/800/600",
    category: "شقة",
    transactionType: "sale",
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: "finishing",
    title: "التشطيب",
    description: "خدمات تشطيب عقاري متكاملة بأعلى معايير الجودة",
    href: "/services/finishing",
    icon: "Paintbrush",
  },
  {
    id: "maintenance",
    title: "الصيانة",
    description: "صيانة دورية وإصلاحات سريعة لعقارك",
    href: "/services/maintenance",
    icon: "Wrench",
  },
  {
    id: "preparation",
    title: "تحضير العقار للبيع/الإيجار",
    description: "إعداد عقارك للبيع أو الإيجار بأفضل صورة",
    href: "/services/preparation",
    icon: "Home",
  },
];

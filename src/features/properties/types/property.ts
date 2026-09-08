export interface PropertyCardData {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  priceSuffix?: string;
  image: string;
  category: string;
  transactionType: "sale" | "rent";
  featured?: boolean;
  badge?: "لقطة" | "جديد";
  rooms?: number;
  bathrooms?: number;
  area?: number;
  floor?: number;
  furnished?: boolean;
}

export interface PropertyDetail extends PropertyCardData {
  description: string;
  images: string[];
  dynamicFields?: DynamicFieldValue[];
  features?: PropertyFeature[];
  yearBuilt?: number;
  floor?: number;
  propertyCondition?: string;
  whatsappPhone?: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface PropertyFeature {
  icon: string;
  label: string;
}

export interface DynamicFieldValue {
  fieldId: string;
  label: string;
  value: string | number | boolean;
}

export interface FilterState {
  search: string;
  category: string;
  transactionType: string;
  location: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  dynamicFilters: Record<string, string | number | boolean>;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PropertySearchParams {
  filters: FilterState;
  sort: string;
  page: number;
  pageSize: number;
}

export interface PropertySearchResult {
  properties: PropertyCardData[];
  total: number;
  hasMore: boolean;
  page: number;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "",
  transactionType: "",
  location: "",
  priceMin: "",
  priceMax: "",
  bedrooms: "",
  dynamicFilters: {},
};

export const PAGE_SIZE = 9;

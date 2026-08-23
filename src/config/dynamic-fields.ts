export type FieldType = "select" | "number" | "boolean";

export interface FieldDefinition {
  fieldId: string;
  label: string;
  type: FieldType;
  filterable: boolean;
  displayable: boolean;
  options?: readonly { value: string; label: string }[];
  order: number;
}

export interface CategoryFieldMapping {
  category: string;
  label: string;
  fields: readonly FieldDefinition[];
}

const BATHROOMS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" },
] as const;

const FLOOR_OPTIONS = [
  { value: "0", label: "طابق أرضي" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10+" },
] as const;

const FURNISHED_OPTIONS = [
  { value: "yes", label: "نعم" },
  { value: "no", label: "لا" },
] as const;

const COMMERCIAL_TYPE_OPTIONS = [
  { value: "محل تجاري", label: "محل تجاري" },
  { value: "مكتب", label: "مكتب" },
  { value: "مطعم", label: "مطعم" },
  { value: "كافيه", label: "كافيه" },
  { value: "صيدلية", label: "صيدلية" },
  { value: "عيادة", label: "عيادة" },
] as const;

const LAND_TYPE_OPTIONS = [
  { value: "أرض سكنية", label: "سكنية" },
  { value: "أرض تجارية", label: "تجارية" },
  { value: "أرض زراعية", label: "زراعةية" },
  { value: "أرض صناعية", label: "صناعية" },
] as const;

export const CATEGORY_FIELD_MAPPINGS: readonly CategoryFieldMapping[] = [
  {
    category: "سكني",
    label: "سكني",
    fields: [
      {
        fieldId: "bedrooms",
        label: "غرف النوم",
        type: "select",
        filterable: true,
        displayable: true,
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4+", label: "4+" },
        ],
        order: 1,
      },
      {
        fieldId: "bathrooms",
        label: "دورات المياه",
        type: "select",
        filterable: true,
        displayable: true,
        options: BATHROOMS_OPTIONS,
        order: 2,
      },
      {
        fieldId: "area",
        label: "المساحة (م²)",
        type: "number",
        filterable: true,
        displayable: true,
        order: 3,
      },
      {
        fieldId: "floor",
        label: "الدور",
        type: "select",
        filterable: true,
        displayable: true,
        options: FLOOR_OPTIONS,
        order: 4,
      },
      {
        fieldId: "furnished",
        label: "مفروشة",
        type: "boolean",
        filterable: true,
        displayable: true,
        options: FURNISHED_OPTIONS,
        order: 5,
      },
    ],
  },
  {
    category: "تجاري",
    label: "تجاري",
    fields: [
      {
        fieldId: "commercialType",
        label: "نوع النشاط",
        type: "select",
        filterable: true,
        displayable: true,
        options: COMMERCIAL_TYPE_OPTIONS,
        order: 1,
      },
      {
        fieldId: "area",
        label: "المساحة (م²)",
        type: "number",
        filterable: true,
        displayable: true,
        order: 2,
      },
      {
        fieldId: "floor",
        label: "الدور",
        type: "select",
        filterable: true,
        displayable: true,
        options: FLOOR_OPTIONS,
        order: 3,
      },
    ],
  },
  {
    category: "إداري",
    label: "إداري",
    fields: [
      {
        fieldId: "area",
        label: "المساحة (م²)",
        type: "number",
        filterable: true,
        displayable: true,
        order: 1,
      },
      {
        fieldId: "floor",
        label: "الدور",
        type: "select",
        filterable: true,
        displayable: true,
        options: FLOOR_OPTIONS,
        order: 2,
      },
    ],
  },
  {
    category: "أرض",
    label: "أرض",
    fields: [
      {
        fieldId: "area",
        label: "المساحة (م²)",
        type: "number",
        filterable: true,
        displayable: true,
        order: 1,
      },
      {
        fieldId: "landType",
        label: "نوع الأرض",
        type: "select",
        filterable: true,
        displayable: true,
        options: LAND_TYPE_OPTIONS,
        order: 2,
      },
    ],
  },
] as const;

export function getCategoryFields(
  category: string,
): CategoryFieldMapping | undefined {
  return CATEGORY_FIELD_MAPPINGS.find((m) => m.category === category);
}

export function getFilterableFields(category: string): FieldDefinition[] {
  const mapping = getCategoryFields(category);
  if (!mapping) return [];
  return mapping.fields
    .filter((f) => f.filterable)
    .sort((a, b) => a.order - b.order);
}

export function getFieldLabel(
  category: string,
  fieldId: string,
): string | undefined {
  const mapping = getCategoryFields(category);
  return mapping?.fields.find((f) => f.fieldId === fieldId)?.label;
}

export function getCategoryFieldIds(category: string): string[] {
  const mapping = getCategoryFields(category);
  if (!mapping) return [];
  return mapping.fields.map((f) => f.fieldId);
}

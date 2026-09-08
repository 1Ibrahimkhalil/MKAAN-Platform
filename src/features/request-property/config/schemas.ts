import { z } from "zod";
import {
  nameSchema,
  phoneSchema,
  selectValue,
  optionalNumber,
  optionalText,
} from "@/lib/validation";
import { GOVERNORATES } from "@/config/locations";
import {
  CATEGORIES,
  FINISHING_STATUS,
  PROPERTY_TYPE_OPTIONS,
} from "@/config/options";
import { REQUEST_PROPERTY_TRANSACTION_TYPES } from "./request-property-options";

export const requestPropertySchema = z.object({
  transactionType: selectValue(REQUEST_PROPERTY_TRANSACTION_TYPES),
  location: selectValue(GOVERNORATES),
  classification: selectValue(CATEGORIES),
  propertyType: selectValue(PROPERTY_TYPE_OPTIONS),
  budgetMin: optionalNumber(),
  budgetMax: optionalNumber(),
  area: optionalNumber(),
  finishing: selectValue(FINISHING_STATUS),
  furnished: z.boolean(),
  details: optionalText(),
  name: nameSchema,
  phone: phoneSchema,
});

export type RequestPropertyFormValues = z.infer<typeof requestPropertySchema>;

import { z } from "zod";
import {
  nameSchema,
  phoneSchema,
  selectValue,
  requiredNumber,
  optionalText,
} from "@/lib/validation";
import { CATEGORIES } from "@/config/options";
import { CONTACT_METHODS, LOCATIONS, TRANSACTION_TYPES } from "./index";

export const listPropertySchema = z.object({
  transactionType: selectValue(TRANSACTION_TYPES),
  location: selectValue(LOCATIONS),
  classification: selectValue(CATEGORIES),
  area: requiredNumber(),
  price: requiredNumber(),
  amenities: z.array(z.string()),
  description: optionalText(),
  name: nameSchema,
  phone: phoneSchema,
  contactMethod: selectValue(CONTACT_METHODS),
});

export type ListPropertyFormValues = z.infer<typeof listPropertySchema>;

import { z } from "zod";
import {
  nameSchema,
  phoneSchema,
  selectValue,
  requiredSelectValue,
  optionalNumber,
  requiredNumber,
  requiredText,
  optionalText,
} from "@/lib/validation";
import {
  SERVICE_CONTACT_METHODS,
  type ServiceRequestDefinition,
} from "./service-request-options";

export interface ServiceRequestFormValues {
  [key: string]: string;
  name: string;
  phone: string;
  contactMethod: string;
}

export function buildServiceRequestSchema(service: ServiceRequestDefinition) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of service.fields) {
    switch (field.type) {
      case "select":
        shape[field.name] = field.required
          ? requiredSelectValue(field.options)
          : selectValue(field.options);
        break;
      case "number":
        shape[field.name] = field.required
          ? requiredNumber(field.min ?? 1)
          : optionalNumber(field.min);
        break;
      case "textarea":
        shape[field.name] = field.required ? requiredText() : optionalText();
        break;
    }
  }

  return z.object({
    ...shape,
    name: nameSchema,
    phone: phoneSchema,
    contactMethod: selectValue(SERVICE_CONTACT_METHODS),
  }) as z.ZodType<ServiceRequestFormValues, ServiceRequestFormValues>;
}

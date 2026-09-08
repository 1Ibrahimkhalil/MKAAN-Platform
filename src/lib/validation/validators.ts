import { z } from "zod";
import { VALIDATION_MESSAGES as msg } from "./messages";

export interface SelectOptionValue {
  value: string;
  label: string;
}

export const phoneSchema = z
  .string()
  .min(1, msg.required)
  .regex(/^01[0-9]{9}$/, msg.invalidPhone);

export const nameSchema = z
  .string()
  .min(1, msg.required)
  .refine((value) => value.trim().length >= 2, { message: msg.invalidName });

export function requiredText(maxLength?: number) {
  let schema = z.string().min(1, msg.required);
  if (maxLength !== undefined) {
    schema = schema.max(maxLength, msg.maxLength(maxLength));
  }
  return schema;
}

export function optionalText(maxLength?: number) {
  if (maxLength === undefined) return z.string();
  return z.string().max(maxLength, msg.maxLength(maxLength));
}

/** Allows an empty string (no selection) or a value present in the options list. */
export function selectValue(options: readonly SelectOptionValue[]) {
  const values = new Set(options.map((option) => option.value));
  return z.string().refine((value) => value === "" || values.has(value), {
    message: msg.invalidSelect,
  });
}

/** Requires a non-empty selection from the options list. */
export function requiredSelectValue(options: readonly SelectOptionValue[]) {
  const values = new Set(options.map((option) => option.value));
  return z
    .string()
    .min(1, msg.required)
    .refine((value) => values.has(value), { message: msg.invalidSelect });
}

/** Empty string allowed; otherwise must be a number at or above the optional minimum. */
export function optionalNumber(min?: number) {
  let schema = z
    .string()
    .refine((value) => value === "" || !Number.isNaN(Number(value)), {
      message: msg.invalidNumber,
    });
  if (min !== undefined) {
    schema = schema.refine((value) => value === "" || Number(value) >= min, {
      message: msg.minNumber(min),
    });
  }
  return schema;
}

/** Requires a numeric value at or above the minimum (default 1). */
export function requiredNumber(min = 1) {
  return z
    .string()
    .min(1, msg.required)
    .refine((value) => !Number.isNaN(Number(value)), {
      message: msg.invalidNumber,
    })
    .refine((value) => Number(value) >= min, { message: msg.minNumber(min) });
}

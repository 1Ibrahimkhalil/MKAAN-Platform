"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  SERVICE_CONTACT_METHODS,
  type ServiceField,
  type ServiceRequestDefinition,
} from "../config";
import {
  buildServiceRequestSchema,
  type ServiceRequestFormValues,
} from "../config/schemas";

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="material-symbols-outlined text-action">{icon}</span>
      <h2 className="text-primary text-lg font-semibold md:text-xl">{title}</h2>
    </div>
  );
}

export function ServiceRequestForm({
  service,
  onSuccess,
}: {
  service: ServiceRequestDefinition;
  onSuccess: () => void;
}) {
  const defaultValues = useMemo(() => {
    const values: Record<string, string> = {};
    for (const field of service.fields) {
      values[field.name] = "";
    }
    return {
      ...values,
      name: "",
      phone: "",
      contactMethod: "whatsapp",
    } as ServiceRequestFormValues;
  }, [service]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(buildServiceRequestSchema(service)),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(data: ServiceRequestFormValues) {
    void data;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  }

  return (
    <section className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
      <div className="from-action to-accent absolute top-0 right-0 left-0 h-1 bg-gradient-to-l" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 p-4 md:p-8"
      >
        <div className="flex flex-col gap-4">
          <SectionHeader icon={service.icon} title={service.sectionTitle} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {service.fields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                htmlFor={field.type === "select" ? undefined : field.name}
                required={field.required}
                error={errors[field.name]?.message}
                className={cn(
                  "fullWidth" in field && field.fullWidth && "md:col-span-2",
                )}
              >
                <ServiceFieldControl
                  field={field}
                  register={register}
                  control={control}
                  error={errors[field.name]?.message}
                />
              </FormField>
            ))}
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex flex-col gap-4">
          <SectionHeader icon="contact_mail" title="بيانات التواصل" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="الاسم"
              htmlFor="name"
              required
              error={errors.name?.message}
            >
              <Input
                type="text"
                id="name"
                placeholder="اكتب اسمك"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
            </FormField>

            <FormField
              label="رقم الموبايل"
              htmlFor="phone"
              required
              error={errors.phone?.message}
            >
              <Input
                type="tel"
                id="phone"
                placeholder="01XXXXXXXXX"
                autoComplete="tel"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                dir="ltr"
                className="text-left"
                {...register("phone")}
              />
            </FormField>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label className="gap-1">أفضل وسيلة للتواصل</Label>
              <Controller
                control={control}
                name="contactMethod"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_CONTACT_METHODS.map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => field.onChange(method.value)}
                        aria-pressed={field.value === method.value}
                        className={cn(
                          "rounded-full border px-6 py-2 text-sm font-medium transition-colors",
                          field.value === method.value
                            ? "border-action bg-action text-action-foreground shadow-sm"
                            : "border-input text-muted-foreground hover:border-action hover:text-action bg-transparent",
                        )}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-start">
          <SubmitButton
            loading={loading}
            className="bg-action text-action-foreground hover:bg-action-hover w-full gap-2 px-12 py-4 text-base font-bold shadow-md md:w-auto"
          >
            <span>إرسال الطلب</span>
            <span className="material-symbols-outlined text-lg">send</span>
          </SubmitButton>
          <p className="text-muted-foreground text-center text-xs md:text-start">
            بعد إرسال الطلب، فريق MKAAN هيتواصل معاك لاستكمال التفاصيل وتحديد
            الخطوات المناسبة.
          </p>
        </div>
      </form>
    </section>
  );
}

function ServiceFieldControl({
  field,
  register,
  control,
  error,
}: {
  field: ServiceField;
  register: ReturnType<typeof useForm<ServiceRequestFormValues>>["register"];
  control: ReturnType<typeof useForm<ServiceRequestFormValues>>["control"];
  error?: string;
}) {
  if (field.type === "select") {
    return (
      <Controller
        control={control}
        name={field.name}
        render={({ field: selectField }) => (
          <Select
            value={selectField.value}
            onValueChange={(v) => selectField.onChange(v ?? "")}
            options={field.options}
          >
            <SelectTrigger className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder={`اختر ${field.label}...`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    );
  }

  if (field.type === "number") {
    return (
      <div className="relative">
        {field.unit && (
          <span className="text-muted-foreground pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm font-bold">
            {field.unit}
          </span>
        )}
        <Input
          type="number"
          min={field.min}
          id={field.name}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
          dir={field.unit ? "ltr" : undefined}
          className={cn(field.unit && "pe-12 text-left")}
          {...register(field.name)}
        />
      </div>
    );
  }

  return (
    <Textarea
      id={field.name}
      rows={3}
      placeholder={field.placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${field.name}-error` : undefined}
      className="resize-y"
      {...register(field.name)}
    />
  );
}

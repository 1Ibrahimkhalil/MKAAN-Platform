"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { FormError } from "@/components/ui/form-error";
import { TransactionTypeTile } from "./transaction-type-tile";
import { REQUEST_PROPERTY_TRANSACTION_TYPES } from "../config";
import {
  requestPropertySchema,
  type RequestPropertyFormValues,
} from "../config/schemas";
import { GOVERNORATES } from "@/config/locations";
import {
  CATEGORIES,
  FINISHING_STATUS,
  PROPERTY_TYPE_OPTIONS,
} from "@/config/options";

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="material-symbols-outlined text-action">{icon}</span>
      <h2 className="text-primary text-lg font-semibold md:text-xl">{title}</h2>
    </div>
  );
}

export function RequestPropertyForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPropertyFormValues>({
    resolver: zodResolver(requestPropertySchema),
    defaultValues: {
      transactionType: "buy",
      location: "",
      classification: "",
      propertyType: "apartment",
      budgetMin: "",
      budgetMax: "",
      area: "",
      finishing: "any",
      furnished: false,
      details: "",
      name: "",
      phone: "",
    },
  });

  function onSubmit(data: RequestPropertyFormValues) {
    void data;
  }

  const budgetError = errors.budgetMin?.message ?? errors.budgetMax?.message;

  return (
    <Container className="py-8">
      <section className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
        <div className="from-action to-accent absolute top-0 right-0 left-0 h-1 bg-gradient-to-l" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6 p-4 md:p-8"
        >
          {/* Section 1: Basic Info */}
          <div className="flex flex-col gap-4">
            <SectionHeader icon="info" title="المعلومات الأساسية" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Transaction Type Tiles */}
              <fieldset className="flex flex-col gap-3 md:col-span-2">
                <legend className="text-muted-foreground mb-1 text-sm font-medium">
                  نوع المعاملة
                </legend>
                <Controller
                  control={control}
                  name="transactionType"
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-4">
                      {REQUEST_PROPERTY_TRANSACTION_TYPES.map((t) => (
                        <TransactionTypeTile
                          key={t.value}
                          name={field.name}
                          value={t.value}
                          label={t.label}
                          icon={t.icon}
                          checked={field.value === t.value}
                          onChange={field.onChange}
                        />
                      ))}
                    </div>
                  )}
                />
              </fieldset>

              {/* Location */}
              <FormField
                label="المنطقة المفضلة"
                error={errors.location?.message}
              >
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v ?? "")}
                      options={GOVERNORATES}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.location}
                      >
                        <SelectValue placeholder="اختر المنطقة..." />
                      </SelectTrigger>
                      <SelectContent>
                        {GOVERNORATES.map((g) => (
                          <SelectItem key={g.value} value={g.value}>
                            {g.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              {/* Classification */}
              <FormField label="التصنيف" error={errors.classification?.message}>
                <Controller
                  control={control}
                  name="classification"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v ?? "")}
                      options={CATEGORIES}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.classification}
                      >
                        <SelectValue placeholder="اختر التصنيف..." />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>
          </div>

          <hr className="border-border" />

          {/* Section 2: Property Details */}
          <div className="flex flex-col gap-4">
            <SectionHeader icon="home_work" title="تفاصيل العقار" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Property Type */}
              <FormField
                label="نوع العقار"
                error={errors.propertyType?.message}
              >
                <Controller
                  control={control}
                  name="propertyType"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v ?? "apartment")}
                      options={PROPERTY_TYPE_OPTIONS}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.propertyType}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPE_OPTIONS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              {/* Budget Range */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label htmlFor="budgetMin" className="justify-between">
                  <span>الميزانية المتوقعة</span>
                  <span className="text-muted-foreground text-xs">
                    (جنيه مصري)
                  </span>
                </Label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      payments
                    </span>
                    <Input
                      type="number"
                      id="budgetMin"
                      placeholder="من"
                      aria-invalid={!!errors.budgetMin}
                      aria-describedby={
                        errors.budgetMin ? "budgetMin-error" : undefined
                      }
                      className="h-auto py-2.5 pr-9 pl-3"
                      {...register("budgetMin")}
                    />
                  </div>
                  <span className="text-muted-foreground font-bold">-</span>
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      payments
                    </span>
                    <Input
                      type="number"
                      id="budgetMax"
                      placeholder="إلى"
                      aria-invalid={!!errors.budgetMax}
                      aria-describedby={
                        errors.budgetMax ? "budgetMax-error" : undefined
                      }
                      className="h-auto py-2.5 pr-9 pl-3"
                      {...register("budgetMax")}
                    />
                  </div>
                </div>
                {budgetError && (
                  <FormError message={budgetError} className="mt-1" />
                )}
              </div>

              {/* Area */}
              <FormField
                label="المساحة (متر مربع)"
                htmlFor="area"
                error={errors.area?.message}
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    square_foot
                  </span>
                  <Input
                    type="number"
                    id="area"
                    placeholder="الحد الأدنى"
                    aria-invalid={!!errors.area}
                    aria-describedby={errors.area ? "area-error" : undefined}
                    className="h-auto py-2.5 pr-9 pl-3"
                    {...register("area")}
                  />
                </div>
              </FormField>

              {/* Finishing Status */}
              <FormField label="حالة التشطيب" error={errors.finishing?.message}>
                <Controller
                  control={control}
                  name="finishing"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) => field.onChange(v ?? "any")}
                      options={FINISHING_STATUS}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.finishing}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FINISHING_STATUS.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              {/* Furnished Checkbox */}
              <div className="flex items-center pt-6">
                <Controller
                  control={control}
                  name="furnished"
                  render={({ field }) => (
                    <label className="group flex cursor-pointer items-center gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                      <span className="text-foreground group-hover:text-action text-sm transition-colors">
                        مفروش؟
                      </span>
                    </label>
                  )}
                />
              </div>
            </div>

            {/* Additional Details */}
            <FormField
              label="تفاصيل إضافية"
              htmlFor="details"
              error={errors.details?.message}
            >
              <Textarea
                id="details"
                placeholder="اكتب أي متطلبات خاصة (مثال: قريب من المدارس، دور أرضي، إلخ...)"
                rows={3}
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? "details-error" : undefined}
                className="resize-y"
                {...register("details")}
              />
            </FormField>
          </div>

          <hr className="border-border" />

          {/* Section 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <SectionHeader icon="contact_mail" title="بيانات التواصل" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Full Name */}
              <FormField
                label="الاسم بالكامل"
                htmlFor="name"
                required
                error={errors.name?.message}
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    person
                  </span>
                  <Input
                    type="text"
                    id="name"
                    placeholder="أدخل اسمك"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="h-auto py-2.5 pr-9 pl-3"
                    {...register("name")}
                  />
                </div>
              </FormField>

              {/* Phone */}
              <FormField
                label="رقم الموبايل"
                htmlFor="phone"
                required
                error={errors.phone?.message}
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    call
                  </span>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="01X XXXX XXXX"
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    dir="ltr"
                    className="h-auto py-2.5 pr-9 pl-3 text-left"
                    {...register("phone")}
                  />
                </div>
              </FormField>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-action text-action-foreground hover:bg-action-hover w-full gap-2 px-8 py-6 text-base font-bold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 md:w-auto md:px-12 md:py-5"
            >
              <span>اطلب عقارك الآن</span>
              <span className="material-symbols-outlined">send</span>
            </Button>
          </div>
        </form>
      </section>
    </Container>
  );
}

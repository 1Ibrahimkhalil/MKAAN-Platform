"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
import { TransactionTypeTile } from "@/features/leads/property-request/components/transaction-type-tile";
import { CATEGORIES } from "@/config/options";
import {
  listPropertySchema,
  type ListPropertyFormValues,
} from "../config/schemas";
import {
  CHECKBOXES,
  CONTACT_METHODS,
  LOCATIONS,
  TRANSACTION_TYPES,
} from "../config";

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      <span className="material-symbols-outlined text-action">{icon}</span>
      <h3 className="text-primary text-lg font-semibold md:text-xl">{title}</h3>
    </div>
  );
}

export function ListPropertyForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ListPropertyFormValues>({
    resolver: zodResolver(listPropertySchema),
    defaultValues: {
      transactionType: "sale",
      location: "",
      classification: "residential",
      area: "",
      price: "",
      amenities: [],
      description: "",
      name: "",
      phone: "",
      contactMethod: "call",
    },
  });

  function onSubmit(data: ListPropertyFormValues) {
    void data;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Section A: Basic Information */}
      <div className="bg-card rounded-xl border p-6 shadow-sm md:p-8">
        <SectionHeader icon="info" title="المعلومات الأساسية" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Transaction Type */}
          <div className="md:col-span-2">
            <Label className="mb-3">نوع المعاملة</Label>
            <Controller
              control={control}
              name="transactionType"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-4">
                  {TRANSACTION_TYPES.map((t) => (
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
          </div>

          {/* Location */}
          <FormField label="الموقع" error={errors.location?.message}>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v ?? "")}
                  options={LOCATIONS}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.location}
                  >
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          {/* Classification */}
          <FormField
            label="تصنيف العقار"
            error={errors.classification?.message}
          >
            <Controller
              control={control}
              name="classification"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v ?? "residential")}
                  options={CATEGORIES}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.classification}
                  >
                    <SelectValue />
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

          {/* Area */}
          <FormField
            label="المساحة (م²)"
            htmlFor="area"
            required
            error={errors.area?.message}
          >
            <Input
              type="number"
              id="area"
              placeholder="120"
              aria-required="true"
              aria-invalid={!!errors.area}
              aria-describedby={errors.area ? "area-error" : undefined}
              {...register("area")}
            />
          </FormField>

          {/* Price */}
          <FormField
            label="السعر المطلوب"
            htmlFor="price"
            required
            error={errors.price?.message}
          >
            <div className="relative">
              <Input
                type="text"
                id="price"
                placeholder="1,500,000"
                autoComplete="off"
                aria-required="true"
                aria-invalid={!!errors.price}
                aria-describedby={errors.price ? "price-error" : undefined}
                dir="ltr"
                className="pe-16 text-left"
                {...register("price")}
              />
              <span className="text-muted-foreground pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-sm font-bold">
                EGP
              </span>
            </div>
          </FormField>

          {/* Checkboxes */}
          <div className="md:col-span-2">
            <Controller
              control={control}
              name="amenities"
              render={({ field }) => (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {CHECKBOXES.map((cb) => {
                    const checked = field.value.includes(cb.id);
                    return (
                      <label
                        key={cb.id}
                        className="bg-card hover:bg-surface-secondary flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => {
                            const value = checked
                              ? field.value.filter((id) => id !== cb.id)
                              : [...field.value, cb.id];
                            field.onChange(value);
                          }}
                        />
                        <span className="text-muted-foreground text-sm">
                          {cb.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <FormField
              label="تفاصيل إضافية"
              htmlFor="description"
              error={errors.description?.message}
            >
              <Textarea
                id="description"
                placeholder="اكتب أي تفاصيل إضافية خاصة (مثال: قريب من المدارس، دور أرضي، إلخ...)"
                rows={6}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className="mt-1.5 resize-none"
                {...register("description")}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section B: Contact Information */}
      <div className="bg-card rounded-xl border p-6 shadow-sm md:p-8">
        <SectionHeader icon="contact_phone" title="معلومات التواصل" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name */}
          <FormField
            label="الاسم بالكامل"
            htmlFor="name"
            required
            error={errors.name?.message}
          >
            <Input
              type="text"
              id="name"
              placeholder="أدخل اسمك"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
          </FormField>

          {/* Phone */}
          <FormField
            label="رقم الموبايل"
            htmlFor="phone"
            required
            error={errors.phone?.message}
          >
            <Input
              type="tel"
              id="phone"
              placeholder="01x xxxx xxxx"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              dir="ltr"
              className="text-left"
              {...register("phone")}
            />
          </FormField>
        </div>

        {/* Contact Method */}
        <div className="mt-8 space-y-4">
          <Label>وسيلة التواصل المفضلة</Label>
          <Controller
            control={control}
            name="contactMethod"
            render={({ field }) => (
              <div className="flex flex-wrap gap-8">
                {CONTACT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={m.value}
                      checked={field.value === m.value}
                      onChange={() => field.onChange(m.value)}
                      className="sr-only"
                    />
                    <div className="relative flex items-center justify-center">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 transition-all",
                          field.value === m.value
                            ? "border-action"
                            : "border-border",
                        )}
                      />
                      <div
                        className={cn(
                          "bg-action absolute h-2.5 w-2.5 rounded-full transition-transform",
                          field.value === m.value ? "scale-100" : "scale-0",
                        )}
                      />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>

        {/* Submit */}
        <div className="mt-8">
          <Button
            type="submit"
            className="bg-action text-action-foreground hover:bg-action-hover w-full py-5 text-base font-semibold shadow-md md:text-lg"
            size="lg"
          >
            <span>اعرض عقارك</span>
            <span className="material-symbols-outlined ms-2 text-lg">send</span>
          </Button>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            بعد إرسال البيانات، فريق MKAAN هيتواصل معاك لتحديد موعد المعاينة.
          </p>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
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
import { TransactionTypeTile } from "./transaction-type-tile";
import {
  REQUEST_PROPERTY_TRANSACTION_TYPES,
  CATEGORIES,
  FINISHING_STATUS,
  PROPERTY_TYPE_OPTIONS,
} from "../config";
import { GOVERNORATES } from "@/config/locations";

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="material-symbols-outlined text-action">{icon}</span>
      <h2 className="text-primary text-lg font-semibold md:text-xl">{title}</h2>
    </div>
  );
}

export function RequestPropertyForm() {
  const [transactionType, setTransactionType] = useState("buy");
  const [furnished, setFurnished] = useState(false);
  const [location, setLocation] = useState("");
  const [classification, setClassification] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [finishing, setFinishing] = useState("any");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Container className="py-8">
      <section className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
        <div className="from-action to-accent absolute top-0 right-0 left-0 h-1 bg-gradient-to-l" />

        <form
          onSubmit={handleSubmit}
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
                <div className="grid grid-cols-2 gap-4">
                  {REQUEST_PROPERTY_TRANSACTION_TYPES.map((t) => (
                    <TransactionTypeTile
                      key={t.value}
                      name="transaction_type"
                      value={t.value}
                      label={t.label}
                      icon={t.icon}
                      checked={transactionType === t.value}
                      onChange={setTransactionType}
                    />
                  ))}
                </div>
              </fieldset>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <Label>المنطقة المفضلة</Label>
                <Select
                  value={location}
                  onValueChange={(v) => setLocation(v ?? "")}
                >
                  <SelectTrigger className="w-full">
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
              </div>

              {/* Classification */}
              <div className="flex flex-col gap-1.5">
                <Label>التصنيف</Label>
                <Select
                  value={classification}
                  onValueChange={(v) => setClassification(v ?? "")}
                >
                  <SelectTrigger className="w-full">
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
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Section 2: Property Details */}
          <div className="flex flex-col gap-4">
            <SectionHeader icon="home_work" title="تفاصيل العقار" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Property Type */}
              <div className="flex flex-col gap-1.5">
                <Label>نوع العقار</Label>
                <Select
                  value={propertyType}
                  onValueChange={(v) => setPropertyType(v ?? "apartment")}
                >
                  <SelectTrigger className="w-full">
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
              </div>

              {/* Budget Range */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label className="justify-between">
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
                      name="budget_min"
                      placeholder="من"
                      className="h-auto py-2.5 pr-9 pl-3"
                    />
                  </div>
                  <span className="text-muted-foreground font-bold">-</span>
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      payments
                    </span>
                    <Input
                      type="number"
                      name="budget_max"
                      placeholder="إلى"
                      className="h-auto py-2.5 pr-9 pl-3"
                    />
                  </div>
                </div>
              </div>

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="area">المساحة (متر مربع)</Label>
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    square_foot
                  </span>
                  <Input
                    type="number"
                    id="area"
                    name="area"
                    placeholder="الحد الأدنى"
                    className="h-auto py-2.5 pr-9 pl-3"
                  />
                </div>
              </div>

              {/* Finishing Status */}
              <div className="flex flex-col gap-1.5">
                <Label>حالة التشطيب</Label>
                <Select
                  value={finishing}
                  onValueChange={(v) => setFinishing(v ?? "any")}
                >
                  <SelectTrigger className="w-full">
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
              </div>

              {/* Furnished Checkbox */}
              <div className="flex items-center pt-6">
                <label className="group flex cursor-pointer items-center gap-3">
                  <Checkbox
                    checked={furnished}
                    onCheckedChange={(checked) =>
                      setFurnished(checked === true)
                    }
                  />
                  <span className="text-foreground group-hover:text-action text-sm transition-colors">
                    مفروش؟
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="details">تفاصيل إضافية</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="اكتب أي متطلبات خاصة (مثال: قريب من المدارس، دور أرضي، إلخ...)"
                rows={3}
                className="resize-y"
              />
            </div>
          </div>

          <hr className="border-border" />

          {/* Section 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <SectionHeader icon="contact_mail" title="بيانات التواصل" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">الاسم بالكامل</Label>
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    person
                  </span>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="أدخل اسمك"
                    required
                    className="h-auto py-2.5 pr-9 pl-3"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">رقم الموبايل</Label>
                <div className="relative">
                  <span className="material-symbols-outlined text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    call
                  </span>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="01X XXXX XXXX"
                    required
                    dir="ltr"
                    className="h-auto py-2.5 pr-9 pl-3 text-left"
                  />
                </div>
              </div>
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

"use client";

import { useState } from "react";
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
import { TransactionTypeTile } from "@/features/request-property/components/transaction-type-tile";
import { CATEGORIES } from "@/features/request-property/config/request-property-options";

const TRANSACTION_TYPES = [
  { value: "sale", label: "بيع", icon: "sell" },
  { value: "rent", label: "إيجار", icon: "calendar_month" },
];

const LOCATIONS = [
  { value: "shibin", label: "شبين الكوم" },
  { value: "quesna", label: "قويسنا" },
  { value: "bagour", label: "الباجور" },
  { value: "villages", label: "القرى" },
];

const CHECKBOXES = [
  { id: "finished", label: "تشطيب كامل" },
  { id: "furnished", label: "مفروش" },
  { id: "elevator", label: "يوجد مصعد" },
  { id: "parking", label: "موقف سيارات" },
];

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      <span className="material-symbols-outlined text-action">{icon}</span>
      <h3 className="text-primary text-lg font-semibold md:text-xl">{title}</h3>
    </div>
  );
}

export function ListPropertyForm() {
  const [transactionType, setTransactionType] = useState("sale");
  const [location, setLocation] = useState("");
  const [classification, setClassification] = useState("residential");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("call");
  const [description, setDescription] = useState("");
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    finished: false,
    furnished: false,
    elevator: false,
    parking: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section A: Basic Information */}
      <div className="bg-card rounded-xl border p-6 shadow-sm md:p-8">
        <SectionHeader icon="info" title="المعلومات الأساسية" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Transaction Type */}
          <div className="md:col-span-2">
            <Label className="mb-3">نوع المعاملة</Label>
            <div className="grid grid-cols-2 gap-4">
              {TRANSACTION_TYPES.map((t) => (
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
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <Label>الموقع</Label>
            <Select
              value={location}
              onValueChange={(v) => setLocation(v ?? "")}
            >
              <SelectTrigger className="w-full">
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
          </div>

          {/* Classification */}
          <div className="flex flex-col gap-1.5">
            <Label>تصنيف العقار</Label>
            <Select
              value={classification}
              onValueChange={(v) => setClassification(v ?? "residential")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter((c) => c.value !== "").map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area */}
          <div className="flex flex-col gap-1.5">
            <Label>المساحة (م²)</Label>
            <Input
              type="number"
              placeholder="120"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <Label>السعر المطلوب</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="1,500,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                dir="ltr"
                className="pe-16 text-left"
                required
              />
              <span className="text-muted-foreground pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-sm font-bold">
                EGP
              </span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CHECKBOXES.map((cb) => (
                <label
                  key={cb.id}
                  className="bg-card hover:bg-surface-secondary flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all"
                >
                  <Checkbox
                    checked={checkboxes[cb.id]}
                    onCheckedChange={(checked) =>
                      setCheckboxes((prev) => ({
                        ...prev,
                        [cb.id]: checked === true,
                      }))
                    }
                  />
                  <span className="text-muted-foreground text-sm">
                    {cb.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label>تفاصيل إضافية</Label>
            <Textarea
              placeholder="اكتب أي تفاصيل إضافية خاصة (مثال: قريب من المدارس، دور أرضي، إلخ...)"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section B: Contact Information */}
      <div className="bg-card rounded-xl border p-6 shadow-sm md:p-8">
        <SectionHeader icon="contact_phone" title="معلومات التواصل" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label>الاسم بالكامل</Label>
            <Input
              type="text"
              placeholder="أدخل اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <Label>رقم الموبايل</Label>
            <Input
              type="tel"
              placeholder="01x xxxx xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              className="text-left"
              required
            />
          </div>
        </div>

        {/* Contact Method */}
        <div className="mt-8 space-y-4">
          <Label>وسيلة التواصل المفضلة</Label>
          <div className="flex flex-wrap gap-8">
            {[
              { value: "call", label: "مكالمة هاتفية" },
              { value: "whatsapp", label: "واتساب" },
            ].map((m) => (
              <label
                key={m.value}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="contact_method"
                  value={m.value}
                  checked={contactMethod === m.value}
                  onChange={() => setContactMethod(m.value)}
                  className="sr-only"
                />
                <div className="relative flex items-center justify-center">
                  <div
                    className={`h-5 w-5 rounded-full border-2 transition-all ${
                      contactMethod === m.value
                        ? "border-action"
                        : "border-border"
                    }`}
                  />
                  <div
                    className={`bg-action absolute h-2.5 w-2.5 rounded-full transition-transform ${
                      contactMethod === m.value ? "scale-100" : "scale-0"
                    }`}
                  />
                </div>
                <span className="text-muted-foreground text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <Button
            type="submit"
            className="w-full py-5 text-base font-semibold md:text-lg"
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

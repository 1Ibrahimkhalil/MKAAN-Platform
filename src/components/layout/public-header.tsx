"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/config";

export function PublicHeader() {
  return (
    <nav className="border-border/20 sticky top-0 z-50 h-16 w-full border-b bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-full w-full items-center justify-between gap-4 px-4 md:px-6 lg:max-w-[1120px] lg:px-8 xl:max-w-[1280px]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="MKAAN"
            width={400}
            height={56}
            className="h-18 w-auto object-contain transition-transform duration-300 hover:scale-105 md:h-18 lg:h-22"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link-underline font-label-md text-base transition-colors ${
                link.active
                  ? "text-action font-bold"
                  : "text-muted-foreground hover:text-action font-medium"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="lg"
            nativeButton={false}
            className="bg-whatsapp hover:bg-whatsapp/90 font-label-md shadow-whatsapp/20 hover:shadow-whatsapp/30 btn-interactive hidden items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 sm:flex"
            render={
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <MessageCircle className="size-[18px]" />
            تواصل عبر واتساب
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-surface-tertiary btn-interactive rounded-lg p-2 transition-colors lg:hidden"
                  aria-label="فتح القائمة"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-72 p-0"
            >
              <SheetTitle className="border-border/20 border-b px-6 py-4">
                القائمة
              </SheetTitle>
              <div className="flex flex-col gap-1 px-4 pt-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-action/10 text-action font-bold"
                        : "text-muted-foreground hover:bg-surface-tertiary hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="default"
                  nativeButton={false}
                  className="bg-whatsapp mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
                  render={
                    <a
                      href="https://wa.me/201000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <MessageCircle className="size-4" />
                  تواصل عبر واتساب
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

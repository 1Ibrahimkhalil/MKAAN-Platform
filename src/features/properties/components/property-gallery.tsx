"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxThumbnails = 3;
  const remainingImages = images.length - maxThumbnails;

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative h-[400px] w-full overflow-hidden rounded-xl shadow-sm md:h-[500px]">
        <Image
          src={images[activeIndex]}
          alt={`${title} - صورة ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-500"
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-surface/80 hover:bg-surface absolute end-4 top-4 rounded-full p-2 backdrop-blur-sm"
          aria-label="إضافة للمفضلة"
        >
          <span className="material-symbols-outlined text-action">
            favorite_border
          </span>
        </Button>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.slice(0, maxThumbnails).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-24 cursor-pointer overflow-hidden rounded-lg transition-opacity",
                i === activeIndex
                  ? "ring-action opacity-100 ring-2"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={img}
                alt={`صورة مصغرة ${i + 1}`}
                width={200}
                height={96}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
          {remainingImages > 0 && (
            <div className="bg-surface-container-high hover:bg-surface-tertiary flex h-24 cursor-pointer items-center justify-center rounded-lg transition-colors">
              <span className="text-action text-sm font-medium">
                +{remainingImages} صورة
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

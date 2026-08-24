import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  isPrimary?: boolean;
}

export function ServiceCard({
  title,
  description,
  image,
  tags,
  ctaLabel,
  ctaHref,
  isPrimary = false,
}: ServiceCardProps) {
  return (
    <div className="border-border flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="bg-surface-container relative mb-4 h-40 overflow-hidden rounded">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="montserrat text-foreground text-2xl font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container border-border text-muted-foreground rounded-full border px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={ctaHref}
        className={cn(
          "mt-4 w-full rounded py-2 text-center text-sm font-medium transition-colors",
          isPrimary
            ? "bg-action hover:bg-action-container text-white shadow-sm"
            : "border-action text-action hover:bg-action border-2 bg-transparent hover:text-white",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

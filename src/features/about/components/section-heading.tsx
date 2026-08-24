import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "start" | "center";
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "start",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <h2
          className={cn(
            "font-headline-lg text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] font-extrabold tracking-tight",
            onDark ? "text-white" : "text-primary",
          )}
        >
          {title}
        </h2>
        <div className="bg-action h-1.5 w-20 rounded-full" />
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed font-medium md:text-lg",
            onDark ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

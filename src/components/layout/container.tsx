import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[clamp(1rem,2vw+0.5rem,2.5rem)] lg:max-w-[1120px] xl:max-w-[1280px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

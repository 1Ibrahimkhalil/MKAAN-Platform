"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/feedback/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState message="حدث خطأ أثناء تحميل الصفحة" onRetry={reset} />;
}

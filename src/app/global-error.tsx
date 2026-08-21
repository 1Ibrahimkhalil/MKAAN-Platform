"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/feedback/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-background min-h-screen font-sans antialiased">
        <ErrorState message="حدث خطأ غير متوقع" onRetry={reset} />
      </body>
    </html>
  );
}

// src/app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({ error, unstable_retry }: Props) {
  useEffect(() => {
    console.error("[Error boundary]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <AlertTriangle className="h-16 w-16 text-destructive/60" />
      <div>
        <h2 className="text-xl font-semibold">Algo salió mal</h2>
        <p className="mt-1 text-muted-foreground">
          Ocurrió un error inesperado. Podés intentar de nuevo.
        </p>
      </div>
      <Button onClick={unstable_retry}>Intentar de nuevo</Button>
    </div>
  );
}

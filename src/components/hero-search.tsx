// src/components/hero-search.tsx
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { VerseCard } from "@/components/verse-card";
import { searchVerses } from "@/app/actions/search";
import { useTranslation } from "@/hooks/use-translation";
import type { BibleVerse } from "@/types/bible";
import { toast } from "sonner";

const schema = z.object({
  query: z.string().min(3, "Escribí al menos 3 caracteres"),
});
type FormValues = z.infer<typeof schema>;

const CHIPS = ["Ansiedad", "Miedo", "Perdón", "Gratitud", "Duelo", "Propósito", "Fortaleza", "Soledad"];

export function HeroSearch() {
  const { translation } = useTranslation();
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  function runSearch(query: string) {
    setSearched(true);
    startTransition(async () => {
      const { results: r, error } = await searchVerses(query, translation);
      if (error) {
        toast.error(error);
        setResults([]);
      } else {
        setResults(r);
      }
    });
  }

  function onSubmit(data: FormValues) {
    runSearch(data.query);
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Encontrá el versículo que necesitás
        </h1>
        <p className="text-muted-foreground">
          Describí lo que estás viviendo y te mostramos versículos relevantes
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-2">
        <div className="flex gap-2">
          <Input
            {...form.register("query")}
            placeholder="¿Qué necesitás hoy? Ej: ansiedad, miedo, gratitud…"
            aria-label="Buscar versículos"
            className="flex-1"
          />
          <Button type="submit" disabled={isPending} aria-label="Buscar">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
        {form.formState.errors.query && (
          <p className="text-sm text-destructive">{form.formState.errors.query.message}</p>
        )}
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              form.setValue("query", chip);
              runSearch(chip);
            }}
            className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-[var(--accent-bible)] hover:text-foreground"
          >
            {chip}
          </button>
        ))}
      </div>

      {isPending && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isPending && searched && results.length === 0 && (
        <p className="text-center text-muted-foreground">
          No encontramos versículos para esa búsqueda. Probá con otras palabras.
        </p>
      )}

      {!isPending && results.length > 0 && (
        <div className="space-y-4">
          {results.map((verse, i) => (
            <VerseCard key={`${verse.bookId}-${verse.chapter}-${verse.verseStart}`} verse={verse} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

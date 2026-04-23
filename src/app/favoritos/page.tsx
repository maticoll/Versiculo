// src/app/favoritos/page.tsx
"use client";

import Link from "next/link";
import { Heart, Trash2, BookOpen } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { VerseCard } from "@/components/verse-card";
import { Button } from "@/components/ui/button";
import { bookById } from "@/lib/books";
import type { BibleVerse } from "@/types/bible";

export default function FavoritosPage() {
  const { favorites, clear } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/30" />
        <div>
          <h2 className="text-xl font-semibold">Sin favoritos todavía</h2>
          <p className="mt-1 text-muted-foreground">
            Guardá versículos tocando la estrella en cualquier card.
          </p>
        </div>
        {/* Use render prop for Link composition since asChild is not supported */}
        <Button variant="outline" render={<Link href="/" />}>
          <BookOpen className="mr-2 h-4 w-4" />
          Buscar versículos
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Heart className="h-5 w-5 text-[var(--accent-bible)]" />
          Favoritos ({favorites.length})
        </h1>
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={clear}
          aria-label="Eliminar todos los favoritos"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Borrar todo
        </Button>
      </div>

      <div className="space-y-4">
        {favorites.map((fav, i) => {
          const verse: BibleVerse = {
            bookId: fav.bookId,
            bookName: bookById(fav.bookId)?.name ?? fav.reference,
            chapter: fav.chapter,
            verseStart: fav.verseStart,
            verseEnd: fav.verseEnd,
            text: fav.text,
            translationCode: fav.translationCode,
          };
          return (
            <VerseCard
              key={`${fav.reference}-${fav.translationCode}`}
              verse={verse}
              index={i}
            />
          );
        })}
      </div>
    </div>
  );
}

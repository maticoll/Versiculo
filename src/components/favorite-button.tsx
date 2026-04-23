// src/components/favorite-button.tsx
"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import type { FavoriteItem, BibleVerse } from "@/types/bible";
import { formatReference } from "@/lib/books";
import { toast } from "sonner";

type Props = {
  verse: BibleVerse;
};

export function FavoriteButton({ verse }: Props) {
  const { has, add, remove } = useFavorites();
  const reference = formatReference({
    bookId: verse.bookId,
    chapter: verse.chapter,
    verseStart: verse.verseStart,
    verseEnd: verse.verseEnd,
  });
  const isFav = has(reference, verse.translationCode);

  function toggle() {
    if (isFav) {
      remove(reference, verse.translationCode);
      toast("Eliminado de favoritos");
    } else {
      const item: FavoriteItem = {
        reference,
        text: verse.text,
        translationCode: verse.translationCode,
        bookId: verse.bookId,
        chapter: verse.chapter,
        verseStart: verse.verseStart,
        verseEnd: verse.verseEnd,
        savedAt: new Date().toISOString(),
      };
      add(item);
      toast.success("Guardado en favoritos");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
      onClick={toggle}
    >
      <Star
        className={`h-4 w-4 transition-colors ${
          isFav ? "fill-[var(--accent-bible)] text-[var(--accent-bible)]" : "text-muted-foreground"
        }`}
      />
    </Button>
  );
}

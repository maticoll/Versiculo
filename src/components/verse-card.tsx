// src/components/verse-card.tsx
"use client";

import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import { formatReference } from "@/lib/books";
import type { BibleVerse } from "@/types/bible";
import { toast } from "sonner";

type Props = {
  verse: BibleVerse;
  index?: number;
};

export function VerseCard({ verse, index = 0 }: Props) {
  const reference = formatReference({
    bookId: verse.bookId,
    chapter: verse.chapter,
    verseStart: verse.verseStart,
    verseEnd: verse.verseEnd,
  });
  const copyText = `${reference}\n${verse.text}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Versículo copiado");
    } catch {
      toast.error("No se pudo copiar");
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: reference, text: copyText });
      } catch {
        // user cancelled
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <Card
      className="transition-shadow hover:shadow-md"
      style={{
        opacity: 0,
        animation: `fadeIn 0.4s ease forwards ${index * 70}ms`,
      }}
    >
      <CardHeader className="pb-2">
        <p className="text-sm font-medium tracking-wide text-[var(--accent-bible)]">
          {reference}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="font-serif text-lg leading-relaxed md:text-xl">
          {verse.text}
        </p>
        {verse.reason && (
          <p className="text-sm italic text-muted-foreground">
            {verse.reason}
          </p>
        )}
        <div className="flex items-center gap-1 pt-1">
          <FavoriteButton verse={verse} />
          <Button variant="ghost" size="icon" aria-label="Copiar versículo" onClick={handleCopy}>
            <Copy className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Compartir versículo" onClick={handleShare}>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

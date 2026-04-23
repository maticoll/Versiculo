// src/app/not-found.tsx
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDailyVerse } from "@/lib/daily-verse-selector";
import { getChapter } from "@/lib/bolls";
import { formatReference } from "@/lib/books";
import { DEFAULT_TRANSLATION } from "@/lib/translations";

type VerseData = { text: string; reference: string } | null;

async function fetchNotFoundVerse(): Promise<VerseData> {
  try {
    const offsetDate = new Date();
    offsetDate.setDate(offsetDate.getDate() + 7);
    const ref = getDailyVerse(offsetDate);
    const verses = await getChapter(DEFAULT_TRANSLATION, ref.book, ref.chapter);
    const end = ref.verseEnd ?? ref.verseStart;
    const selected = verses.filter((v) => v.verse >= ref.verseStart && v.verse <= end);
    const text = selected.map((v) => v.text).join(" ").trim();
    const reference = formatReference({
      bookId: ref.book,
      chapter: ref.chapter,
      verseStart: ref.verseStart,
      verseEnd: ref.verseEnd ?? null,
    });
    return text ? { text, reference } : null;
  } catch {
    return null;
  }
}

export default async function NotFound() {
  const verseData = await fetchNotFoundVerse();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <BookOpen className="h-16 w-16 text-muted-foreground/30" />
      <div>
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-muted-foreground">
          Esta ruta no existe. Volvé al inicio y buscá lo que necesitás.
        </p>
      </div>
      {verseData && (
        <blockquote className="max-w-md rounded-lg border border-[var(--accent-bible)]/30 bg-[var(--accent-bible)]/5 p-4 text-left">
          <p className="font-serif text-base leading-relaxed">{verseData.text}</p>
          <footer className="mt-2 text-xs text-[var(--accent-bible)]">{verseData.reference}</footer>
        </blockquote>
      )}
      <Button render={<Link href="/" />}>
        Volver al inicio
      </Button>
    </div>
  );
}

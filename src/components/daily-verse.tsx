// src/components/daily-verse.tsx
import { getDailyVerse } from "@/lib/daily-verse-selector";
import { getChapter } from "@/lib/bolls";
import { bookById, formatReference } from "@/lib/books";
import { DEFAULT_TRANSLATION } from "@/lib/translations";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export async function DailyVerse() {
  try {
    const ref = getDailyVerse();
    const verses = await getChapter(DEFAULT_TRANSLATION, ref.book, ref.chapter);
    const book = bookById(ref.book);

    const end = ref.verseEnd ?? ref.verseStart;
    const selected = verses.filter((v) => v.verse >= ref.verseStart && v.verse <= end);
    const text = selected.map((v) => v.text).join(" ").trim();

    if (!text) return null;

    const reference = formatReference({
      bookId: ref.book,
      chapter: ref.chapter,
      verseStart: ref.verseStart,
      verseEnd: ref.verseEnd ?? null,
    });

    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Versículo del día</span>
        </div>
        <Card className="border-[var(--accent-bible)]/30 bg-[var(--accent-bible)]/5">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-[var(--accent-bible)]">{reference}</p>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-xl leading-relaxed md:text-2xl">{text}</p>
            <p className="mt-2 text-xs text-muted-foreground">{book?.name} — {DEFAULT_TRANSLATION}</p>
          </CardContent>
        </Card>
      </section>
    );
  } catch {
    return null;
  }
}

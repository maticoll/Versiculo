import { notFound } from "next/navigation";
import { BibleNavigator } from "@/components/bible-navigator";
import { getChapter } from "@/lib/bolls";
import { bookById } from "@/lib/books";
import { TRANSLATION_CODES } from "@/lib/translations";
import type { TranslationCode } from "@/types/bible";

type Params = Promise<{
  translation: string;
  bookId: string;
  chapter: string;
}>;

export default async function ChapterPage({ params }: { params: Params }) {
  const { translation, bookId: bookIdStr, chapter: chapterStr } = await params;

  const bookId = parseInt(bookIdStr, 10);
  const chapter = parseInt(chapterStr, 10);

  if (
    !TRANSLATION_CODES.includes(translation as TranslationCode) ||
    isNaN(bookId) ||
    bookId < 1 ||
    bookId > 66 ||
    isNaN(chapter) ||
    chapter < 1
  ) {
    notFound();
  }

  const book = bookById(bookId);
  if (!book || chapter > book.chapters) notFound();

  let verses: import("@/types/bible").BollsVerse[] = [];
  let apiError: string | null = null;

  try {
    verses = await getChapter(translation as TranslationCode, bookId, chapter);
    if (verses.length === 0) {
      apiError = `No se encontró el texto para ${book.name} ${chapter} en la traducción ${translation}. Probá con otra traducción.`;
      console.error(`[Bolls.life] Respuesta vacía para ${translation}/${bookId}/${chapter}`);
    }
  } catch (err) {
    console.error(`[Bolls.life] Error al obtener ${translation}/${bookId}/${chapter}:`, err);
    apiError = "No se pudo cargar el capítulo. Verificá tu conexión o intentá de nuevo.";
  }

  if (apiError) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-16 text-center">
        <p className="text-lg font-semibold">No disponible</p>
        <p className="text-muted-foreground">{apiError}</p>
      </div>
    );
  }

  return (
    <BibleNavigator
      translation={translation as TranslationCode}
      bookId={bookId}
      chapter={chapter}
      totalChapters={book.chapters}
      verses={verses}
      bookName={book.name}
    />
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bookId: bookIdStr, chapter: chapterStr } = await params;
  const book = bookById(parseInt(bookIdStr, 10));
  return {
    title: book
      ? `${book.name} ${chapterStr} — Versículo`
      : "Leer — Versículo",
  };
}

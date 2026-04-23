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

  const verses = await getChapter(
    translation as TranslationCode,
    bookId,
    chapter
  );

  if (!verses || verses.length === 0) notFound();

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

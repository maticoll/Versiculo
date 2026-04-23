// src/lib/bolls.ts — lee Biblia desde archivos JSON locales (sin API externa)
import type { TranslationCode } from "@/types/bible";
import {
  getChapterLocal,
  getVersesLocal,
  type LocalVerse,
} from "@/lib/local-bible";

export type BollsVerse = LocalVerse & { pk?: number };

export type VerseRequest = {
  translation: TranslationCode;
  book: number;
  chapter: number;
  verses: number[];
};

/** Obtiene todos los versículos de un capítulo */
export async function getChapter(
  translation: TranslationCode,
  book: number,
  chapter: number,
): Promise<BollsVerse[]> {
  return getChapterLocal(translation, book, chapter);
}

/** Obtiene un único versículo */
export async function getVerse(
  translation: TranslationCode,
  book: number,
  chapter: number,
  verse: number,
): Promise<BollsVerse> {
  const results = getVersesLocal(translation, book, chapter, [verse]);
  if (results.length === 0) throw new Error("Versículo no encontrado");
  return results[0];
}

/**
 * Obtiene múltiples pasajes en paralelo.
 * Retorna array de arrays: un array por cada pasaje del input.
 */
export async function getVerses(
  requests: VerseRequest[],
): Promise<BollsVerse[][]> {
  return requests.map((req) =>
    getVersesLocal(req.translation, req.book, req.chapter, req.verses),
  );
}

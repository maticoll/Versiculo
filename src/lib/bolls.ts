// src/lib/bolls.ts — usa GetBible.net (https://getbible.net/v2)
import { z } from "zod";
import type { TranslationCode } from "@/types/bible";

const GETBIBLE_BASE = "https://getbible.net/v2";

/** Mapeo de nuestros códigos internos a los códigos de GetBible */
const TRANSLATION_TO_GETBIBLE: Record<TranslationCode, string> = {
  RV1909: "rvr1960",
  DHH: "dhh",
  KJV: "kjv",
};

const GetBibleVerseSchema = z.object({
  verse: z.union([z.number(), z.string()]).transform((v) => Number(v)),
  text: z.string(),
});

const GetBibleChapterSchema = z.object({
  chapter: z.number().optional(),
  verses: z.record(z.string(), GetBibleVerseSchema),
});

export type BollsVerse = {
  pk?: number;
  verse: number;
  text: string;
};

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
  const code = TRANSLATION_TO_GETBIBLE[translation];
  const url = `${GETBIBLE_BASE}/${code}/${book}/${chapter}.json`;

  const res = await fetch(url, { next: { revalidate: 3600 } } as RequestInit);
  if (!res.ok) {
    throw new Error(`GetBible error ${res.status}: ${res.statusText} (${url})`);
  }

  const json = await res.json();
  const parsed = GetBibleChapterSchema.parse(json);

  return Object.values(parsed.verses)
    .map((v) => ({ verse: v.verse, text: v.text }))
    .sort((a, b) => a.verse - b.verse);
}

/**
 * Obtiene múltiples pasajes.
 * GetBible no tiene endpoint batch, así que hacemos fetches paralelos
 * y filtramos los versículos pedidos.
 */
export async function getVerses(requests: VerseRequest[]): Promise<BollsVerse[][]> {
  const results = await Promise.allSettled(
    requests.map(async (req) => {
      const allVerses = await getChapter(req.translation, req.book, req.chapter);
      return allVerses.filter((v) => req.verses.includes(v.verse));
    }),
  );

  return results.map((r) => (r.status === "fulfilled" ? r.value : []));
}

/** Obtiene un único versículo */
export async function getVerse(
  translation: TranslationCode,
  book: number,
  chapter: number,
  verse: number,
): Promise<BollsVerse> {
  const all = await getChapter(translation, book, chapter);
  const found = all.find((v) => v.verse === verse);
  if (!found) throw new Error("Versículo no encontrado");
  return found;
}

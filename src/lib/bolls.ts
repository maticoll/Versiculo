// src/lib/bolls.ts
import { z } from "zod";
import type { TranslationCode } from "@/types/bible";

const BOLLS_BASE = "https://bolls.life";

const BollsVerseSchema = z.object({
  pk: z.number(),
  verse: z.number(),
  text: z.string(),
});
export type BollsVerse = z.infer<typeof BollsVerseSchema>;

const ChapterSchema = z.array(BollsVerseSchema);

// POST get-verses: cada pasaje → array de versículos
const BatchResponseSchema = z.array(z.array(BollsVerseSchema));

async function fetchBolls<T>(
  url: string,
  schema: z.ZodType<T>,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Bolls.life error ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return schema.parse(json);
}

/** Obtiene todos los versículos de un capítulo */
export async function getChapter(
  translation: TranslationCode,
  book: number,
  chapter: number,
): Promise<BollsVerse[]> {
  const url = `${BOLLS_BASE}/get-chapter/${translation}/${book}/${chapter}/`;
  return fetchBolls(url, ChapterSchema, {
    next: { revalidate: 3600 },
  } as RequestInit);
}

/** Obtiene un único versículo */
export async function getVerse(
  translation: TranslationCode,
  book: number,
  chapter: number,
  verse: number,
): Promise<BollsVerse> {
  const url = `${BOLLS_BASE}/get-text/${translation}/${book}/${chapter}/${verse}/`;
  const result = await fetchBolls(url, z.array(BollsVerseSchema), {
    next: { revalidate: 3600 },
  } as RequestInit);
  if (result.length === 0) throw new Error("Versículo no encontrado");
  return result[0];
}

export type VerseRequest = {
  translation: TranslationCode;
  book: number;
  chapter: number;
  verses: number[];
};

/**
 * Obtiene múltiples pasajes en una sola request (batch).
 * Retorna array de arrays: un array por cada pasaje del input.
 */
export async function getVerses(requests: VerseRequest[]): Promise<BollsVerse[][]> {
  const body = requests.map((r) => ({
    translation: r.translation,
    book: r.book,
    chapter: r.chapter,
    verses: r.verses,
  }));
  const res = await fetch(`${BOLLS_BASE}/get-verses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Bolls.life batch error ${res.status}`);
  }
  const json = await res.json();
  // Intentar parsear como array de arrays; si falla, envolver en array
  const batchResult = BatchResponseSchema.safeParse(json);
  if (batchResult.success) return batchResult.data;
  // Fallback: el API puede devolver un array plano
  const flatResult = ChapterSchema.safeParse(json);
  if (flatResult.success) return [flatResult.data];
  throw new Error("Respuesta inesperada de Bolls.life batch");
}

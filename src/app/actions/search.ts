// src/app/actions/search.ts
"use server";

import { z } from "zod";
import { getOpenAIClient, OPENAI_MODEL, SYSTEM_PROMPT } from "@/lib/openai";
import { getVerses } from "@/lib/bolls";
import { bookByName, formatReference } from "@/lib/books";
import type { BibleVerse, TranslationCode } from "@/types/bible";

const QuerySchema = z.object({
  query: z.string().min(3).max(300),
  translation: z.enum(["RV1909", "DHH", "KJV"] as const),
});

const ReferenceSchema = z.object({
  book: z.string().min(1),
  chapter: z.number().int().positive(),
  verseStart: z.number().int().positive(),
  verseEnd: z.number().int().positive().nullable(),
  reason: z.string().min(1),
});

const SearchResponseSchema = z.object({
  references: z.array(ReferenceSchema).min(1).max(10),
});

type SearchResponse = z.infer<typeof SearchResponseSchema>;

async function callOpenAI(query: string, temperature: number): Promise<SearchResponse> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: OPENAI_MODEL,
    temperature,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
  });
  const content = response.choices[0]?.message?.content ?? "{}";
  return SearchResponseSchema.parse(JSON.parse(content));
}

export async function searchVerses(
  rawQuery: string,
  rawTranslation: string,
): Promise<{ results: BibleVerse[]; error?: string }> {
  const parsed = QuerySchema.safeParse({ query: rawQuery, translation: rawTranslation });
  if (!parsed.success) {
    return { results: [], error: "La búsqueda debe tener entre 3 y 300 caracteres." };
  }
  const { query, translation } = parsed.data;

  let aiResponse: SearchResponse;
  try {
    aiResponse = await callOpenAI(query, 0.7);
  } catch {
    try {
      aiResponse = await callOpenAI(query, 0);
    } catch {
      return { results: [], error: "No se pudo conectar con el asistente bíblico. Intentá de nuevo." };
    }
  }

  // Resolver referencias a IDs numéricos
  const resolvedRefs = aiResponse.references.flatMap((ref) => {
    const book = bookByName(ref.book);
    if (!book) return [];
    return [{ ...ref, bookId: book.id, bookName: book.name }];
  });

  if (resolvedRefs.length === 0) {
    return { results: [], error: "No se encontraron referencias válidas para esa búsqueda." };
  }

  // Construir requests batch para Bolls
  const batchRequests = resolvedRefs.map((ref) => ({
    translation,
    book: ref.bookId,
    chapter: ref.chapter,
    verses: ref.verseEnd
      ? Array.from(
          { length: ref.verseEnd - ref.verseStart + 1 },
          (_, i) => ref.verseStart + i,
        )
      : [ref.verseStart],
  }));

  let batchResults: Array<Array<{ pk: number; verse: number; text: string }>>;
  try {
    batchResults = await getVerses(batchRequests);
  } catch {
    return { results: [], error: "No se pudo obtener el texto de los versículos." };
  }

  const results: BibleVerse[] = resolvedRefs.map((ref, i) => {
    const verses = batchResults[i] ?? [];
    const text = verses.map((v) => v.text).join(" ").trim();
    return {
      bookId: ref.bookId,
      bookName: ref.bookName,
      chapter: ref.chapter,
      verseStart: ref.verseStart,
      verseEnd: ref.verseEnd,
      text: text || `(${formatReference({ bookId: ref.bookId, chapter: ref.chapter, verseStart: ref.verseStart, verseEnd: ref.verseEnd })})`,
      translationCode: translation as TranslationCode,
      reason: ref.reason,
    };
  });

  return { results: results.filter((r) => r.text.length > 0) };
}

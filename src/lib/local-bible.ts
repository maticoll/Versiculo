// src/lib/local-bible.ts
// Lee la Biblia desde archivos JSON locales (sin llamadas a API externas).
// Solo ejecuta en servidor (Node.js). Nunca se envía al cliente.
import fs from "fs";
import path from "path";
import type { TranslationCode } from "@/types/bible";

type BibleData = Array<{ abbrev: string; name: string; chapters: string[][] }>;

export type LocalVerse = { verse: number; text: string };

// Caché a nivel de módulo — persiste en lambdas calientes de Vercel
let _rv: BibleData | null = null;
let _kjv: BibleData | null = null;

function load(filename: string): BibleData {
  const filePath = path.join(process.cwd(), "src", "data", "bible", filename);
  // Eliminar BOM si existe (algunos archivos JSON lo incluyen)
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(raw) as BibleData;
}

function getRv(): BibleData {
  return (_rv ??= load("rv.json"));
}

function getKjv(): BibleData {
  return (_kjv ??= load("kjv.json"));
}

function getBibleData(translation: TranslationCode): BibleData {
  return translation === "KJV" ? getKjv() : getRv();
}

/** Limpia texto: elimina llaves editoriales del KJV ({word} → word) */
function clean(text: string): string {
  return text.replace(/\{([^}]*)\}/g, "$1").trim();
}

/** Devuelve todos los versículos de un capítulo */
export function getChapterLocal(
  translation: TranslationCode,
  book: number,
  chapter: number,
): LocalVerse[] {
  const bible = getBibleData(translation);
  const bookData = bible[book - 1]; // book es 1-indexed
  if (!bookData) return [];
  const chapterData = bookData.chapters[chapter - 1]; // chapter es 1-indexed
  if (!chapterData) return [];
  return chapterData.map((text, i) => ({ verse: i + 1, text: clean(text) }));
}

/** Devuelve versículos específicos de un capítulo */
export function getVersesLocal(
  translation: TranslationCode,
  book: number,
  chapter: number,
  verseNumbers: number[],
): LocalVerse[] {
  const all = getChapterLocal(translation, book, chapter);
  return all.filter((v) => verseNumbers.includes(v.verse));
}

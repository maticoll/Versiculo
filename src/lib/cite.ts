// src/lib/cite.ts

/** Normaliza un string: minúsculas, sin acentos, espacios normalizados */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export type ParsedCite = {
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number | null;
};

/**
 * Parsea citas tipo "Filipenses 4:6-7" o "Juan 3:16".
 * Devuelve null si el formato no es reconocible.
 */
export function parseCite(cite: string): ParsedCite | null {
  // Formato: "<Book> <chapter>:<verseStart>[-verseEnd]"
  const match = cite.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  const [, bookName, chapter, verseStart, verseEnd] = match;
  return {
    bookName: bookName.trim(),
    chapter: parseInt(chapter, 10),
    verseStart: parseInt(verseStart, 10),
    verseEnd: verseEnd ? parseInt(verseEnd, 10) : null,
  };
}

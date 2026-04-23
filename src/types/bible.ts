// src/types/bible.ts

export type TranslationCode = "RV1909" | "KJV";

/** Versículo crudo de la API de Biblia */
export interface BollsVerse {
  pk?: number;
  verse: number;
  text: string;
}

/** Versículo con metadatos para mostrar en UI */
export interface BibleVerse {
  bookId: number;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number | null;
  text: string;
  translationCode: TranslationCode;
  reason?: string; // solo en resultados de búsqueda semántica
}

/** Ítem guardado en favoritos */
export interface FavoriteItem {
  reference: string;       // "Filipenses 4:6-7"
  text: string;
  translationCode: TranslationCode;
  bookId: number;
  chapter: number;
  verseStart: number;
  verseEnd: number | null;
  savedAt: string;         // ISO date string
}

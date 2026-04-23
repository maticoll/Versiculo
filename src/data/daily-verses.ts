// src/data/daily-verses.ts

export type DailyVerseRef = {
  book: number;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
};

export const DAILY_VERSES: DailyVerseRef[] = [
  // Juan
  { book: 43, chapter: 3,  verseStart: 16 },
  { book: 43, chapter: 3,  verseStart: 17 },
  { book: 43, chapter: 11, verseStart: 25, verseEnd: 26 },
  { book: 43, chapter: 14, verseStart: 6 },
  { book: 43, chapter: 14, verseStart: 27 },
  { book: 43, chapter: 15, verseStart: 5 },
  { book: 43, chapter: 16, verseStart: 33 },
  // Salmos
  { book: 19, chapter: 23, verseStart: 1 },
  { book: 19, chapter: 23, verseStart: 4 },
  { book: 19, chapter: 27, verseStart: 1 },
  { book: 19, chapter: 34, verseStart: 8 },
  { book: 19, chapter: 46, verseStart: 1 },
  { book: 19, chapter: 91, verseStart: 1, verseEnd: 2 },
  { book: 19, chapter: 91, verseStart: 11 },
  { book: 19, chapter: 119, verseStart: 105 },
  { book: 19, chapter: 121, verseStart: 1, verseEnd: 2 },
  { book: 19, chapter: 139, verseStart: 14 },
  { book: 19, chapter: 16, verseStart: 8 },
  { book: 19, chapter: 37, verseStart: 4 },
  { book: 19, chapter: 55, verseStart: 22 },
  // Proverbios
  { book: 20, chapter: 3,  verseStart: 5, verseEnd: 6 },
  { book: 20, chapter: 3,  verseStart: 9, verseEnd: 10 },
  { book: 20, chapter: 16, verseStart: 3 },
  { book: 20, chapter: 22, verseStart: 6 },
  { book: 20, chapter: 31, verseStart: 25 },
  // Isaías
  { book: 23, chapter: 40, verseStart: 31 },
  { book: 23, chapter: 41, verseStart: 10 },
  { book: 23, chapter: 43, verseStart: 2 },
  { book: 23, chapter: 53, verseStart: 5 },
  { book: 23, chapter: 26, verseStart: 3 },
  { book: 23, chapter: 40, verseStart: 29 },
  // Jeremías
  { book: 24, chapter: 29, verseStart: 11 },
  { book: 24, chapter: 33, verseStart: 3 },
  // Filipenses
  { book: 50, chapter: 4,  verseStart: 6, verseEnd: 7 },
  { book: 50, chapter: 4,  verseStart: 13 },
  { book: 50, chapter: 4,  verseStart: 19 },
  // Romanos
  { book: 45, chapter: 8,  verseStart: 28 },
  { book: 45, chapter: 8,  verseStart: 38, verseEnd: 39 },
  { book: 45, chapter: 12, verseStart: 2 },
  { book: 45, chapter: 10, verseStart: 9 },
  // Mateo
  { book: 40, chapter: 5,  verseStart: 16 },
  { book: 40, chapter: 6,  verseStart: 33 },
  { book: 40, chapter: 6,  verseStart: 34 },
  { book: 40, chapter: 11, verseStart: 28, verseEnd: 30 },
  { book: 40, chapter: 22, verseStart: 37, verseEnd: 39 },
  { book: 40, chapter: 28, verseStart: 20 },
  // Marcos
  { book: 41, chapter: 10, verseStart: 27 },
  { book: 41, chapter: 11, verseStart: 24 },
  // Lucas
  { book: 42, chapter: 1,  verseStart: 37 },
  { book: 42, chapter: 11, verseStart: 9 },
  // Efesios
  { book: 49, chapter: 2,  verseStart: 8, verseEnd: 9 },
  { book: 49, chapter: 2,  verseStart: 10 },
  { book: 49, chapter: 3,  verseStart: 20 },
  { book: 49, chapter: 6,  verseStart: 10, verseEnd: 11 },
  // Gálatas
  { book: 48, chapter: 2,  verseStart: 20 },
  { book: 48, chapter: 5,  verseStart: 22, verseEnd: 23 },
  // Hebreos
  { book: 58, chapter: 11, verseStart: 1 },
  { book: 58, chapter: 13, verseStart: 8 },
  { book: 58, chapter: 4,  verseStart: 16 },
  // 1 Corintios
  { book: 46, chapter: 13, verseStart: 4, verseEnd: 7 },
  { book: 46, chapter: 10, verseStart: 13 },
  // 2 Corintios
  { book: 47, chapter: 5,  verseStart: 17 },
  { book: 47, chapter: 12, verseStart: 9 },
  // Santiago
  { book: 59, chapter: 1,  verseStart: 2, verseEnd: 4 },
  { book: 59, chapter: 1,  verseStart: 17 },
  // 1 Pedro
  { book: 60, chapter: 5,  verseStart: 7 },
  { book: 60, chapter: 5,  verseStart: 8 },
  // 1 Juan
  { book: 62, chapter: 4,  verseStart: 8 },
  { book: 62, chapter: 4,  verseStart: 18 },
  { book: 62, chapter: 1,  verseStart: 9 },
  // Colosenses
  { book: 51, chapter: 3,  verseStart: 23 },
  { book: 51, chapter: 3,  verseStart: 2 },
  // Génesis
  { book: 1,  chapter: 1,  verseStart: 1 },
  // Josué
  { book: 6,  chapter: 1,  verseStart: 9 },
  { book: 6,  chapter: 24, verseStart: 15 },
  // Deuteronomio
  { book: 5,  chapter: 31, verseStart: 8 },
  // Números
  { book: 4,  chapter: 6,  verseStart: 24, verseEnd: 26 },
  // Lamentaciones
  { book: 25, chapter: 3,  verseStart: 22, verseEnd: 23 },
  // Sofonías
  { book: 36, chapter: 3,  verseStart: 17 },
  // Nahúm
  { book: 34, chapter: 1,  verseStart: 7 },
  // Habacuc
  { book: 35, chapter: 2,  verseStart: 4 },
  // Eclesiastés
  { book: 21, chapter: 3,  verseStart: 1 },
  // Miqueas
  { book: 33, chapter: 6,  verseStart: 8 },
  // Zacarías
  { book: 38, chapter: 4,  verseStart: 6 },
  // Malaquías
  { book: 39, chapter: 3,  verseStart: 10 },
  // Hechos
  { book: 44, chapter: 1,  verseStart: 8 },
  { book: 44, chapter: 2,  verseStart: 38 },
  // Apocalipsis
  { book: 66, chapter: 21, verseStart: 4 },
  { book: 66, chapter: 3,  verseStart: 20 },
  // 1 Tesalonicenses
  { book: 52, chapter: 5,  verseStart: 16, verseEnd: 18 },
  // 2 Timoteo
  { book: 55, chapter: 1,  verseStart: 7 },
];

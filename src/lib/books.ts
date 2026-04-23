// src/lib/books.ts
import { normalize } from "@/lib/cite";

export type Book = {
  id: number;
  name: string;
  abbr: string;
  chapters: number;
  testament: "AT" | "NT";
};

export const BOOKS: Book[] = [
  { id: 1,  name: "Génesis",           abbr: "Gn",  chapters: 50,  testament: "AT" },
  { id: 2,  name: "Éxodo",             abbr: "Ex",  chapters: 40,  testament: "AT" },
  { id: 3,  name: "Levítico",          abbr: "Lv",  chapters: 27,  testament: "AT" },
  { id: 4,  name: "Números",           abbr: "Nm",  chapters: 36,  testament: "AT" },
  { id: 5,  name: "Deuteronomio",      abbr: "Dt",  chapters: 34,  testament: "AT" },
  { id: 6,  name: "Josué",             abbr: "Jos", chapters: 24,  testament: "AT" },
  { id: 7,  name: "Jueces",            abbr: "Jue", chapters: 21,  testament: "AT" },
  { id: 8,  name: "Rut",               abbr: "Rt",  chapters: 4,   testament: "AT" },
  { id: 9,  name: "1 Samuel",          abbr: "1S",  chapters: 31,  testament: "AT" },
  { id: 10, name: "2 Samuel",          abbr: "2S",  chapters: 24,  testament: "AT" },
  { id: 11, name: "1 Reyes",           abbr: "1R",  chapters: 22,  testament: "AT" },
  { id: 12, name: "2 Reyes",           abbr: "2R",  chapters: 25,  testament: "AT" },
  { id: 13, name: "1 Crónicas",        abbr: "1Cr", chapters: 29,  testament: "AT" },
  { id: 14, name: "2 Crónicas",        abbr: "2Cr", chapters: 36,  testament: "AT" },
  { id: 15, name: "Esdras",            abbr: "Esd", chapters: 10,  testament: "AT" },
  { id: 16, name: "Nehemías",          abbr: "Neh", chapters: 13,  testament: "AT" },
  { id: 17, name: "Ester",             abbr: "Est", chapters: 10,  testament: "AT" },
  { id: 18, name: "Job",               abbr: "Job", chapters: 42,  testament: "AT" },
  { id: 19, name: "Salmos",            abbr: "Sal", chapters: 150, testament: "AT" },
  { id: 20, name: "Proverbios",        abbr: "Pr",  chapters: 31,  testament: "AT" },
  { id: 21, name: "Eclesiastés",       abbr: "Ec",  chapters: 12,  testament: "AT" },
  { id: 22, name: "Cantares",          abbr: "Cnt", chapters: 8,   testament: "AT" },
  { id: 23, name: "Isaías",            abbr: "Is",  chapters: 66,  testament: "AT" },
  { id: 24, name: "Jeremías",          abbr: "Jer", chapters: 52,  testament: "AT" },
  { id: 25, name: "Lamentaciones",     abbr: "Lm",  chapters: 5,   testament: "AT" },
  { id: 26, name: "Ezequiel",          abbr: "Ez",  chapters: 48,  testament: "AT" },
  { id: 27, name: "Daniel",            abbr: "Dn",  chapters: 12,  testament: "AT" },
  { id: 28, name: "Oseas",             abbr: "Os",  chapters: 14,  testament: "AT" },
  { id: 29, name: "Joel",              abbr: "Jl",  chapters: 3,   testament: "AT" },
  { id: 30, name: "Amós",              abbr: "Am",  chapters: 9,   testament: "AT" },
  { id: 31, name: "Abdías",            abbr: "Abd", chapters: 1,   testament: "AT" },
  { id: 32, name: "Jonás",             abbr: "Jon", chapters: 4,   testament: "AT" },
  { id: 33, name: "Miqueas",           abbr: "Mi",  chapters: 7,   testament: "AT" },
  { id: 34, name: "Nahúm",             abbr: "Nah", chapters: 3,   testament: "AT" },
  { id: 35, name: "Habacuc",           abbr: "Hab", chapters: 3,   testament: "AT" },
  { id: 36, name: "Sofonías",          abbr: "Sof", chapters: 3,   testament: "AT" },
  { id: 37, name: "Hageo",             abbr: "Hag", chapters: 2,   testament: "AT" },
  { id: 38, name: "Zacarías",          abbr: "Zac", chapters: 14,  testament: "AT" },
  { id: 39, name: "Malaquías",         abbr: "Mal", chapters: 4,   testament: "AT" },
  { id: 40, name: "Mateo",             abbr: "Mt",  chapters: 28,  testament: "NT" },
  { id: 41, name: "Marcos",            abbr: "Mr",  chapters: 16,  testament: "NT" },
  { id: 42, name: "Lucas",             abbr: "Lc",  chapters: 24,  testament: "NT" },
  { id: 43, name: "Juan",              abbr: "Jn",  chapters: 21,  testament: "NT" },
  { id: 44, name: "Hechos",            abbr: "Hch", chapters: 28,  testament: "NT" },
  { id: 45, name: "Romanos",           abbr: "Ro",  chapters: 16,  testament: "NT" },
  { id: 46, name: "1 Corintios",       abbr: "1Co", chapters: 16,  testament: "NT" },
  { id: 47, name: "2 Corintios",       abbr: "2Co", chapters: 13,  testament: "NT" },
  { id: 48, name: "Gálatas",           abbr: "Gá",  chapters: 6,   testament: "NT" },
  { id: 49, name: "Efesios",           abbr: "Ef",  chapters: 6,   testament: "NT" },
  { id: 50, name: "Filipenses",        abbr: "Fil", chapters: 4,   testament: "NT" },
  { id: 51, name: "Colosenses",        abbr: "Col", chapters: 4,   testament: "NT" },
  { id: 52, name: "1 Tesalonicenses",  abbr: "1Ts", chapters: 5,   testament: "NT" },
  { id: 53, name: "2 Tesalonicenses",  abbr: "2Ts", chapters: 3,   testament: "NT" },
  { id: 54, name: "1 Timoteo",         abbr: "1Ti", chapters: 6,   testament: "NT" },
  { id: 55, name: "2 Timoteo",         abbr: "2Ti", chapters: 4,   testament: "NT" },
  { id: 56, name: "Tito",              abbr: "Tit", chapters: 3,   testament: "NT" },
  { id: 57, name: "Filemón",           abbr: "Flm", chapters: 1,   testament: "NT" },
  { id: 58, name: "Hebreos",           abbr: "He",  chapters: 13,  testament: "NT" },
  { id: 59, name: "Santiago",          abbr: "Stg", chapters: 5,   testament: "NT" },
  { id: 60, name: "1 Pedro",           abbr: "1P",  chapters: 5,   testament: "NT" },
  { id: 61, name: "2 Pedro",           abbr: "2P",  chapters: 3,   testament: "NT" },
  { id: 62, name: "1 Juan",            abbr: "1Jn", chapters: 5,   testament: "NT" },
  { id: 63, name: "2 Juan",            abbr: "2Jn", chapters: 1,   testament: "NT" },
  { id: 64, name: "3 Juan",            abbr: "3Jn", chapters: 1,   testament: "NT" },
  { id: 65, name: "Judas",             abbr: "Jud", chapters: 1,   testament: "NT" },
  { id: 66, name: "Apocalipsis",       abbr: "Ap",  chapters: 22,  testament: "NT" },
];

// Mapa de aliases: clave normalizada → bookId
const ALIASES: Record<string, number> = {};

// Aliases adicionales
const EXTRA_ALIASES: Array<[string, number]> = [
  ["gen", 1], ["gn", 1],
  ["exo", 2], ["ex", 2],
  ["lev", 3], ["lv", 3],
  ["num", 4], ["nm", 4],
  ["deu", 5], ["dt", 5],
  ["jos", 6],
  ["jue", 7], ["jdg", 7],
  ["ru", 8], ["rt", 8],
  ["1sam", 9], ["1s", 9], ["i samuel", 9],
  ["2sam", 10], ["2s", 10], ["ii samuel", 10],
  ["1re", 11], ["1r", 11], ["i reyes", 11],
  ["2re", 12], ["2r", 12], ["ii reyes", 12],
  ["1cr", 13], ["1cro", 13], ["i cronicas", 13],
  ["2cr", 14], ["2cro", 14], ["ii cronicas", 14],
  ["esd", 15], ["ezr", 15],
  ["neh", 16],
  ["est", 17], ["esth", 17],
  ["job", 18],
  ["sal", 19], ["ps", 19], ["psa", 19], ["salmo", 19],
  ["pr", 20], ["prov", 20], ["pro", 20],
  ["ec", 21], ["ecc", 21], ["ecl", 21],
  ["cnt", 22], ["can", 22], ["cantar de los cantares", 22],
  ["is", 23], ["isa", 23],
  ["jer", 24],
  ["lm", 25], ["lam", 25],
  ["ez", 26], ["eze", 26],
  ["dn", 27], ["dan", 27],
  ["os", 28], ["ho", 28],
  ["jl", 29],
  ["am", 30], ["amo", 30],
  ["abd", 31], ["ob", 31],
  ["jon", 32],
  ["mi", 33], ["mic", 33],
  ["nah", 34], ["na", 34],
  ["hab", 35],
  ["sof", 36], ["zep", 36],
  ["hag", 37],
  ["zac", 38], ["zech", 38],
  ["mal", 39],
  ["mt", 40], ["mat", 40],
  ["mr", 41], ["mk", 41], ["mar", 41],
  ["lc", 42], ["lk", 42], ["lu", 42],
  ["jn", 43], ["jua", 43], ["joh", 43],
  ["hch", 44], ["act", 44],
  ["ro", 45], ["rom", 45],
  ["1co", 46], ["1cor", 46], ["i corintios", 46],
  ["2co", 47], ["2cor", 47], ["ii corintios", 47],
  ["ga", 48], ["gal", 48],
  ["ef", 49], ["efe", 49], ["eph", 49],
  ["fil", 50], ["flp", 50], ["php", 50],
  ["col", 51],
  ["1ts", 52], ["1tes", 52], ["i tesalonicenses", 52],
  ["2ts", 53], ["2tes", 53], ["ii tesalonicenses", 53],
  ["1ti", 54], ["1tim", 54], ["i timoteo", 54],
  ["2ti", 55], ["2tim", 55], ["ii timoteo", 55],
  ["tit", 56], ["ti", 56],
  ["flm", 57], ["phm", 57],
  ["he", 58], ["heb", 58],
  ["stg", 59], ["jas", 59],
  ["1p", 60], ["1pe", 60], ["1ped", 60], ["i pedro", 60],
  ["2p", 61], ["2pe", 61], ["2ped", 61], ["ii pedro", 61],
  ["1jn", 62], ["1ju", 62], ["i juan", 62],
  ["2jn", 63], ["2ju", 63], ["ii juan", 63],
  ["3jn", 64], ["3ju", 64], ["iii juan", 64],
  ["jud", 65],
  ["ap", 66], ["apo", 66], ["rev", 66],
];

// Poblar el mapa
for (const book of BOOKS) {
  const normName = normalize(book.name);
  ALIASES[normName] = book.id;
  // También registrar sin espacios (ej. "1 samuel" → "1samuel")
  ALIASES[normName.replace(/\s/g, "")] = book.id;
  ALIASES[normalize(book.abbr)] = book.id;
}
for (const [alias, id] of EXTRA_ALIASES) {
  const normAlias = normalize(alias);
  ALIASES[normAlias] = id;
  ALIASES[normAlias.replace(/\s/g, "")] = id;
}

export function bookByName(name: string): Book | null {
  const key = normalize(name);
  const id = ALIASES[key];
  if (id) return bookById(id) ?? null;

  // Probar sin espacios (ej. "1Pedro" → "1pedro")
  const noSpace = key.replace(/\s/g, "");
  const id2 = ALIASES[noSpace];
  if (id2) return bookById(id2) ?? null;

  return null;
}

export function bookById(id: number): Book | null {
  return BOOKS.find((b) => b.id === id) ?? null;
}

export function formatReference({
  bookId,
  chapter,
  verseStart,
  verseEnd,
}: {
  bookId: number;
  chapter: number;
  verseStart: number;
  verseEnd: number | null;
}): string {
  const book = bookById(bookId);
  const bookName = book?.name ?? `Libro ${bookId}`;
  const range = verseEnd !== null ? `${verseStart}-${verseEnd}` : `${verseStart}`;
  return `${bookName} ${chapter}:${range}`;
}

// __tests__/books.test.ts
import { bookByName, bookById, formatReference, BOOKS } from "@/lib/books";

describe("BOOKS", () => {
  it("tiene exactamente 66 libros", () => {
    expect(BOOKS).toHaveLength(66);
  });
  it("el id 1 es Génesis", () => {
    expect(BOOKS[0].id).toBe(1);
    expect(BOOKS[0].name).toBe("Génesis");
  });
  it("el id 66 es Apocalipsis", () => {
    expect(BOOKS[65].id).toBe(66);
    expect(BOOKS[65].name).toBe("Apocalipsis");
  });
});

describe("bookByName", () => {
  it("encuentra por nombre exacto con acento", () => {
    expect(bookByName("Génesis")?.id).toBe(1);
  });
  it("encuentra sin acento", () => {
    expect(bookByName("Genesis")?.id).toBe(1);
  });
  it("encuentra por abreviatura", () => {
    expect(bookByName("Gn")?.id).toBe(1);
    expect(bookByName("Sal")?.id).toBe(19);
    expect(bookByName("Fil")?.id).toBe(50);
  });
  it("maneja libros numerados: '1 Pedro'", () => {
    expect(bookByName("1 Pedro")?.id).toBe(60);
    expect(bookByName("1Pedro")?.id).toBe(60);
    expect(bookByName("1P")?.id).toBe(60);
  });
  it("devuelve null si no encuentra", () => {
    expect(bookByName("Tolkien")).toBeNull();
  });
});

describe("bookById", () => {
  it("encuentra por id", () => {
    expect(bookById(50)?.name).toBe("Filipenses");
  });
  it("devuelve null si id inválido", () => {
    expect(bookById(99)).toBeNull();
  });
});

describe("formatReference", () => {
  it("versículo único", () => {
    expect(formatReference({ bookId: 50, chapter: 4, verseStart: 13, verseEnd: null })).toBe("Filipenses 4:13");
  });
  it("rango de versículos", () => {
    expect(formatReference({ bookId: 50, chapter: 4, verseStart: 6, verseEnd: 7 })).toBe("Filipenses 4:6-7");
  });
  it("Salmos con acento", () => {
    expect(formatReference({ bookId: 19, chapter: 23, verseStart: 1, verseEnd: null })).toBe("Salmos 23:1");
  });
});

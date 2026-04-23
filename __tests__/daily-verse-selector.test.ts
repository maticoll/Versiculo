// __tests__/daily-verse-selector.test.ts
import { getDailyVerse } from "@/lib/daily-verse-selector";

describe("getDailyVerse", () => {
  it("devuelve un objeto con book, chapter, verseStart", () => {
    const v = getDailyVerse(new Date("2026-01-01"));
    expect(v).toHaveProperty("book");
    expect(v).toHaveProperty("chapter");
    expect(v).toHaveProperty("verseStart");
    expect(typeof v.book).toBe("number");
  });

  it("es determinístico: misma fecha → mismo versículo", () => {
    const date = new Date("2026-04-23");
    expect(getDailyVerse(date)).toEqual(getDailyVerse(date));
  });

  it("fechas distintas suelen dar versículos distintos", () => {
    const a = getDailyVerse(new Date("2026-01-01"));
    const b = getDailyVerse(new Date("2026-06-15"));
    expect(a).not.toEqual(b);
  });
});

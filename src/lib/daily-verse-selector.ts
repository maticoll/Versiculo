// src/lib/daily-verse-selector.ts
import { DAILY_VERSES, type DailyVerseRef } from "@/data/daily-verses";

function hashDate(date: Date): number {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const str = `${y}-${m}-${d}`; // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getDailyVerse(date: Date = new Date()): DailyVerseRef {
  const index = hashDate(date) % DAILY_VERSES.length;
  return DAILY_VERSES[index];
}

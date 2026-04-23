// src/lib/translations.ts
import type { TranslationCode } from "@/types/bible";

export type Translation = {
  code: TranslationCode;
  name: string;
  lang: string;
  label: string;
};

export const TRANSLATIONS: Record<TranslationCode, Translation> = {
  RV1909: { code: "RV1909", name: "Reina-Valera 1909", lang: "es", label: "Español (antigua)" },
  DHH:    { code: "DHH",    name: "Dios Habla Hoy",    lang: "es", label: "Español (pastoral)" },
  KJV:    { code: "KJV",    name: "King James Version", lang: "en", label: "Inglés (clásica)" },
} as const;

export const DEFAULT_TRANSLATION: TranslationCode = "RV1909";
export const TRANSLATION_CODES = Object.keys(TRANSLATIONS) as TranslationCode[];

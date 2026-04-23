// src/hooks/use-translation.ts
"use client";

import { useState, useEffect } from "react";
import { DEFAULT_TRANSLATION, TRANSLATION_CODES } from "@/lib/translations";
import type { TranslationCode } from "@/types/bible";

const STORAGE_KEY = "versiculo:translation";

function loadTranslation(): TranslationCode {
  if (typeof window === "undefined") return DEFAULT_TRANSLATION;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (TRANSLATION_CODES as string[]).includes(stored)) {
      return stored as TranslationCode;
    }
  } catch {}
  return DEFAULT_TRANSLATION;
}

export function useTranslation() {
  const [translation, setTranslationState] = useState<TranslationCode>(DEFAULT_TRANSLATION);

  useEffect(() => {
    setTranslationState(loadTranslation());
  }, []);

  function setTranslation(code: TranslationCode) {
    setTranslationState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  }

  return { translation, setTranslation };
}

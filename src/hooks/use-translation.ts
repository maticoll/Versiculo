// src/hooks/use-translation.ts
"use client";

import { useCallback, useSyncExternalStore } from "react";
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

function subscribe(callback: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) callback();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function useTranslation() {
  const translation = useSyncExternalStore(
    subscribe,
    loadTranslation,
    () => DEFAULT_TRANSLATION,
  );

  const setTranslation = useCallback((code: TranslationCode) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
    // Notify same-tab listeners
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return { translation, setTranslation };
}

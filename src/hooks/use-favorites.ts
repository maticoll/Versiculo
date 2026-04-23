// src/hooks/use-favorites.ts
"use client";

import { useState, useEffect } from "react";
import type { FavoriteItem } from "@/types/bible";

const STORAGE_KEY = "versiculo:favorites:v1";

function loadFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: FavoriteItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setFavorites(loadFavorites());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function add(item: FavoriteItem) {
    setFavorites((prev) => {
      if (prev.some((f) => f.reference === item.reference && f.translationCode === item.translationCode)) {
        return prev;
      }
      const next = [item, ...prev];
      saveFavorites(next);
      return next;
    });
  }

  function remove(reference: string, translationCode: string) {
    setFavorites((prev) => {
      const next = prev.filter(
        (f) => !(f.reference === reference && f.translationCode === translationCode),
      );
      saveFavorites(next);
      return next;
    });
  }

  function has(reference: string, translationCode: string): boolean {
    return favorites.some(
      (f) => f.reference === reference && f.translationCode === translationCode,
    );
  }

  function clear() {
    setFavorites([]);
    saveFavorites([]);
  }

  return { favorites, add, remove, has, clear };
}

// src/hooks/use-favorites.ts
"use client";

import { useSyncExternalStore } from "react";
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

// Dispatch a custom event so all hook instances re-read storage
function notifyFavoritesChange() {
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

function subscribe(callback: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) callback();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function getSnapshot(): FavoriteItem[] {
  return loadFavorites();
}

function getServerSnapshot(): FavoriteItem[] {
  return [];
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function add(item: FavoriteItem) {
    const prev = loadFavorites();
    if (prev.some((f) => f.reference === item.reference && f.translationCode === item.translationCode)) {
      return;
    }
    saveFavorites([item, ...prev]);
    notifyFavoritesChange();
  }

  function remove(reference: string, translationCode: string) {
    const prev = loadFavorites();
    saveFavorites(
      prev.filter(
        (f) => !(f.reference === reference && f.translationCode === translationCode),
      ),
    );
    notifyFavoritesChange();
  }

  function has(reference: string, translationCode: string): boolean {
    return favorites.some(
      (f) => f.reference === reference && f.translationCode === translationCode,
    );
  }

  function clear() {
    saveFavorites([]);
    notifyFavoritesChange();
  }

  return { favorites, add, remove, has, clear };
}

// src/components/translation-selector.tsx
"use client";

import { TRANSLATIONS, TRANSLATION_CODES } from "@/lib/translations";
import { useTranslation } from "@/hooks/use-translation";
import type { TranslationCode } from "@/types/bible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value?: TranslationCode;
  onChange?: (code: TranslationCode) => void;
};

export function TranslationSelector({ value, onChange }: Props) {
  const { translation, setTranslation } = useTranslation();
  const current = value ?? translation;

  function handleChange(code: TranslationCode | null) {
    if (!code) return;
    setTranslation(code);
    onChange?.(code);
  }

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-[160px]" aria-label="Seleccionar traducción">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TRANSLATION_CODES.map((code) => (
          <SelectItem key={code} value={code}>
            {TRANSLATIONS[code].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

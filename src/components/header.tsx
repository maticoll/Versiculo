// src/components/header.tsx
import Link from "next/link";
import { BookOpen, Heart, Library } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TranslationSelector } from "@/components/translation-selector";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Inicio"
        >
          <BookOpen className="h-5 w-5 text-[var(--accent-bible)]" />
          <span>Versículo</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <Link href="/leer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Library className="inline h-4 w-4 mr-1" />
            Leer
          </Link>
          <Link href="/favoritos" className="text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="inline h-4 w-4 mr-1" />
            Favoritos
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <TranslationSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

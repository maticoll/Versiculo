"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BOOKS } from "@/lib/books";
import { TRANSLATIONS, TRANSLATION_CODES } from "@/lib/translations";
import type { TranslationCode, BollsVerse } from "@/types/bible";

type Props = {
  translation: TranslationCode;
  bookId: number;
  chapter: number;
  totalChapters: number;
  verses: BollsVerse[];
  bookName: string;
};

export function BibleNavigator({
  translation,
  bookId,
  chapter,
  totalChapters,
  verses,
  bookName,
}: Props) {
  const router = useRouter();
  const [openBook, setOpenBook] = useState<number | null>(bookId);

  function navigate(newBook: number, newChapter: number) {
    router.push(`/leer/${translation}/${newBook}/${newChapter}`);
  }

  const atBooks = BOOKS.filter((b) => b.testament === "AT");
  const ntBooks = BOOKS.filter((b) => b.testament === "NT");

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Sheet sidebar trigger */}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Abrir índice" />
              }
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 sm:max-w-72">
              <SheetHeader className="px-4 pt-4 pb-2">
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Libros de la Biblia
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="p-2">
                  {/* Antiguo Testamento */}
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Antiguo Testamento
                  </p>
                  {atBooks.map((book) => (
                    <div key={book.id}>
                      <button
                        className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                        onClick={() =>
                          setOpenBook(openBook === book.id ? null : book.id)
                        }
                        aria-expanded={openBook === book.id}
                      >
                        {book.name}
                      </button>
                      {openBook === book.id && (
                        <div className="ml-3 mb-1 flex flex-wrap gap-1 py-1">
                          {Array.from({ length: book.chapters }, (_, i) => i + 1).map(
                            (ch) => (
                              <button
                                key={ch}
                                onClick={() => navigate(book.id, ch)}
                                className={`w-8 h-8 text-xs rounded-md transition-colors ${
                                  book.id === bookId && ch === chapter
                                    ? "bg-primary text-primary-foreground font-semibold"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                                aria-label={`${book.name} capítulo ${ch}`}
                              >
                                {ch}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <Separator className="my-2" />

                  {/* Nuevo Testamento */}
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nuevo Testamento
                  </p>
                  {ntBooks.map((book) => (
                    <div key={book.id}>
                      <button
                        className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                        onClick={() =>
                          setOpenBook(openBook === book.id ? null : book.id)
                        }
                        aria-expanded={openBook === book.id}
                      >
                        {book.name}
                      </button>
                      {openBook === book.id && (
                        <div className="ml-3 mb-1 flex flex-wrap gap-1 py-1">
                          {Array.from({ length: book.chapters }, (_, i) => i + 1).map(
                            (ch) => (
                              <button
                                key={ch}
                                onClick={() => navigate(book.id, ch)}
                                className={`w-8 h-8 text-xs rounded-md transition-colors ${
                                  book.id === bookId && ch === chapter
                                    ? "bg-primary text-primary-foreground font-semibold"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                                aria-label={`${book.name} capítulo ${ch}`}
                              >
                                {ch}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div>
            <p className="font-semibold">
              {bookName} {chapter}
            </p>
          </div>
        </div>

        {/* Translation selector */}
        <Select
          value={translation}
          onValueChange={(val) => {
            router.push(`/leer/${val}/${bookId}/${chapter}`);
          }}
        >
          <SelectTrigger aria-label="Seleccionar traducción">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRANSLATION_CODES.map((code) => (
              <SelectItem key={code} value={code}>
                {TRANSLATIONS[code].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Prev/Next chapter buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            disabled={chapter <= 1}
            aria-label="Capítulo anterior"
            onClick={() => navigate(bookId, chapter - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={chapter >= totalChapters}
            aria-label="Capítulo siguiente"
            onClick={() => navigate(bookId, chapter + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chapter text */}
      <div className="mx-auto max-w-2xl w-full">
        <p className="font-serif text-lg leading-relaxed md:text-xl">
          {verses.map((v) => (
            <span key={v.verse}>
              <sup className="mr-0.5 text-xs font-sans text-muted-foreground select-none">
                {v.verse}
              </sup>
              {v.text}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

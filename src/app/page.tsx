// src/app/page.tsx
import { Suspense } from "react";
import { HeroSearch } from "@/components/hero-search";
import { DailyVerse } from "@/components/daily-verse";
import { Skeleton } from "@/components/ui/skeleton";

// Cache the page (and the DailyVerse Server Component) for 24h
export const revalidate = 86400;

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSearch />
      <Suspense fallback={<Skeleton className="h-48 w-full rounded-xl" />}>
        <DailyVerse />
      </Suspense>
    </div>
  );
}

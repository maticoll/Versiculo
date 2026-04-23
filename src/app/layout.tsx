// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Versículo — Búsqueda bíblica semántica",
  description: "Encontrá el versículo que necesitás. Buscá por tema, emoción o situación.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>
          <footer className="mt-16 border-t py-6 text-center text-xs text-muted-foreground">
            Texto bíblico provisto por{" "}
            <a href="https://getbible.net" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              GetBible.net
            </a>
          </footer>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

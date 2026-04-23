# Versículo

App web de búsqueda semántica de versículos bíblicos. Describís una situación o emoción y la app te muestra los versículos más relevantes.

## Stack

- Next.js 16+ (App Router)
- TypeScript strict
- Tailwind CSS + shadcn/ui
- OpenAI (gpt-4o-mini) para búsqueda semántica
- [Bolls.life](https://bolls.life) como fuente de texto bíblico (gratuita)

## Setup local

1. Clonar el repo e instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de ejemplo y completarlo:

   ```bash
   cp .env.local.example .env.local
   ```

   Abrí `.env.local` y completá:

   ```
   OPENAI_API_KEY=sk-...        # Obtené tu key en https://platform.openai.com/api-keys
   OPENAI_MODEL=gpt-4o-mini     # Opcional, este es el default
   ```

3. Correr en modo desarrollo:

   ```bash
   npm run dev
   ```

   Abrí [http://localhost:3000](http://localhost:3000).

## Deploy en Vercel

1. Subí el código a un repositorio de GitHub.
2. Conectá el repo en [vercel.com](https://vercel.com).
3. En **Settings > Environment Variables**, agregá `OPENAI_API_KEY` con tu key.
4. Deploy automático en cada push a `main`.

## Créditos

Texto bíblico provisto por [Bolls.life](https://bolls.life) — API gratuita sin registro.

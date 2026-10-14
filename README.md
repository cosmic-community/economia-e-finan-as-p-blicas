# Economia e Finanças Públicas
![App Preview](https://imgix.cosmicjs.com/c47069e0-c801-11f1-a3c9-bf78c9330c52-autopilot-photo-1526304640581-d334cdbbf45e-1792004534128.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

Site de estudos em pt-BR sobre Economia e Finanças Públicas, organizado em 35 macro-tópicos numerados, com áreas de interface relacionadas, construído em Next.js 16 e Cosmic.

## Features

- 📋 Lista numerada corrida dos 35 macro-tópicos na home, ordenada pelo campo `numero`
- 🔎 Busca/filtro por texto (número, título ou resumo) em tempo real
- 📄 Página de detalhe por tópico com imagem, resumo, conteúdo rich-text renderizado e selos de áreas
- ⬅️➡️ Navegação anterior/próximo pela numeração dos macro-tópicos
- 🔗 Páginas de Áreas de Interface com listagem dos tópicos relacionados a cada área
- 🎨 Visual acadêmico: tipografia serifada, azul-marinho, responsivo e acessível

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6acfd173f4baca22c5f5aa37&clone_repository=6acfd48bf4baca22c5f5aacc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Pesquise a fundo e elabore   macro-tópicos de Economia e finanças públicas, esgote totalmente o tema, em lista numerada corrida, sem partes, eixos ou agrupamentos. Cada macro-tópico deve ser um tema autônomo e do mesmo nível hierárquico. Não divida um mesmo instituto em subtipos. Nenhum tópico pode estar contido em outro. Se precisar, inclua interfaces com outros ramos da area em questão. Sem erros. Entregar em HTML. Não acione nenhum subagentes. Elabore com 35 macro-tópicos sendo abordado todo o tema esgotado nesses 35, atenção não deixe nada de fora do que envolve o tema.

### Code Generation Prompt

> Build a Next.js application for a content management system called "Economia e Finanças Públicas". The content is managed in Cosmic CMS with the following object types: macro-topicos, areas-interface. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Site de estudos em português (pt-BR) sobre Economia e Finanças Públicas, organizado em 35 macro-tópicos numerados. Use os tipos de conteúdo existentes: "macro-topicos" (numero, resumo, conteudo em rich-text, areas_interface relacionando "areas-interface", imagem) e "areas-interface" (descricao, cor). Páginas: (1) Home com título, introdução e lista numerada corrida dos 35 macro-tópicos ordenados pelo campo numero, cada um com número, título e resumo, além de busca/filtro por texto; (2) Página de detalhe de cada macro-tópico (/topicos/[slug]) com número, título, imagem, resumo, conteúdo rich-text renderizado e selos coloridos das áreas de interface, com navegação anterior/próximo pela numeração; (3) Página de áreas de interface (/areas e /areas/[slug]) listando os macro-tópicos relacionados a cada área. Visual acadêmico e limpo: tipografia serifada nos títulos, azul-marinho como cor principal, leitura confortável, responsivo, acessível.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/docs) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com) ([docs](https://www.cosmicjs.com/docs))
- Bun as package manager/runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `macro-topicos` and `areas-interface` object types

### Installation

```bash
bun install
```

Set your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY are configured automatically in this platform).

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
// Fetch all macro-tópicos, sorted by numero
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'macro-topicos' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

const topicos = response.objects.sort(
  (a, b) => (a.metadata?.numero ?? 0) - (b.metadata?.numero ?? 0)
)
```

```typescript
// Fetch macro-tópicos related to an area of interface
const response = await cosmic.objects
  .find({ type: 'macro-topicos', 'metadata.areas_interface': areaId })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from two object types in your Cosmic bucket:

- **macro-topicos**: `numero` (number), `resumo` (text), `conteudo` (rich-text), `areas_interface` (relation to areas-interface), `imagem` (file)
- **areas-interface**: `descricao` (text), `cor` (text/hex color)

Content changes made in your [Cosmic dashboard](https://www.cosmicjs.com) are reflected automatically on next build/revalidation — no code changes required to add or edit macro-tópicos and áreas.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Build command: `bun run build`, publish directory: `.next`
4. Add the same environment variables
5. Deploy

<!-- README_END -->
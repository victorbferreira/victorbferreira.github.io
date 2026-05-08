# design.md — Arquitetura e Design System

## Stack Técnica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | **Next.js 15** (App Router) | SSG nativo, next/image, SEO via Metadata API |
| Estilo | **Tailwind CSS v4** | Utility-first, `oklch()` colors, sem build step extra |
| Linguagem | **TypeScript** | Tipagem para o JSON, autocompletar no VSCode |
| Fontes | **Inter + Inter Tight** self-hosted | Sem dependência de CDN externo; TTFB melhor |
| Animações | **Framer Motion** | whileInView para entrada scroll; sem GSAP |
| Deploy | **Vercel** | Deploy automático via Git; plano Free suficiente |
| Dados | `cv_database.json` importado como módulo TypeScript | Sem banco de dados; SSG puro |

---

## Estrutura de Pastas

```
victor-site/
├── app/
│   ├── layout.tsx          # RootLayout: meta, fonts, providers
│   ├── page.tsx            # Home — composição de todas as sections
│   ├── globals.css         # Tailwind directives + CSS vars
│   └── portfolio/
│       └── [id]/
│           └── page.tsx    # Página de detalhe do projeto (opcional v2)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx  # Lista + accordion
│   │   ├── Portfolio.tsx   # Grid + filtros
│   │   ├── Education.tsx
│   │   ├── Publications.tsx
│   │   ├── Teaching.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── AccordionItem.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── StatBadge.tsx
│   │   ├── TagCloud.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── NavBar.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── data/
│   └── cv_database.json    # Fonte única de verdade
├── lib/
│   ├── types.ts            # Interfaces TypeScript do JSON
│   └── utils.ts            # Helpers (filtros, formatação de datas)
├── public/
│   ├── fonts/              # Inter + Inter Tight .woff2
│   ├── images/             # Foto do Victor, logos de clientes
│   └── og-image.jpg        # 1200×630 para Open Graph
└── next.config.ts
```

---

## Design System

### Paleta de Cores

```css
/* globals.css — light mode */
:root {
  --color-bg:        oklch(98% 0 0);       /* branco suave */
  --color-surface:   oklch(100% 0 0);      /* branco puro (cards) */
  --color-border:    oklch(90% 0 0);       /* borda sutil */
  --color-text:      oklch(15% 0 0);       /* quase preto */
  --color-muted:     oklch(50% 0 0);       /* cinza médio */
  --color-accent:    oklch(50% 0.15 250);  /* slate-blue — identidade */
  --color-accent-bg: oklch(95% 0.03 250);  /* fundo tint do acento */
}

/* dark mode */
html.dark {
  --color-bg:        oklch(12% 0 0);
  --color-surface:   oklch(17% 0 0);
  --color-border:    oklch(25% 0 0);
  --color-text:      oklch(92% 0 0);
  --color-muted:     oklch(60% 0 0);
  --color-accent:    oklch(65% 0.15 250);
  --color-accent-bg: oklch(20% 0.05 250);
}
```

### Tipografia

| Uso | Fonte | Peso | Tamanho |
|-----|-------|------|---------|
| Hero nome | Inter Tight | 800 | 5xl–7xl (clamp) |
| Subtítulo hero | Inter | 400 | xl–2xl |
| Headings seções | Inter Tight | 700 | 3xl |
| Body | Inter | 400 | base (16px) |
| Labels / tags | Inter | 500 | sm |
| Metadados | Inter | 400 | xs, `--color-muted` |

### Espaçamento e Layout

- **Max-width principal:** `max-w-3xl` (768px) — layout editorial centralizado
- **Padding lateral:** `px-4 sm:px-6` — respira nos celulares
- **Gap entre seções:** `py-16 sm:py-24`
- **Borda lateral (fundo):** fundo `--color-bg`, card central `--color-surface` com `border-x`

---

## Componentes-Chave

### `<ExperienceCard>` + `<AccordionItem>`

```
┌─────────────────────────────────────────────────────┐
│  [LOGO]  Sophos Governança                  Mar/2025 │
│          Sócio e Consultor                  Atual  ▼ │
│          Sócio e consultor em empresa...            │
└─────────────────────────────────────────────────────┘
    ↓ expand (framer motion AnimatePresence)
┌─────────────────────────────────────────────────────┐
│  Projetos realizados:                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Plano Estratégico Brumadinho 2025–2028    ★  │   │
│  │ Prefeitura de Brumadinho · 2025           →  │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ Adequação Jurídica PCCVS — SAAE           ★  │   │
│  │ SAAE Sete Lagoas · 2025                   →  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface ExperienceCardProps {
  cargo: string
  organizacao: string
  inicio: string
  fim: string
  descricao_curta: string
  projetos_destaque: string[]  // IDs resolvidos para ProjectCard mini
}
```

### `<ProjectCard>`

```
┌─────────────────────────────────────────────────────┐
│  ★  DESTAQUE                           [2025]       │
│  Plano Estratégico Brumadinho 2025–2028             │
│  Prefeitura de Brumadinho                           │
│  Consultoria em Planejamento Estratégico            │
│                                                     │
│  "Lançamento do Plano Estratégico com 159 metas..." │
│                                               [→]   │
└─────────────────────────────────────────────────────┘
```

### `<FilterBar>`

Filtros client-side com `useState`:
- **Tipo:** dropdown ou chips (Avaliação, Consultoria, Assessoria, Pesquisa…)
- **Tema:** chips (Habitação, Saúde, Educação, Gestão Municipal…)
- **Organização:** dropdown (FJP, Sophos, Herkenhoff, CECANE)
- **Destaque:** checkbox "Só projetos em destaque"

Estado gerenciado localmente — sem URL params na v1.

---

## SEO e Meta Tags

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Victor Barcelos Ferreira — Economista e Consultor em Políticas Públicas',
  description: 'Site pessoal de Victor Barcelos Ferreira. Portfolio de projetos em políticas públicas, planejamento estratégico municipal e avaliação de programas sociais. Belo Horizonte, MG.',
  openGraph: {
    title: 'Victor Barcelos Ferreira',
    description: 'Economista e consultor em políticas públicas. Portfólio de 20 projetos.',
    url: 'https://victorbarcelosferreira.com',  // domínio a definir
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}
```

**JSON-LD (Person):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Victor Barcelos Ferreira",
  "jobTitle": "Economista e Consultor em Políticas Públicas",
  "worksFor": { "@type": "Organization", "name": "Sophos Governança" },
  "alumniOf": "Universidade Federal de Viçosa",
  "sameAs": ["https://linkedin.com/in/...", "https://lattes.cnpq.br/..."]
}
```

---

## Animações (Framer Motion)

| Elemento | Animação |
|---------|---------|
| Hero nome | Fade up + delay escalonado por palavra |
| Stats | Counter up (0 → N) ao entrar na viewport |
| Photo grid | Fade in + rotação (odd: -2deg, even: +2deg) |
| Cards de experiência | Slide up ao entrar na viewport (stagger 0.1s) |
| Accordion | `AnimatePresence` + height transition suave |
| Cards de portfólio | Fade in com stagger ao filtrar |
| NavBar | Oculta no topo, aparece ao rolar 100px |

---

## Decisões de Design

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Layout | `max-w-3xl` centralizado | Leiturabilidade ótima, aspecto editorial |
| Cor de acento | `slate-blue` (oklch 250°) | Profissional, diferencia de Guilherme (monocromático) |
| Foto | Editorial + grid 3 fotos | Humaniza; referência Fahrizal/Guilherme |
| Projetos | Accordion dentro de experiência | Hierarquia clara; cv_database já estruturado assim |
| Dados | JSON importado no build | Zero latência; SSG puro; sem API |
| Dark mode | Toggle manual + `html.dark` | Simples, sem biblioteca extra |
| Fonts | Self-hosted | Sem CDN externo, privacidade, performance |
| CMS | Nenhum (v1) | Baixa frequência de atualização; editar JSON é suficiente |

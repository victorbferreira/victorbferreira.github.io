# CLAUDE.md — Site Pessoal Victor Barcelos Ferreira

Este arquivo é lido automaticamente pelo Claude Code ao iniciar.
Leia também `spec/requirements.md`, `spec/design.md` e `spec/tasks.md` antes de qualquer ação.

---

## Contexto do Projeto

Site pessoal com currículo e portfólio. Stack: Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript + Framer Motion. Deploy: Vercel.

**Fonte de dados:** `data/cv_database.json` — arquivo JSON com toda a experiência, portfólio (20 projetos), formação, publicações, habilidades etc. É a única fonte de verdade. Não invente dados — leia sempre do JSON.

**Design:** minimalista editorial, max-w-3xl centralizado, cor de acento slate-blue (`oklch(50% 0.15 250)`), dark mode via `html.dark`, fontes Inter + Inter Tight self-hosted.

---

## Prompt Mestre — Execute Tudo de Uma Vez

Ao receber a instrução **"construa o site completo"**, execute as fases abaixo em sequência, fazendo commit ao final de cada uma. Não pergunte confirmação entre fases — avance automaticamente.

---

### FASE 0 — Setup e Estrutura

1. Confirme que o projeto foi criado com `npx create-next-app@latest` (Next.js 15, App Router, TypeScript, Tailwind)
2. Instale dependências extras:
   ```bash
   npm install framer-motion
   npm install -D @types/node
   ```
3. Crie a estrutura de pastas:
   ```
   app/
   components/sections/
   components/ui/
   components/providers/
   data/          ← copie cv_database.json aqui
   lib/
   public/fonts/
   public/images/
   public/logos/
   spec/          ← copie os .md de spec aqui
   ```
4. Crie `lib/types.ts` com interfaces TypeScript para todos os campos do `cv_database.json`:
   - `Pessoa`, `FormacaoAcademica`, `ExperienciaProfissional`, `PortfolioItem`, `Publicacao`, `Docencia`, `Habilidade`, `ProjetosPesquisa`
5. Crie `lib/data.ts` com funções:
   - `getPessoa()`, `getExperiencias()`, `getPortfolio()`, `getPortfolioById(id)`, `getFormacao()`, `getPublicacoes()`, `getDocencia()`, `getHabilidades()`
   - Todas lendo de `data/cv_database.json` com tipagem correta
6. Configure `app/globals.css` com as CSS variables:
   ```css
   :root {
     --color-bg: oklch(98% 0 0);
     --color-surface: oklch(100% 0 0);
     --color-border: oklch(90% 0 0);
     --color-text: oklch(15% 0 0);
     --color-muted: oklch(50% 0 0);
     --color-accent: oklch(50% 0.15 250);
     --color-accent-bg: oklch(95% 0.03 250);
   }
   html.dark {
     --color-bg: oklch(12% 0 0);
     --color-surface: oklch(17% 0 0);
     --color-border: oklch(25% 0 0);
     --color-text: oklch(92% 0 0);
     --color-muted: oklch(60% 0 0);
     --color-accent: oklch(65% 0.15 250);
     --color-accent-bg: oklch(20% 0.05 250);
   }
   ```
7. Configure `next.config.ts` com optimizações de imagem
8. Commit: `feat: setup inicial — estrutura, tipos e dados`

---

### FASE 1 — Layout, NavBar e Dark Mode

1. `components/providers/ThemeProvider.tsx` — gerencia `html.dark` + `localStorage`
2. `components/ui/DarkModeToggle.tsx` — ícone sol/lua, alterna tema
3. `components/ui/NavBar.tsx`:
   - Logo "VBF" à esquerda
   - Links âncora: Sobre, Experiência, Portfólio, Publicações, Contato
   - DarkModeToggle à direita
   - Oculta no topo (`opacity-0 -translate-y-full`), aparece após 100px de scroll
   - Menu hamburguer no mobile com `AnimatePresence`
4. `app/layout.tsx`:
   - Metadata completa (title, description, OG tags, Twitter card)
   - JSON-LD schema `Person` com dados do `getPessoa()`
   - Inter + Inter Tight via `next/font/local`
   - ThemeProvider wrapping children
   - NavBar no topo
5. Commit: `feat: navbar, dark mode e layout base`

---

### FASE 2 — Hero Section

`components/sections/Hero.tsx`:

- Nome em Inter Tight 800, clamp(3rem, 6vw, 6rem), animação fade-up palavra por palavra
- Subtítulo: cargo atual + área de atuação (do JSON)
- Badge pulsante "Aberto a oportunidades" — ponto verde com `animate-pulse`
- 4 stats em linha: "X anos", "20 projetos", "6 municípios", "X publicações" — counter animation com Framer Motion
- Placeholder de foto à direita (div cinza com iniciais se `/public/images/victor.jpg` não existir)
- 2 CTAs: "Baixar Currículo" (href="/victor-barcelos-cv.pdf") e "Ver Portfólio" (href="#portfolio")
- Layout: coluna no mobile, linha no desktop (foto à direita)

Commit: `feat: hero section`

---

### FASE 3 — Seção Sobre

`components/sections/About.tsx`:

- Parágrafo de apresentação construído a partir do JSON (`pessoa`)
- Photo grid: 3 divs placeholder com rotação — `odd:-rotate-2 even:rotate-2 hover:rotate-0 transition-transform`
- Se `/public/images/foto1.jpg` etc. existirem, usa `next/image`; senão, placeholders coloridos com iniciais
- Animação `whileInView` fade-up com stagger

Commit: `feat: seção sobre`

---

### FASE 4 — Experiência Profissional com Accordion

Esta é a seção mais importante. Leia o campo `experiencia_profissional` e `portfolio` do JSON.

1. `components/ui/AccordionItem.tsx`:
   - `AnimatePresence` + `motion.div` com `height: 0 → auto`
   - Props: `title`, `children`, `defaultOpen`

2. `components/ui/ExperienceCard.tsx`:
   - Logo da organização: tente `/public/logos/[slug].png` — se não existir, mostra sigla em box colorido
   - Cargo, organização, período (formatado), descrição curta
   - Se `projetos_destaque.length > 0`, mostra AccordionItem com os projetos
   - Dentro do accordion: mini cards dos projetos com título, cliente, tipo, ano, badge ★ se `destaque: true`
   - Seta → que rota 45° no hover

3. `components/sections/Experience.tsx`:
   - Lista todas as `experiencia_profissional[]` do JSON
   - Sophos Governança (atual) tem accordion com 3 projetos
   - FJP tem accordion com 14+ projetos
   - Herkenhoff, CECANE, APOV — sem projetos_destaque, sem accordion

Commit: `feat: seção experiência com accordion`

---

### FASE 5 — Portfólio com Filtros e Modal

`components/sections/Portfolio.tsx` + `components/ui/ProjectCard.tsx` + `components/ui/ProjectModal.tsx`:

**FilterBar:**
- Chips de filtro para: `tipo`, `tema`, `organizacao_executora`
- Botão "Limpar filtros" + contador "Exibindo X de 20"
- Estado local `useState` — sem URL params
- Smooth fade ao filtrar via `AnimatePresence`

**ProjectCard:**
- Título, cliente, org executora, tipo, tema, ano
- Badge ★ dourado para `destaque: true`
- Descrição truncada 2 linhas
- Seta diagonal que rota 45° no hover
- Clique abre modal

**Modal:**
- Overlay escuro `bg-black/60`
- Fecha com ESC ou clique fora
- Mostra: título, cliente, organização, tipo, tema, ano, descrição completa, lista de atribuições (bulleted), resultado
- Animação `scale` + `opacity` de entrada

**Grid:** 1 col mobile → 2 cols md → 3 cols lg

Commit: `feat: portfólio com filtros e modal`

---

### FASE 6 — Formação, Publicações, Docência, Habilidades

4 seções menores, todas lendo do JSON:

1. `components/sections/Education.tsx` — cards com instituição, grau, curso, período; USP/Esalq com badge "Em andamento"
2. `components/sections/Publications.tsx` — lista com título, autores, veículo, ano, link externo ↗
3. `components/sections/Teaching.tsx` — cards com disciplina, instituição, nível, período
4. `components/sections/Skills.tsx` — tags agrupadas por categoria, cor por grupo

Todas com `whileInView` fade-up e layout responsivo.

Commit: `feat: formação, publicações, docência e habilidades`

---

### FASE 7 — Footer e Contato

`components/sections/Contact.tsx`:

- Links sociais com ícones SVG em containers circulares: LinkedIn, e-mail (mailto:victorbarcelosf@gmail.com), Lattes, ResearchGate
- Hover: `scale(1.1)` + cor de acento
- Texto copyright + ano dinâmico
- Integrado ao `app/layout.tsx`

Commit: `feat: footer e contato`

---

### FASE 8 — Composição Final da Home

`app/page.tsx`:

Monte todas as seções na ordem:
```tsx
<Hero />
<About />
<Experience />
<Portfolio />
<Education />
<Publications />
<Teaching />
<Skills />
<Contact />
```

Cada seção tem `id` correspondente para os links do NavBar funcionar:
`id="sobre"`, `id="experiencia"`, `id="portfolio"`, `id="publicacoes"`, `id="contato"`

Commit: `feat: composição da home — todas as seções`

---

### FASE 9 — SEO, Performance e .gitignore

1. Adicione `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://victorbarcelosferreira.com/sitemap.xml
   ```
2. Crie `app/sitemap.ts` com as rotas estáticas
3. Revise todas as `alt` texts nas imagens
4. Confirme `font-display: swap` nas fontes
5. Verifique `.gitignore` — deve incluir `.env*`, `node_modules/`, `.next/`
6. Rode `npm run build` e corrija qualquer erro de tipo ou lint

Commit: `feat: seo, sitemap e robots.txt` + `chore: build sem erros`

---

## Regras de Qualidade

- **Nunca invente dados** — tudo vem do `cv_database.json`
- **Zero `any` no TypeScript** — use as interfaces de `lib/types.ts`
- **Mobile-first** — cada componente funciona em 375px antes de desktop
- **Sem `console.log`** no código final
- **Imagens ausentes** não quebram o layout — use sempre fallbacks
- **Acessibilidade** — todos os botões com `aria-label`, accordion com `aria-expanded`
- Se houver erro de build, **corrija antes de continuar** para a próxima fase

---

## Comando para Iniciar

```bash
# Na pasta victor-site, após instalar dependências:
claude
```

Depois, no Claude Code:
```
Leia o CLAUDE.md e os arquivos em spec/. Construa o site completo seguindo as fases em sequência, fazendo commit ao final de cada fase. Comece pela FASE 0.
```

# tasks.md — Plano de Implementação

Metodologia: **SDD (Spec Driven Development)** com Claude Code.
Cada fase é um prompt separado. Nunca misture fases no mesmo contexto.

---

## Como usar este arquivo

1. Abra o terminal no VS Code dentro de `victor-site/`
2. Execute `claude` para iniciar o Claude Code
3. Comece sempre com: _"Leia requirements.md, design.md e tasks.md antes de qualquer coisa"_
4. Execute **uma fase por vez** — complete, teste, commite, depois siga para a próxima

---

## FASE 0 — Setup do Projeto

**Prompt para o Claude Code:**
```
Leia os arquivos spec/requirements.md, spec/design.md e spec/tasks.md.

Crie um projeto Next.js 15 com App Router, Tailwind CSS v4 e TypeScript.
Configure:
- next.config.ts com otimização de imagens
- globals.css com as CSS variables de cor (light + dark) do design.md
- Pasta /public/fonts/ com placeholders para Inter e Inter Tight
- Estrutura de pastas conforme design.md
- Copie cv_database.json para /data/cv_database.json
- Crie lib/types.ts com as interfaces TypeScript para todos os campos do JSON
- Crie lib/utils.ts com funções: getExperiencias(), getPortfolio(), getPortfolioById(id)

Não crie nenhum componente visual ainda. Apenas a estrutura e os dados.
```

**Entregáveis:**
- [ ] `npx next dev` roda sem erros
- [ ] Tipos TypeScript cobrem todo o cv_database.json
- [ ] Funções utilitárias testadas no console

---

## FASE 1 — NavBar + Layout Base

**Prompt:**
```
Com base em design.md, crie:
1. components/ui/NavBar.tsx
   - Logo/nome à esquerda (texto "VBF" ou nome completo)
   - Links de âncora: Sobre, Experiência, Portfólio, Publicações, Contato
   - DarkModeToggle à direita
   - Comportamento: opacity-0 no topo, aparece após scroll de 100px (useScroll + motion)
   - Responsivo: hamburger menu no mobile

2. components/ui/DarkModeToggle.tsx
   - Alterna classe `dark` no <html>
   - Persiste preferência no localStorage
   - Ícone sol/lua

3. app/layout.tsx
   - Inclui NavBar, fontes self-hosted, metadata completa (ver design.md)
   - JSON-LD Person schema

Teste: dark mode funciona, NavBar aparece ao rolar.
```

**Entregáveis:**
- [ ] NavBar visível e responsiva
- [ ] Dark mode persiste entre refreshes
- [ ] JSON-LD no `<head>`

---

## FASE 2 — Hero Section

**Prompt:**
```
Crie components/sections/Hero.tsx com base em requirements.md RF-01 e design.md.

Dados do hero vêm de cv_database.json (campo `pessoa` + primeiro item de `experiencia_profissional`).

Deve incluir:
- Nome em Inter Tight 800 weight, tipografia display responsiva (clamp 3rem–6rem)
- Subtítulo: cargo atual + área de atuação
- Badge pulsante "Aberto a oportunidades" (ponto verde animado com CSS)
- 4 stats: "X anos de experiência", "20 projetos", "6 municípios assessorados", "X publicações"
  (valores hardcoded por ora, extraídos do JSON no final)
- Placeholder para foto (img tag com src="/images/victor.jpg", fallback cinza se não existir)
- Dois CTAs: "Baixar Currículo" (href para PDF) e "Ver Portfólio" (âncora #portfolio)
- Animações Framer Motion: fade up escalonado para nome, subtítulo, stats, CTAs

Responsivo: mobile (coluna) → desktop (linha com foto à direita).
```

**Entregáveis:**
- [ ] Hero renderiza corretamente no mobile e desktop
- [ ] Animações de entrada funcionam
- [ ] Badge pulsante visível

---

## FASE 3 — Seção About

**Prompt:**
```
Crie components/sections/About.tsx (RF-02).

- Parágrafo de apresentação: extraia de cv_database.json (pessoa.resumo ou construa a partir dos dados)
- Photo grid: 3 imgs de /public/images/ com efeito de rotação
  odd: rotate(-2deg), even: rotate(2deg), hover: rotate(0deg) + transition suave
  Se não houver fotos reais, use placeholders coloridos com iniciais
- Layout: texto à esquerda, photo grid à direita no desktop; stacked no mobile
- Animação Framer Motion: whileInView fade up
```

**Entregáveis:**
- [ ] Photo grid com efeito de rotação funcionando
- [ ] Layout responsivo correto

---

## FASE 4 — Seção Experiência com Accordion

**Prompt:**
```
Esta é a seção mais complexa. Leia design.md seção "Componentes-Chave" com atenção.

Crie:
1. components/ui/AccordionItem.tsx
   - Usa Framer Motion AnimatePresence para animar altura
   - Recebe: título, conteúdo (ReactNode), defaultOpen (boolean)

2. components/ui/ExperienceCard.tsx
   - Exibe: logo (img de /public/logos/[slug].png), cargo, organização, período, descrição curta
   - Contém um AccordionItem para os projetos vinculados
   - Os projetos são resolvidos por ID a partir do portfolio[]

3. components/sections/Experience.tsx (RF-03)
   - Lista todas as experiencias_profissional[] ordenadas
   - Cada uma dentro de um ExperienceCard
   - Se projetos_destaque tiver itens, mostra o accordion com os ProjectCard mini

4. Mini ProjectCard dentro do accordion:
   - Título + cliente + tipo + ano em linha compacta
   - Badge ★ se destaque: true
   - Seta → que rota 45deg no hover (link para #portfolio ou modal)

Teste: accordion abre e fecha suavemente; funciona no mobile.
```

**Entregáveis:**
- [ ] Accordion abre/fecha com animação
- [ ] Projetos Sophos aparecem dentro de Sophos Governança
- [ ] Projetos FJP aparecem dentro de FJP

---

## FASE 5 — Seção Portfólio com Filtros

**Prompt:**
```
Crie components/sections/Portfolio.tsx (RF-04).

1. FilterBar: chips/botões para filtrar por tipo, tema, organização_executora
   - Estado local com useState
   - Botão "Limpar filtros"
   - Contador: "Exibindo X de 20 projetos"

2. ProjectCard completo:
   - Título, cliente, organização executora, tipo, tema, ano
   - Badge ★ para destaque
   - Descrição truncada (2 linhas, expandível)
   - Clique abre Modal com: descrição completa, atribuições (lista), resultado
   - Seta diagonal rotacionável no hover

3. Grid responsivo: 1 col mobile → 2 cols tablet → 3 cols desktop

4. Modal de detalhe:
   - Overlay escuro
   - Fecha com ESC ou clique fora
   - Mostra todos os campos do projeto

Animação: framer motion stagger na entrada dos cards, fade ao filtrar.
```

**Entregáveis:**
- [ ] Todos os 20 projetos renderizam
- [ ] Filtros funcionam sem reload
- [ ] Modal abre/fecha corretamente
- [ ] Responsivo em todos os breakpoints

---

## FASE 6 — Formação, Publicações, Docência, Habilidades

**Prompt:**
```
Crie as seções restantes, todas lendo de cv_database.json:

1. components/sections/Education.tsx (RF-05)
   - Cards: instituição, grau, curso, período
   - Destaque visual para USP/Esalq (doutorado em andamento)

2. components/sections/Publications.tsx (RF-06)
   - Lista de publicações: título, autores, veículo, ano, link externo
   - Ordenadas do mais recente para o mais antigo
   - Link com ícone de seta diagonal

3. components/sections/Teaching.tsx (RF-07)
   - Tabela ou cards: disciplina, instituição, período, nível

4. components/sections/Skills.tsx (RF-08)
   - Tags agrupadas por categoria com cores distintas por grupo
   - Tamanho proporcional ao nível de proficiência (opcional)

Todas com animação whileInView e layout responsivo.
```

**Entregáveis:**
- [ ] Todas as 4 seções renderizam com dados reais do JSON
- [ ] Links externos abrem em nova aba
- [ ] Layout responsivo em todas

---

## FASE 7 — Footer + Contato

**Prompt:**
```
Crie components/sections/Contact.tsx e footer (RF-09).

- Links sociais com ícones SVG em containers circulares:
  LinkedIn, e-mail (mailto:), Lattes, ResearchGate
- Texto de copyright
- Frase curta de encerramento
- Layout centralizado
- Hover: leve scale + cor de acento

Integre o footer no app/layout.tsx.
```

**Entregáveis:**
- [ ] Todos os links funcionam
- [ ] Footer visível em todas as páginas

---

## FASE 8 — Internacionalização PT/EN

**Prompt:**
```
Adicione toggle PT/EN básico ao site.

Estratégia simples (sem next-intl na v1):
- Crie lib/i18n.ts com dois objetos de strings: pt e en
- Crie um Context/Provider que armazena o idioma atual
- DarkModeToggle já existe — adicione LanguageToggle.tsx ao lado
- Traduza: hero (nome, subtítulo, badge, CTAs), about (parágrafo), navigation labels
- O portfólio e publicações permanecem em PT

Persista o idioma no localStorage.
```

**Entregáveis:**
- [ ] Toggle PT/EN visível no header
- [ ] Textos principais mudam ao trocar idioma
- [ ] Preferência persistida

---

## FASE 9 — SEO, Performance e Deploy

**Prompt:**
```
Prepare o site para produção:

1. SEO:
   - Revise todas as metadata em app/layout.tsx
   - Adicione sitemap.xml (next-sitemap ou manual)
   - Adicione robots.txt
   - Confirme JSON-LD Person está correto

2. Performance:
   - Converta todas as imagens para WebP usando next/image
   - Confirme que fontes têm font-display: swap
   - Adicione loading="lazy" onde next/image não cobre
   - Verifique bundle size com `next build --analyze`

3. Acessibilidade:
   - Revise todos os botões e links com aria-label
   - Confirme contraste de cores no dark mode
   - Confirme que accordion é acessível via teclado (Enter/Space, aria-expanded)

4. Deploy:
   - Crie vercel.json se necessário
   - Confirme que NEXT_PUBLIC_* vars estão configuradas
   - Faça o deploy inicial: `vercel --prod`

Rode Lighthouse e corrija issues até ≥ 90 nas 4 métricas.
```

**Entregáveis:**
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade, SEO, Best Practices
- [ ] Site ao vivo na Vercel
- [ ] Domínio customizado configurado (opcional)

---

## Resumo das Fases

| Fase | Foco | Complexidade | Estimativa |
|------|------|-------------|-----------|
| 0 | Setup + tipos | Baixa | 30 min |
| 1 | NavBar + Dark Mode | Baixa | 45 min |
| 2 | Hero | Média | 1h |
| 3 | About + Photo Grid | Baixa | 45 min |
| 4 | Experience + Accordion | **Alta** | 2h |
| 5 | Portfólio + Filtros + Modal | **Alta** | 2h |
| 6 | Educação, Pubs, Docência, Skills | Média | 1h30 |
| 7 | Footer + Contato | Baixa | 30 min |
| 8 | i18n PT/EN | Média | 1h |
| 9 | SEO + Performance + Deploy | Média | 1h30 |

**Total estimado: ~11–12 horas de desenvolvimento com Claude Code**

---

## Comandos Úteis

```bash
# Iniciar desenvolvimento
cd victor-site && npm run dev

# Build de produção
npm run build && npm start

# Análise de bundle
ANALYZE=true npm run build

# Deploy na Vercel
vercel --prod

# Iniciar Claude Code
claude
```

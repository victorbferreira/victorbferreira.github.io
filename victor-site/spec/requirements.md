# requirements.md — Site Pessoal Victor Barcelos Ferreira

## Visão Geral

Site pessoal com currículo e portfólio para Victor Barcelos Ferreira — economista, consultor em
políticas públicas e professor. Público-alvo: gestores públicos, parceiros de consultoria,
recrutadores acadêmicos e de setor público, pesquisadores.

---

## Objetivos do Produto

1. **Apresentar identidade profissional** de forma clara e impactante logo no hero
2. **Exibir trajetória profissional** de forma hierárquica: cada experiência pode expandir
   para revelar os projetos realizados (padrão accordion)
3. **Vitrine de portfólio** com 20 projetos detalhados (cliente, tipo, atribuições, resultado)
4. **Credibilidade acadêmica**: publicações, docência, pesquisa
5. **Contato direto**: LinkedIn, e-mail, WhatsApp (opcional)
6. **Servir como CV digital** — substituindo envio de PDF em candidaturas e prospecções

---

## Requisitos Funcionais

### RF-01 · Hero Section
- Nome completo em tipografia display grande
- Subtítulo descritivo (cargo / área de atuação)
- Foto editorial (com recorte ou circular)
- Badge de status: "Aberto a oportunidades" com ponto verde pulsante
- 3–4 stats de impacto: anos de experiência, projetos, municípios assessorados, publicações
- CTA primário: "Baixar Currículo" (link para PDF gerado a partir do JSON)
- CTA secundário: "Ver Portfólio"

### RF-02 · Seção Sobre (About)
- Parágrafo de apresentação pessoal (3–4 linhas, voz em 1ª pessoa)
- Foto grid com 3 fotos com efeito de rotação leve (odd/-2deg, even/+2deg, hover/0deg)
- Localização: Belo Horizonte, MG

### RF-03 · Trajetória Profissional (Experience)
- Lista de experiências ordenadas do mais recente para o mais antigo
- Cada card de experiência exibe: logo da organização, cargo, período, descrição curta
- **Accordion**: ao clicar/expandir, mostra os projetos vinculados (`projetos_destaque`)
- Cada projeto dentro do accordion: título, cliente, tipo, ano, descrição curta, resultado (resumido)
- Link "ver detalhes completos" abre modal ou navega para a página do portfólio

### RF-04 · Portfólio (Projects)
- Grid de cards: título, cliente, tipo, ano, organização executora
- Filtros por: tipo, tema, organização, ano
- Projetos com `destaque: true` têm tratamento visual diferenciado (badge ou borda)
- Ao clicar no card: modal ou página de detalhe com descrição completa + atribuições + resultado

### RF-05 · Formação Acadêmica
- Cards com: instituição, curso, grau, período
- Destaque para USP/Esalq (doutorado em andamento)

### RF-06 · Publicações
- Lista de publicações acadêmicas com: título, autores, veículo, ano, link
- Ordenada do mais recente para o mais antigo

### RF-07 · Docência
- Tabela ou cards: disciplina, instituição, período, nível (graduação/especialização)

### RF-08 · Habilidades
- Tags agrupadas por categoria: Hard Skills, Soft Skills, Ferramentas, Idiomas
- Tags com nível de proficiência (opcional: tamanho ou cor)

### RF-09 · Contato / Footer
- Links sociais: LinkedIn, e-mail, Lattes, ResearchGate (conforme disponível)
- Formulário de contato simples (nome, e-mail, mensagem) — opcional v2
- Copyright + crédito técnico

### RF-10 · Toggle PT/EN (i18n)
- Conteúdo traduzível: hero, about, experience cards, skills
- Portfólio pode permanecer em PT na v1

### RF-11 · Dark Mode
- Toggle claro/escuro no header
- Preferência salva no localStorage

---

## Requisitos Não-Funcionais

| ID | Requisito | Meta |
|----|-----------|------|
| RNF-01 | Performance (LCP) | < 2.5s no mobile |
| RNF-02 | Acessibilidade | WCAG 2.1 AA |
| RNF-03 | SEO | Título, description, OG tags, JSON-LD (Person + WebSite) |
| RNF-04 | Responsividade | Mobile-first, breakpoints sm/md/lg/xl |
| RNF-05 | Score Lighthouse | ≥ 90 em todas as categorias |
| RNF-06 | Fonte | Self-hosted (.woff2), font-display: swap |
| RNF-07 | Imagens | next/image com lazy loading + WebP automático |
| RNF-08 | Conteúdo | Hardcoded a partir do cv_database.json (sem CMS na v1) |

---

## Fonte de Dados

**Arquivo principal:** `cv_database.json`
Campos utilizados por seção:

| Seção | Campo JSON |
|-------|-----------|
| Hero | `pessoa`, `experiencia_profissional[0]` |
| Sobre | `pessoa.resumo`, fotos do `public/` |
| Trajetória | `experiencia_profissional[]` + `portfolio[]` via `projetos_destaque` |
| Portfólio | `portfolio[]` |
| Formação | `formacao_academica[]` |
| Publicações | `publicacoes[]` |
| Docência | `docencia[]` |
| Habilidades | `habilidades[]` |
| Pesquisa | `projetos_pesquisa[]`, `pesquisas_fapemig[]` |

---

## Fora de Escopo (v1)

- Blog / artigos
- Área administrativa ou CMS
- Integração com formulário (pode usar Formspree ou Resend na v2)
- Internacionalização completa (apenas toggle PT/EN básico)
- Animações complexas com GSAP

---

## Critérios de Aceite

- [ ] Todas as seções RF-01 a RF-09 implementadas e responsivas
- [ ] Accordion de experiências funciona em mobile e desktop
- [ ] Filtros do portfólio funcionam sem reload
- [ ] Dark mode persistido entre visitas
- [ ] Lighthouse ≥ 90 nas 4 métricas
- [ ] Deploy funcional na Vercel com domínio customizado

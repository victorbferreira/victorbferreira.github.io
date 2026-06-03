/*
 * Gera um currículo em PDF (formato A4) a partir do conteúdo do site index.html.
 *
 * Uso:
 *   npm install pdfkit
 *   node scripts/gerar-curriculo-pdf.js curriculo-victor-barcelos-ferreira.pdf
 *
 * O conteúdo (perfil, formação, experiência, projetos, publicações, docência)
 * é mantido sincronizado manualmente com os dados de index.html.
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');

const OUT = process.argv[2] || 'curriculo.pdf';

// ── Paleta ──
const MOSS = '#2d5a3d';
const MOSS_SOFT = '#e8efe9';
const TEXT = '#222a26';
const SOFT = '#454f49';
const MUTED = '#6b7570';
const ACCENT = '#b5762a';
const LINE = '#d8ded9';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 48, bottom: 54, left: 54, right: 54 },
  info: {
    Title: 'Currículo — Victor Barcelos Ferreira',
    Author: 'Victor Barcelos Ferreira',
    Subject: 'Economista e consultor em políticas públicas',
  },
});
doc.pipe(fs.createWriteStream(OUT));

const PAGE_W = doc.page.width;
const ML = doc.page.margins.left;
const MR = doc.page.margins.right;
const CONTENT_W = PAGE_W - ML - MR;
const BOTTOM = doc.page.height - doc.page.margins.bottom;

// ── helpers ──
function ensure(space) {
  if (doc.y + space > BOTTOM) doc.addPage();
}

function sectionTitle(label) {
  ensure(40);
  doc.moveDown(0.6);
  const y = doc.y;
  doc.save()
    .font('Helvetica-Bold').fontSize(11).fillColor(MOSS)
    .text(label.toUpperCase(), ML, y, { characterSpacing: 1.2 });
  const ty = doc.y + 3;
  doc.moveTo(ML, ty).lineTo(PAGE_W - MR, ty).lineWidth(0.8).strokeColor(MOSS).stroke();
  doc.restore();
  doc.y = ty + 8;
  doc.x = ML;
}

// desenha texto alinhado à direita sem alterar o fluxo vertical (doc.y)
function rightMeta(text, yTop, w, size = 8, color = MUTED) {
  const savedX = doc.x, savedY = doc.y;
  doc.font('Helvetica').fontSize(size).fillColor(color)
     .text(text, PAGE_W - MR - w, yTop, { width: w, align: 'right' });
  doc.x = savedX; doc.y = savedY;
}

function para(text, opts = {}) {
  doc.font(opts.font || 'Helvetica')
     .fontSize(opts.size || 9.5)
     .fillColor(opts.color || SOFT)
     .text(text, ML, doc.y, { width: CONTENT_W, align: opts.align || 'justify', lineGap: opts.lineGap ?? 1.5 });
}

// ── DADOS ──
const BIO = [
  'Economista pela UFV e Mestre em Administração Pública pela Fundação João Pinheiro (FJP), com cerca de 8 anos de atuação entre pesquisa aplicada e prática de gestão pública municipal. Iniciei em pesquisa educacional e migrei para políticas públicas na FJP, onde atuei por quase cinco anos na Diretoria de Políticas Públicas.',
  'Na FJP coordenei e executei mais de 14 projetos de pesquisa aplicada e consultoria para órgãos estaduais e municipais de Minas Gerais, com foco em avaliação de programas governamentais e implantação de sistemas de monitoramento. Em 2025 tornei-me sócio da Sophos Governança, voltada a parcerias estratégicas com o setor público em planejamento, finanças públicas e gestão de pessoal. Sou também professor orientador no MBA em Gestão de Projetos da USP/Esalq.',
];

const FORMACAO = [
  ['Mestrado em Administração Pública', 'Fundação João Pinheiro — linha Estado e Políticas Públicas', '2018 — 2020'],
  ['Bacharelado em Ciências Econômicas', 'Universidade Federal de Viçosa (UFV)', '2013 — 2017'],
];

const EXPERIENCIA = [
  { cargo: 'Professor Orientador', org: 'MBA USP/Esalq — Gestão de Projetos', date: 'Fev/2026 — atual',
    desc: 'Professor orientador do MBA em Gestão de Projetos da USP/Esalq. Piracicaba, SP.', projects: [] },
  { cargo: 'Sócio e Consultor', org: 'Sophos Governança', date: 'Mar/2025 — atual',
    desc: 'Parcerias estratégicas com prefeituras e autarquias para planejamento, finanças públicas e gestão de pessoal.', projects: [] },
  { cargo: 'Assessor de Políticas Públicas', org: 'Fundação João Pinheiro — Diretoria de Políticas Públicas', date: 'Jun/2020 — Fev/2025',
    desc: null, projects: [
      'PMO — gerenciamento de projetos e cronogramas, instrumentos de acompanhamento e monitoramento de portfólio',
      'Assessoria técnica a órgãos estaduais em monitoramento, avaliação e pesquisas aplicadas',
      'Coordenação do ciclo anual do PPAG junto à SEPLAG-MG (2020–2024)',
      'Planejamento financeiro e orçamentário, processos de compra e gestão de contratos',
      'Representação institucional junto a clientes e parceiros',
    ] },
  { cargo: 'Professor · Orientador · Avaliador', org: 'Escola de Governo Paulo Neves de Carvalho — FJP', date: '2020 — 2025',
    desc: null, projects: [
      'Graduação — CSAP (Administração Pública): professor, orientador e avaliador de monografias',
      'Pós-Graduação — CEAPPGG e Especialização em Monitoramento e Avaliação: professor e orientador',
      'Programas de Liderança — Desenvolvimento de Gestores Escolares (PBH) e de Gestores (FJP)',
    ] },
  { cargo: 'Consultor de Projetos', org: 'Ser Solidário', date: 'Jan/2021 — Mar/2023',
    desc: 'Consultoria técnica para projetos de captação de recursos em Esporte, Cultura e Direitos da Criança e do Adolescente. Desenvolvimento institucional no programa Parcerias Sustentáveis da AngloGold Ashanti. 10 projetos de captação elaborados.', projects: [] },
  { cargo: 'Analista Técnico de Projetos', org: 'Herkenhoff & Prates', date: 'Set/2019 — Dez/2019',
    desc: 'Construção de matriz de competências para avaliação da educação municipal em parceria com a Fundação Itaú Social.', projects: [] },
  { cargo: 'Assessor de Monitoramento', org: 'CECANE/UFV — Alimentação e Nutrição do Escolar', date: 'Fev/2017 — Out/2017',
    desc: 'Assessorias técnicas em 9 municípios de MG para a gestão local do PNAE: diagnóstico situacional, planos de ação e capacitações com atores da alimentação escolar.', projects: [] },
];

const CASE = {
  titulo: 'Plano Estratégico Brumadinho 2025–2028',
  meta: 'Prefeitura de Brumadinho · 2025–2026 · Planejamento Estratégico Municipal',
  stats: '159 metas pactuadas · 7 eixos temáticos · 4 anos de PPA · 15 secretarias envolvidas',
  texto: 'Após a tragédia de 2019, o município precisava de um plano estratégico articulando prioridades, recursos e governança, traduzível em PPA executável. Método: diagnóstico em sete eixos, 12 oficinas com secretarias, metas SMART e governança de monitoramento (Comitê Estratégico + relatórios trimestrais). Resultado: plano aprovado em 2025, alinhado ao PPA 2026–2029 e em execução, com modelo replicável documentado.',
};

const PROJETOS = [
  ['Diagnóstico de Custos — Saúde de Sete Lagoas', 'Prefeitura de Sete Lagoas', 2026, 'Finanças públicas', 'Diagnóstico dos custos da Secretaria de Saúde, com análise integrada de folha, contratos, orçamento e dados assistenciais. Identificou oportunidades de eficiência e resultou em plano de ações de curto prazo.'],
  ['Adequação Jurídica do PCCVS — SAAE', 'SAAE Sete Lagoas', 2025, 'Gestão de pessoal', 'Revisão técnica e jurídica do Plano de Cargos, Carreiras e Salários em resposta a Ação Civil Pública do MPMG. Triangulou minuta, jurisprudência do TJMG e benchmarks, corrigindo 10 pontos críticos e entregando minuta consolidada.'],
  ['Assessoramento ao PPAG — Cinco ciclos', 'SEPLAG-MG', 2024, 'Planejamento governamental', 'Coordenação técnica de cinco ciclos anuais (2020–2024) do PPAG de Minas Gerais: surveys com gestores, oficinas de monitoramento e análise de desempenho de mais de 100 programas por ciclo.'],
  ['Avaliação de Implementação do PRA', 'SEMAD-MG', 2024, 'Avaliação de implementação', 'Avaliação da implementação do Programa de Regularização Ambiental em MG, analisando gargalos operacionais e a efetividade dos instrumentos previstos no Código Florestal.'],
  ['Rede Cuidar e SUAS', 'SEDESE-MG', 2024, 'Políticas sociais', 'Avaliação de resultados do Programa Rede Cuidar, voltado ao fortalecimento da rede socioassistencial do SUAS em MG, com evidências e recomendações de aprimoramento.'],
  ['Programa Bolsa Reciclagem', 'SEMAD-MG', 2022, 'Avaliação de resultados', 'Avaliação dos efeitos do incentivo a catadores e cooperativas sobre renda e sustentabilidade das cooperativas, apoiando decisões sobre desenho e continuidade.'],
  ['Sistema de Monitoramento dos ODS em MG', 'SEPLAG-MG', 2022, 'Planejamento', 'Proposta de implantação e governança de sistema estadual de monitoramento dos 17 ODS. Resultou na aprovação do SIMAPP — Sistema Mineiro de Avaliação de Políticas Públicas.'],
  ['Avaliação de Resultados do Proalminas', 'AMIPA', 2021, 'Avaliação de resultados', 'Avaliação do Programa Mineiro de Incentivo à Cultura do Algodão (2003–2019), com diagnóstico setorial e análise contrafactual. Gerou artigo na Revista Brasileira de Avaliação (2023).'],
  ['Avaliação do Voucher Habitacional', 'COHAB Minas', 2021, 'Avaliação de desenho', 'Avaliação de desenho do Voucher Habitacional: benchmarking nacional e internacional, análise crítica do desenho e modelagem de custo-benefício.'],
  ['Pesquisa de Teletrabalho no Serviço Público', 'FJP / SEPLAG-MG', 2020, 'Pesquisa aplicada', 'Pesquisa em duas fases (piloto na FJP e survey estadual, ~32 mil respondentes) sobre motivação e produtividade no trabalho remoto durante a Covid-19, base da política estadual de teletrabalho.'],
  ['Assessoria PNAE — Alimentação Escolar', 'CECANE/UFV', 2017, 'Nutrição escolar', 'Assessorias técnicas em 9 municípios de MG no âmbito do convênio FNDE/UFV: diagnósticos, planos de ação, visitas a escolas e capacitações, alcançando atores de mais de 45 municípios.'],
];

const PUBLICACOES = [
  ['Avaliação dos resultados do Programa Mineiro de Incentivo à Cultura do Algodão (Proalminas)', 'Revista Brasileira de Avaliação · c/ João Batista Rezende', 2023],
  ['A distribuição de insumos escolares e seu impacto sobre a desigualdade educacional: o efeito professor no 9º ano da rede pública de MG', 'INTERFACE (Natal) · c/ Luisa Sousa, Bruno Costa, Reinaldo Morais', 2022],
  ['Capacidades estatais no PNAE em MG: análise comparada da implementação nas redes estadual e municipal', 'NAU — Revista Eletrônica da Residência Social · c/ Ricardo Carneiro, Lauro Vicari', 2021],
  ['Nadando contra a Corrente: Equidade e Desempenho nas Redes Municipais de Ensino Fundamental em MG', 'Revista Brasileira de Políticas Públicas e Internacionais · c/ Bruno Diniz Costa', 2021],
  ['O impacto da distorção idade-série sobre a criminalidade nos municípios de Minas Gerais', 'Revista Brasileira de Segurança Pública · c/ Evandro Camargos Teixeira', 2019],
  ['Democracia deliberativa, capital social e coprodução de serviços públicos', 'NAU — Revista Eletrônica da Residência Social · c/ Bruno Diniz Costa, Flávia Brasil', 2019],
];

const TOPICOS_DOCENCIA = [
  'Avaliação de políticas públicas (desenho, implementação, resultados, impacto)',
  'Planejamento estratégico municipal e PPA',
  'Gestão por resultados no setor público',
  'Monitoramento de programas e indicadores',
  'Finanças públicas e diagnóstico de custos',
  'Métodos de pesquisa aplicada em administração pública',
];

const AREAS = 'Avaliação de políticas públicas · Planejamento estratégico · Finanças públicas · Gestão de pessoal · Pesquisa aplicada · Economia aplicada · Gestão municipal · Monitoramento e avaliação';

const MUNICIPIOS = 'Belo Horizonte, Brumadinho, Sete Lagoas, Vespasiano, Diamantina, Datas, Almenara, Araçuaí, Jequitinhonha, Caratinga, Coronel Fabriciano, João Monlevade, Antônio Dias, Bocaiúva, Mantena, Ladainha, Riacho dos Machados, Piedade de Ponte Nova, Arinos (MG) · Várzea Grande (MT) · Itapevi (SP)';

// ════════ HEADER ════════
doc.rect(0, 0, PAGE_W, 4).fill(MOSS);
doc.fillColor(TEXT).font('Helvetica-Bold').fontSize(26)
   .text('Victor Barcelos Ferreira', ML, 44, { width: CONTENT_W, characterSpacing: 0.2 });
doc.moveDown(0.15);
doc.font('Helvetica').fontSize(11.5).fillColor(MOSS)
   .text('Economista · Consultor em Políticas Públicas · Professor', { width: CONTENT_W });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(8.5).fillColor(MUTED)
   .text('Nova Lima / Belo Horizonte — MG, Brasil   |   victorbarcelos@msn.com   |   WhatsApp +55 19 98695-443', { width: CONTENT_W })
   .text('linkedin.com/in/victorbarcelos   |   lattes.cnpq.br/1399839079425159', { width: CONTENT_W });
doc.moveDown(0.2);
doc.moveTo(ML, doc.y).lineTo(PAGE_W - MR, doc.y).lineWidth(0.8).strokeColor(LINE).stroke();
doc.moveDown(0.2);

// ════════ PERFIL ════════
sectionTitle('Perfil');
BIO.forEach((p, i) => { para(p); if (i < BIO.length - 1) doc.moveDown(0.35); });

// ════════ FORMAÇÃO ════════
sectionTitle('Formação');
FORMACAO.forEach(([t, o, d]) => {
  ensure(34);
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(TEXT).text(t, ML, y0, { width: CONTENT_W - 90 });
  doc.font('Helvetica').fontSize(9).fillColor(MOSS).text(o, ML, doc.y, { width: CONTENT_W - 90 });
  rightMeta(d, y0, 90);
  doc.moveDown(0.5);
});

// ════════ EXPERIÊNCIA ════════
sectionTitle('Experiência Profissional');
EXPERIENCIA.forEach(e => {
  const estimate = 30 + (e.desc ? 22 : 0) + e.projects.length * 13;
  ensure(estimate);
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(TEXT).text(e.cargo, ML, y0, { width: CONTENT_W - 95 });
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(MOSS).text(e.org, ML, doc.y, { width: CONTENT_W - 95 });
  rightMeta(e.date, y0, 95);
  doc.moveDown(0.15);
  if (e.desc) { para(e.desc, { size: 9, lineGap: 1 }); }
  e.projects.forEach(p => {
    ensure(14);
    doc.font('Helvetica').fontSize(9).fillColor(ACCENT).text('•', ML + 2, doc.y, { continued: true })
       .fillColor(SOFT).text('  ' + p, { width: CONTENT_W - 14, align: 'left', lineGap: 0.5 });
  });
  doc.moveDown(0.55);
});

// ════════ PROJETO EM DESTAQUE ════════
sectionTitle('Projeto em Destaque');
ensure(90);
const bx = doc.y;
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(MOSS).text(CASE.titulo, ML, bx, { width: CONTENT_W });
doc.font('Helvetica').fontSize(8).fillColor(MUTED).text(CASE.meta, { width: CONTENT_W });
doc.moveDown(0.1);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(ACCENT).text(CASE.stats, { width: CONTENT_W });
doc.moveDown(0.15);
para(CASE.texto, { size: 9 });
doc.moveDown(0.2);

// ════════ PROJETOS SELECIONADOS ════════
sectionTitle('Projetos Selecionados');
PROJETOS.forEach(([t, cli, ano, tipo, res]) => {
  ensure(40);
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(TEXT).text(t, ML, y0, { width: CONTENT_W - 42 });
  rightMeta(String(ano), y0, 42);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MOSS)
     .text(`${cli}  ·  ${tipo}`, ML, doc.y, { width: CONTENT_W });
  doc.moveDown(0.1);
  para(res, { size: 9, lineGap: 0.8 });
  doc.moveDown(0.4);
});

// ════════ PUBLICAÇÕES ════════
sectionTitle('Publicações Selecionadas');
PUBLICACOES.forEach(([t, v, ano]) => {
  ensure(28);
  const y0 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9).fillColor(TEXT).text(t, ML, y0, { width: CONTENT_W - 32 });
  rightMeta(String(ano), y0, 32);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(SOFT).text(v, ML, doc.y, { width: CONTENT_W });
  doc.moveDown(0.4);
});

// ════════ DOCÊNCIA ════════
sectionTitle('Docência e Formação de Gestores');
para('Atuação como professor, orientador e avaliador no ensino de gestão pública: graduação (CSAP/FJP), pós-graduação (CEAPPGG e Especialização em M&A), programas de liderança (PBH e FJP) e, desde 2026, orientação de TCC no MBA USP/Esalq. Mais de 120 alunos formados e 4 orientações em curso.', { size: 9 });
doc.moveDown(0.2);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MOSS).text('Tópicos de atuação', ML, doc.y);
doc.moveDown(0.15);
TOPICOS_DOCENCIA.forEach(t => {
  ensure(13);
  doc.font('Helvetica').fontSize(9).fillColor(ACCENT).text('•', ML + 2, doc.y, { continued: true })
     .fillColor(SOFT).text('  ' + t, { width: CONTENT_W - 14, lineGap: 0.5 });
});

// ════════ ÁREAS + MUNICÍPIOS ════════
sectionTitle('Áreas de Especialidade');
para(AREAS, { size: 9, align: 'left' });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MOSS).text('Municípios e órgãos assessorados (21 municípios em MG, SP e MT)', ML, doc.y);
doc.moveDown(0.15);
para(MUNICIPIOS, { size: 8.5, color: MUTED, align: 'left' });

doc.end();
console.log('PDF gerado:', OUT);

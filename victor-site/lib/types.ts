export interface Pessoa {
  nome: string
  email: string
  telefone: string
  cidade: string
  lattes: string
  linkedin: string
  linktree: string
}

export interface FormacaoAcademica {
  grau: string
  curso: string
  instituicao: string
  cidade: string
  inicio: number
  fim: number | null
  linha_pesquisa: string | null
  bolsa: string | null
}

export interface ExperienciaProfissional {
  cargo: string
  cargo_anterior: string | null
  organizacao: string
  inicio: string
  fim: string
  tipo: string
  descricao_curta: string
  descricao_longa: string
  projetos_destaque: string[]
}

export interface PortfolioItem {
  id: string
  titulo: string
  cliente: string
  organizacao_executora: string
  ano: number | string
  ano_inicio?: number
  ano_fim?: number
  tipo: string
  tema: string
  descricao: string
  atribuicoes: string[]
  resultado: string | null
  destaque: boolean
}

export interface Publicacao {
  ano: number
  titulo: string
  periodico: string
  coautores: string[]
  tipo: string
}

export interface Docencia {
  instituicao: string
  curso: string
  disciplina: string
  turmas: number | null
  papel: string
  obs?: string
}

export interface Habilidades {
  analise_dados: string[]
  visualizacao: string[]
  gestao_projetos: string[]
  pesquisa: string[]
  idiomas: Idioma[]
}

export interface Idioma {
  idioma: string
  nivel: string
}

export interface ProjetoPesquisa {
  titulo: string
  vinculo: string
  periodo: string
}

export interface CVDatabase {
  pessoa: Pessoa
  formacao_academica: FormacaoAcademica[]
  experiencia_profissional: ExperienciaProfissional[]
  docencia: Docencia[]
  publicacoes: Publicacao[]
  habilidades: Habilidades
  projetos_pesquisa: ProjetoPesquisa[]
  portfolio: PortfolioItem[]
}

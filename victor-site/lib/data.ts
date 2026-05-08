import type {
  CVDatabase,
  Pessoa,
  FormacaoAcademica,
  ExperienciaProfissional,
  PortfolioItem,
  Publicacao,
  Docencia,
  Habilidades,
  ProjetoPesquisa,
} from './types'

import cvData from '../data/cv_database.json'

const db = cvData as CVDatabase

export function getPessoa(): Pessoa {
  return db.pessoa
}

export function getFormacao(): FormacaoAcademica[] {
  return db.formacao_academica
}

export function getExperiencias(): ExperienciaProfissional[] {
  return db.experiencia_profissional
}

export function getPortfolio(): PortfolioItem[] {
  return db.portfolio
}

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return db.portfolio.find((item) => item.id === id)
}

export function getPublicacoes(): Publicacao[] {
  return [...db.publicacoes].sort((a, b) => b.ano - a.ano)
}

export function getDocencia(): Docencia[] {
  return db.docencia
}

export function getHabilidades(): Habilidades {
  return db.habilidades
}

export function getProjetosPesquisa(): ProjetoPesquisa[] {
  return db.projetos_pesquisa
}

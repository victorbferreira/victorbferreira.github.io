'use client'

import type { PortfolioItem } from '@/lib/types'

interface ProjectCardProps {
  item: PortfolioItem
  onClick: () => void
}

export function ProjectCard({ item, onClick }: ProjectCardProps) {
  const ano = item.ano_inicio ?? item.ano

  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors flex flex-col gap-3"
      aria-label={`Ver detalhes de ${item.titulo}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {item.destaque && (
            <span className="text-amber-500 text-xs font-medium" aria-label="Projeto em destaque">
              ★ DESTAQUE
            </span>
          )}
          <span className="text-xs text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {ano}
          </span>
        </div>
        <span
          className="flex-shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-transform group-hover:rotate-45 duration-200"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>

      {/* Título */}
      <h3
        className="text-sm font-semibold text-[var(--color-text)] leading-snug"
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {item.titulo}
      </h3>

      {/* Meta */}
      <div className="space-y-1">
        <p className="text-xs text-[var(--color-muted)]">{item.cliente}</p>
        <p className="text-xs text-[var(--color-accent)]">{item.organizacao_executora}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-bg)] text-[var(--color-accent)]">
          {item.tipo}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)]">
          {item.tema}
        </span>
      </div>

      {/* Descrição truncada */}
      <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
        {item.descricao}
      </p>
    </button>
  )
}

'use client'

import { AccordionItem } from './AccordionItem'
import { getPortfolioById } from '@/lib/data'
import type { ExperienciaProfissional, PortfolioItem } from '@/lib/types'

const orgColors: Record<string, string> = {
  'Sophos Governança': 'oklch(65% 0.15 250)',
  'Fundação João Pinheiro': 'oklch(65% 0.12 30)',
  'Herkenhoff & Prates': 'oklch(65% 0.12 150)',
  'CECANE/UFV': 'oklch(65% 0.12 120)',
  'APOV': 'oklch(65% 0.12 320)',
  'MBA USP/Esalq': 'oklch(65% 0.12 200)',
}

function MiniProjectCard({ item }: { item: PortfolioItem }) {
  const ano = item.ano_inicio ?? item.ano
  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {item.destaque && (
            <span className="text-amber-500 text-xs" aria-label="Projeto em destaque">★</span>
          )}
          <span className="text-xs font-medium text-[var(--color-text)] truncate">{item.titulo}</span>
        </div>
        <div className="text-xs text-[var(--color-muted)]">
          {item.cliente} · {ano}
        </div>
      </div>
      <a
        href="#portfolio"
        aria-label={`Ver detalhes de ${item.titulo}`}
        className="flex-shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-transform group-hover:rotate-45 mt-0.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  )
}

function MiniTextItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 py-1.5 text-xs text-[var(--color-muted)]">
      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-[var(--color-border)]" aria-hidden="true" />
      {text}
    </div>
  )
}

interface ExperienceCardProps {
  exp: ExperienciaProfissional
}

export function ExperienceCard({ exp }: ExperienceCardProps) {
  const isCurrent = exp.fim === 'Atual'
  const orgKey = Object.keys(orgColors).find((k) => exp.organizacao.includes(k))
  const accentColor = orgKey ? orgColors[orgKey] : 'var(--color-muted)'

  const hasProjects = exp.projetos_destaque.length > 0

  const resolvedItems = exp.projetos_destaque.map((item) => ({
    text: item,
    portfolio: getPortfolioById(item),
  }))

  return (
    <div className="py-6 border-b border-[var(--color-border)]">
      <div className="flex items-start gap-4">
        {/* Org badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ background: accentColor, fontFamily: 'var(--font-inter-tight)' }}
          aria-hidden="true"
        >
          {exp.organizacao
            .split(/[\s\/&–]+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h3
              className="font-semibold text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              {exp.cargo}
            </h3>
            <span className="text-xs text-[var(--color-muted)] whitespace-nowrap">
              {exp.inicio} — {exp.fim}
              {isCurrent && (
                <span className="ml-1.5 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                </span>
              )}
            </span>
          </div>

          <p className="text-sm text-[var(--color-accent)] mb-2">{exp.organizacao}</p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">{exp.descricao_curta}</p>

          {hasProjects && (
            <AccordionItem
              title={`${exp.projetos_destaque.length} projeto${exp.projetos_destaque.length > 1 ? 's' : ''} realizado${exp.projetos_destaque.length > 1 ? 's' : ''}`}
              defaultOpen={false}
            >
              <div className="flex flex-col gap-2">
                {resolvedItems.map(({ text, portfolio: proj }) =>
                  proj ? (
                    <MiniProjectCard key={text} item={proj} />
                  ) : (
                    <MiniTextItem key={text} text={text} />
                  )
                )}
              </div>
            </AccordionItem>
          )}
        </div>
      </div>
    </div>
  )
}

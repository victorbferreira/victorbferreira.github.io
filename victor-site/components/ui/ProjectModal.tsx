'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PortfolioItem } from '@/lib/types'

interface ProjectModalProps {
  item: PortfolioItem | null
  onClose: () => void
}

export function ProjectModal({ item, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!item) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  const ano = item ? (item.ano_inicio ?? item.ano) : null
  const anoFim = item?.ano_fim ? `–${item.ano_fim}` : ''

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={item.titulo}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl pointer-events-auto p-6 sm:p-8">
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Fechar modal"
                className="absolute top-4 right-4 p-2 rounded-full text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-6 pr-8">
                {item.destaque && (
                  <span className="inline-block text-amber-500 text-xs font-medium mb-2">★ DESTAQUE</span>
                )}
                <h2
                  className="text-xl font-bold text-[var(--color-text)] mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {item.titulo}
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-bg)] text-[var(--color-accent)]">
                    {item.tipo}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)]">
                    {item.tema}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)]">
                    {ano}{anoFim}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                <div>
                  <dt className="text-xs text-[var(--color-muted)] mb-0.5">Cliente</dt>
                  <dd className="text-[var(--color-text)] font-medium">{item.cliente}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-muted)] mb-0.5">Organização Executora</dt>
                  <dd className="text-[var(--color-accent)]">{item.organizacao_executora}</dd>
                </div>
              </dl>

              {/* Descrição */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">
                  Descrição
                </h3>
                <p className="text-sm text-[var(--color-text)] leading-relaxed">{item.descricao}</p>
              </div>

              {/* Atribuições */}
              {item.atribuicoes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-3">
                    Atribuições
                  </h3>
                  <ul className="space-y-2">
                    {item.atribuicoes.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resultado */}
              {item.resultado && (
                <div className="p-4 rounded-xl bg-[var(--color-accent-bg)] border border-[var(--color-accent)]/20">
                  <h3 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide mb-1.5">
                    Resultado
                  </h3>
                  <p className="text-sm text-[var(--color-text)] leading-relaxed">{item.resultado}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getPortfolio } from '@/lib/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectModal } from '@/components/ui/ProjectModal'
import type { PortfolioItem } from '@/lib/types'

function unique(arr: string[]) {
  return Array.from(new Set(arr)).sort()
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
          : 'bg-transparent border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

export function Portfolio() {
  const all = getPortfolio()
  const [filterTipo, setFilterTipo] = useState<string | null>(null)
  const [filterTema, setFilterTema] = useState<string | null>(null)
  const [filterOrg, setFilterOrg] = useState<string | null>(null)
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  const tipos = unique(all.map((p) => p.tipo))
  const temas = unique(all.map((p) => p.tema))
  const orgs = unique(all.map((p) => p.organizacao_executora))

  const filtered = useMemo(() => {
    return all.filter((p) => {
      if (filterTipo && p.tipo !== filterTipo) return false
      if (filterTema && p.tema !== filterTema) return false
      if (filterOrg && p.organizacao_executora !== filterOrg) return false
      return true
    })
  }, [all, filterTipo, filterTema, filterOrg])

  const hasFilters = filterTipo || filterTema || filterOrg

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[var(--color-border)]"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-3xl font-bold mb-2 text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-inter-tight)' }}
          >
            Portfólio
          </h2>
          <p className="text-sm text-[var(--color-muted)] mb-8">
            Exibindo{' '}
            <span className="font-medium text-[var(--color-text)]">{filtered.length}</span> de{' '}
            <span className="font-medium text-[var(--color-text)]">{all.length}</span> projetos
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 space-y-3"
        >
          {/* Tipo */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">
              Tipo
            </p>
            <div className="flex flex-wrap gap-2">
              {tipos.map((t) => (
                <FilterChip
                  key={t}
                  label={t}
                  active={filterTipo === t}
                  onClick={() => setFilterTipo(filterTipo === t ? null : t)}
                />
              ))}
            </div>
          </div>

          {/* Organização */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">
              Organização
            </p>
            <div className="flex flex-wrap gap-2">
              {orgs.map((o) => (
                <FilterChip
                  key={o}
                  label={o}
                  active={filterOrg === o}
                  onClick={() => setFilterOrg(filterOrg === o ? null : o)}
                />
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={() => {
                setFilterTipo(null)
                setFilterTema(null)
                setFilterOrg(null)
              }}
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              >
                <ProjectCard item={item} onClick={() => setSelected(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--color-muted)] py-16 text-sm">
            Nenhum projeto encontrado com os filtros selecionados.
          </p>
        )}
      </div>

      <ProjectModal item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

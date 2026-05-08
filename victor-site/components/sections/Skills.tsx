'use client'

import { motion } from 'framer-motion'
import { getHabilidades } from '@/lib/data'

const categoryConfig = [
  {
    key: 'analise_dados' as const,
    label: 'Análise de Dados',
    color: 'oklch(55% 0.15 250)',
    bg: 'oklch(95% 0.03 250)',
  },
  {
    key: 'visualizacao' as const,
    label: 'Visualização',
    color: 'oklch(55% 0.15 200)',
    bg: 'oklch(95% 0.03 200)',
  },
  {
    key: 'gestao_projetos' as const,
    label: 'Gestão de Projetos',
    color: 'oklch(55% 0.12 150)',
    bg: 'oklch(95% 0.03 150)',
  },
  {
    key: 'pesquisa' as const,
    label: 'Pesquisa',
    color: 'oklch(55% 0.12 30)',
    bg: 'oklch(95% 0.03 30)',
  },
]

export function Skills() {
  const habilidades = getHabilidades()

  return (
    <section
      id="habilidades"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[var(--color-border)]"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-10 text-[var(--color-text)]"
          style={{ fontFamily: 'var(--font-inter-tight)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Habilidades
        </motion.h2>

        <div className="space-y-8">
          {/* Ferramentas por categoria */}
          {categoryConfig.map((cat, gi) => {
            const items = habilidades[cat.key]
            if (!items || items.length === 0) return null

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
              >
                <h3
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-full font-medium"
                      style={{ color: cat.color, background: cat.bg }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* Idiomas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: categoryConfig.length * 0.08 }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: 'oklch(55% 0.12 320)' }}
            >
              Idiomas
            </h3>
            <div className="flex flex-wrap gap-3">
              {habilidades.idiomas.map((lang) => (
                <div
                  key={lang.idioma}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <span className="text-sm font-medium text-[var(--color-text)]">{lang.idioma}</span>
                  <span className="text-xs text-[var(--color-muted)]">— {lang.nivel}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

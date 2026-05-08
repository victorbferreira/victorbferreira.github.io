'use client'

import { motion } from 'framer-motion'
import { getFormacao } from '@/lib/data'

export function Education() {
  const formacao = getFormacao()

  return (
    <section
      id="formacao"
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
          Formação
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {formacao.map((f, i) => {
            const isOngoing = f.fim === null
            const isHighlight = f.instituicao.toLowerCase().includes('usp') || f.instituicao.toLowerCase().includes('esalq')

            return (
              <motion.div
                key={`${f.instituicao}-${f.inicio}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`p-5 rounded-xl border ${
                  isHighlight
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-bg)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {f.grau}
                  </span>
                  {isOngoing && (
                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                      Em andamento
                    </span>
                  )}
                </div>

                <h3
                  className="font-semibold text-[var(--color-text)] mb-1 leading-snug"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {f.curso}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-1">{f.instituicao}</p>
                <p className="text-xs text-[var(--color-muted)]">
                  {f.inicio}
                  {f.fim ? ` — ${f.fim}` : ''}
                </p>

                {f.linha_pesquisa && (
                  <p className="text-xs text-[var(--color-muted)] mt-2 italic">
                    Linha: {f.linha_pesquisa}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

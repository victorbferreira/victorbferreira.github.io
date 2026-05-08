'use client'

import { motion } from 'framer-motion'
import { getDocencia } from '@/lib/data'

const papelColors: Record<string, string> = {
  Professor: 'var(--color-accent)',
  Orientador: 'oklch(55% 0.15 150)',
  Avaliador: 'oklch(55% 0.15 30)',
  'Avaliador/Orientador': 'oklch(55% 0.15 200)',
  Facilitador: 'oklch(55% 0.15 280)',
  'Professor/Facilitador': 'oklch(55% 0.15 250)',
}

export function Teaching() {
  const docencia = getDocencia()

  const grouped = docencia.reduce<Record<string, typeof docencia>>((acc, d) => {
    const key = d.instituicao
    if (!acc[key]) acc[key] = []
    acc[key].push(d)
    return acc
  }, {})

  return (
    <section
      id="docencia"
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
          Docência
        </motion.h2>

        <div className="space-y-8">
          {Object.entries(grouped).map(([inst, items], gi) => (
            <motion.div
              key={inst}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
            >
              <h3
                className="text-sm font-semibold text-[var(--color-accent)] mb-3"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
              >
                {inst}
              </h3>
              <div className="space-y-2">
                {items.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 py-3 border-b border-[var(--color-border)]"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-text)] mb-0.5">{d.disciplina}</p>
                      <p className="text-xs text-[var(--color-muted)]">{d.curso}</p>
                      {d.obs && (
                        <p className="text-xs text-[var(--color-muted)] mt-0.5 italic">{d.obs}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                        style={{ background: papelColors[d.papel] ?? 'var(--color-muted)' }}
                      >
                        {d.papel}
                      </span>
                      {d.turmas && (
                        <span className="text-xs text-[var(--color-muted)]">
                          {d.turmas} turma{d.turmas > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { getPublicacoes } from '@/lib/data'

export function Publications() {
  const publicacoes = getPublicacoes()

  return (
    <section
      id="publicacoes"
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
          Publicações
        </motion.h2>

        <div className="space-y-0">
          {publicacoes.map((pub, i) => (
            <motion.div
              key={`${pub.titulo}-${pub.ano}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="py-5 border-b border-[var(--color-border)] group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-[var(--color-text)] leading-snug mb-1.5"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    {pub.titulo}
                  </p>
                  <p className="text-sm text-[var(--color-muted)] mb-1">
                    {pub.coautores.length > 0
                      ? `Com ${pub.coautores.join(', ')}`
                      : 'Autor único'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[var(--color-accent)] font-medium">{pub.periodico}</span>
                    <span className="text-[var(--color-muted)]">·</span>
                    <span className="text-[var(--color-muted)]">{pub.ano}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)]">
                      {pub.tipo}
                    </span>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 mt-1 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-transform group-hover:rotate-45 duration-200"
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

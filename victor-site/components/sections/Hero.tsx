'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { getPessoa, getExperiencias, getPortfolio, getPublicacoes } from '@/lib/data'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(v) {
        setVal(Math.round(v))
      },
    })
    return controls.stop
  }, [inView, to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Hero() {
  const pessoa = getPessoa()
  const experiencias = getExperiencias()
  const portfolio = getPortfolio()
  const publicacoes = getPublicacoes()

  const currentExps = experiencias.filter((e) => e.fim === 'Atual')
  const subtitulo = currentExps
    .map((e) => e.cargo)
    .join(' · ')

  const nomeWords = pessoa.nome.split(' ')

  const anoInicio = 2016
  const anoAtual = new Date().getFullYear()
  const anosExp = anoAtual - anoInicio

  const stats = [
    { value: anosExp, label: 'anos de experiência', suffix: '+' },
    { value: portfolio.length, label: 'projetos', suffix: '' },
    { value: 6, label: 'municípios assessorados', suffix: '' },
    { value: publicacoes.length, label: 'publicações', suffix: '' },
  ]

  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* Conteúdo */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] bg-[var(--color-accent-bg)] px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                Aberto a oportunidades
              </span>
            </motion.div>

            {/* Nome */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-tight mb-4 text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              {nomeWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.2em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-[var(--color-muted)] mb-8 leading-relaxed"
            >
              {subtitulo}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-[var(--color-accent)]"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[var(--color-muted)] mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="/victor-barcelos-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-sm font-medium transition-opacity hover:opacity-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Baixar Currículo
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text)] text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Ver Portfólio
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Foto / Placeholder */}
          <motion.div
            className="mt-10 md:mt-0 flex justify-center md:justify-end flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div
              className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl flex items-center justify-center text-4xl font-extrabold tracking-tight"
              style={{
                background: 'var(--color-accent-bg)',
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-inter-tight)',
              }}
              aria-label="Foto de Victor Barcelos Ferreira"
            >
              VBF
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

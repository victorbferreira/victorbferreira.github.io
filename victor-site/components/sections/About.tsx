'use client'

import { motion } from 'framer-motion'

const placeholderColors = [
  'oklch(85% 0.08 250)',
  'oklch(88% 0.06 220)',
  'oklch(83% 0.10 260)',
]

const bio = [
  'Formado em Ciências Econômicas pela UFV e Mestre em Administração Pública pela Fundação João Pinheiro, iniciei minha trajetória profissional em pesquisa educacional e migrei para políticas públicas ao ingressar na própria FJP, onde trabalhei por quase cinco anos Na Diretoria de Políticas Públicas.',

  'Na FJP coordenei e executei mais de 14 projetos de pesquisa aplicada e consultoria para órgãos estaduais e municipais de Minas Gerais. Os principais produtos eram avaliações de programas governamentais e implantação de sistemas de monitoramento.',
  'Em 2025 me tornei sócio da Sophos Governança, empresa focada em parcerias estratégicas com o setor público para planejamento, finanças públicas e gestão de pessoal. Sou também professor orientador no MBA em Gestão de Projetos da USP/Esalq.',
]

export function About() {
  const placeholders = [
    { initials: 'VBF', label: 'Victor em trabalho de campo' },
    { initials: 'VBF', label: 'Victor em apresentação' },
    { initials: 'VBF', label: 'Victor em evento acadêmico' },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="sobre" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Texto */}
          <motion.div variants={itemVariants}>
            <h2
              className="text-3xl font-bold mb-6 text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
              Sobre
            </h2>
            {bio.map((p, i) => (
              <p key={i} className="text-[var(--color-muted)] leading-relaxed text-base mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </motion.div>

          {/* Photo grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto md:max-w-none"
          >
            {placeholders.map((p, i) => (
              <motion.div
                key={i}
                className={`aspect-[3/4] rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-300 cursor-default select-none ${
                  i % 2 === 0 ? '-rotate-2' : 'rotate-2'
                } hover:rotate-0`}
                style={{
                  background: placeholderColors[i],
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-inter-tight)',
                }}
                aria-label={p.label}
              >
                {p.initials}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { getPessoa } from '@/lib/data'

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

function SocialButton({ href, label, icon }: SocialLink) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  )
}

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LattesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export function Contact() {
  const pessoa = getPessoa()
  const year = new Date().getFullYear()

  const socials: SocialLink[] = [
    {
      href: pessoa.linkedin,
      label: 'LinkedIn de Victor Barcelos Ferreira',
      icon: <LinkedInIcon />,
    },
    {
      href: `mailto:${pessoa.email}`,
      label: `Enviar e-mail para ${pessoa.email}`,
      icon: <MailIcon />,
    },
    {
      href: pessoa.lattes,
      label: 'Currículo Lattes de Victor Barcelos Ferreira',
      icon: <LattesIcon />,
    },
    {
      href: `https://www.researchgate.net/search?q=${encodeURIComponent(pessoa.nome)}`,
      label: 'Perfil no ResearchGate',
      icon: <ExternalIcon />,
    },
  ]

  return (
    <footer
      id="contato"
      className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[var(--color-border)]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-3xl font-bold mb-3 text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-inter-tight)' }}
          >
            Contato
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto">
            Aberto a projetos, parcerias e oportunidades acadêmicas.
          </p>

          <div className="flex items-center justify-center gap-3 mb-12">
            {socials.map((s) => (
              <SocialButton key={s.label} {...s} />
            ))}
          </div>

          <div className="text-xs text-[var(--color-muted)] space-y-1">
            <p>
              © {year} {pessoa.nome} · {pessoa.cidade}
            </p>
            <p>
              Construído com{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Next.js
              </a>
              {' '}·{' '}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Tailwind CSS
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

'use client'

import { motion } from 'framer-motion'
import { getExperiencias } from '@/lib/data'
import { ExperienceCard } from '@/components/ui/ExperienceCard'

export function Experience() {
  const experiencias = getExperiencias()

  return (
    <section
      id="experiencia"
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
          Experiência
        </motion.h2>

        <div>
          {experiencias.map((exp, i) => (
            <motion.div
              key={`${exp.organizacao}-${exp.inicio}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

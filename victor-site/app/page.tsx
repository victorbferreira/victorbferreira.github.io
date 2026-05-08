import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Portfolio } from '@/components/sections/Portfolio'
import { Education } from '@/components/sections/Education'
import { Publications } from '@/components/sections/Publications'
import { Teaching } from '@/components/sections/Teaching'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Education />
      <Publications />
      <Teaching />
      <Skills />
      <Contact />
    </main>
  )
}

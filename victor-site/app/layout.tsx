import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { NavBar } from '@/components/ui/NavBar'
import { getPessoa } from '@/lib/data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://victorbarcelosferreira.com'),
  title: 'Victor Barcelos Ferreira — Economista e Consultor em Políticas Públicas',
  description:
    'Site pessoal de Victor Barcelos Ferreira. Portfólio de projetos em políticas públicas, planejamento estratégico municipal e avaliação de programas sociais. Belo Horizonte, MG.',
  openGraph: {
    title: 'Victor Barcelos Ferreira',
    description: 'Economista e consultor em políticas públicas. Portfólio de 20 projetos.',
    url: 'https://victorbarcelosferreira.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pessoa = getPessoa()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: pessoa.nome,
    jobTitle: 'Economista e Consultor em Políticas Públicas',
    worksFor: { '@type': 'Organization', name: 'Sophos Governança' },
    alumniOf: 'Universidade Federal de Viçosa',
    email: pessoa.email,
    sameAs: [pessoa.linkedin, pessoa.lattes],
  }

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import { siteRoutes } from '@/components/magicpath/routes'
import type { serializeMariagePage } from '@/lib/payload/serialize'

type MariageIndexProps = {
  page: ReturnType<typeof serializeMariagePage>
  weddings: { slug: string; label: string; date?: string | null; location?: string | null }[]
}

const defaultHeroImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467302842281984/427467302875836416/b3832bd94905fb746bd708e676dbc3ab7c434283d46fa4ad55a8c42693d6c700.png'

export const MariageIndex: React.FC<MariageIndexProps> = ({ page, weddings }) => {
  const heroImage = page.hero.imageUrl || defaultHeroImage

  return (
    <SiteShell activeTab="Mariage">
      <section
        className="relative flex min-h-[420px] items-end overflow-hidden bg-[#1e40af] pt-24 pb-16 md:min-h-[500px]"
        aria-labelledby="mariage-hero-title"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          {page.hero.eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              {page.hero.eyebrow}
            </p>
          )}
          <h1 id="mariage-hero-title" className="max-w-3xl font-serif text-5xl leading-tight text-white md:text-7xl">
            {page.hero.title || 'Mariage'}
          </h1>
          {page.hero.subtitle && (
            <p className="mt-7 max-w-xl text-base leading-7 text-blue-50 md:text-lg">{page.hero.subtitle}</p>
          )}
        </div>
      </section>

      <section className="bg-[#eab308] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16">
          <p className="font-serif text-2xl font-bold leading-snug text-[#1e2d5a] md:text-3xl">
            {page.cta?.text ||
              "Vous voulez accompagner votre mariage d'une chorale ? Contactez-nous."}
          </p>
          <Link
            href={siteRoutes.contact}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#1e40af] shadow-md transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            <Mail className="h-5 w-5" />
            {page.cta?.buttonLabel || 'Nous contacter'}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" aria-labelledby="prestations-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <h2 id="prestations-title" className="mb-10 font-serif text-3xl font-bold text-[#1e40af] md:text-4xl">
            Exemples de prestations réalisées
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weddings.map((wedding) => (
              <li key={wedding.slug}>
                <Link
                  href={`/mariage/${wedding.slug}`}
                  className="flex min-h-[88px] flex-col justify-center rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                >
                  <span className="text-sm font-medium text-slate-700 hover:text-[#1e40af]">
                    {wedding.label}
                  </span>
                  {(wedding.date || wedding.location) && (
                    <span className="mt-1 text-xs text-slate-400">
                      {[wedding.date, wedding.location].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  )
}

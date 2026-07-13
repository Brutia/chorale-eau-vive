'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Heart, Music2, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { siteRoutes } from '@/components/magicpath/routes'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import { ContentCard } from './ContentCard'
import { SectionHeader } from './SectionHeader'
import type { serializeAccueil } from '@/lib/payload/serialize'

type HomeProps = {
  data: ReturnType<typeof serializeAccueil>
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  music: Music2,
  sparkles: Sparkles,
  heart: Heart,
}

const defaultHeroImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467302842281984/427467302875836416/9ec2f46cc9fb50749f1a1ce1bd7921a4f1b48a65650758f1182bac6331d8994b.png'

export const Home = ({ data }: HomeProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const heroImage = data.hero.imageUrl || defaultHeroImage
  const welcomeImage = data.welcome.imageUrl || heroImage

  return (
    <SiteShell activeTab="Home">
      <section
        id="home"
        className="relative flex min-h-[680px] items-center overflow-hidden bg-[#1e40af] pt-24"
        aria-labelledby="hero-title"
      >
        <img
          src={heroImage}
          alt="Le Groupe Vocal L'Eau Vive réuni pour chanter"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 text-center sm:px-10 lg:px-16">
          {data.hero.eyebrow && (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.32em] text-yellow-300">
              {data.hero.eyebrow}
            </p>
          )}
          <h1
            id="hero-title"
            className="mx-auto max-w-4xl font-serif text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {data.hero.title || 'Groupe Vocal'}
            <br />
            <em className="font-serif not-italic text-yellow-300">
              {data.hero.titleEmphasis || "L'Eau Vive"}
            </em>
          </h1>
          {data.hero.subtitle && (
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-blue-50 sm:text-xl">
              {data.hero.subtitle}
            </p>
          )}
          <a
            href={data.hero.ctaHref || '#actualites'}
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#eab308] px-7 py-4 font-semibold text-[#1e2d5a] shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            {data.hero.ctaLabel || 'Nous découvrir'} <ArrowRight className="h-5 w-5" />
          </a>
          <div className="mt-16 flex justify-center gap-3" aria-label="Sélection de la diapositive">
            {[0, 1, 2].map((slide) => (
              <button
                key={`slide-${slide}`}
                type="button"
                onClick={() => setActiveSlide(slide)}
                aria-label={`Afficher la diapositive ${slide + 1}`}
                aria-current={activeSlide === slide}
                className={`h-2.5 rounded-full transition-all ${activeSlide === slide ? 'w-10 bg-yellow-300' : 'w-2.5 bg-white/60 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" aria-labelledby="welcome-title">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-16">
          <div>
            {data.welcome.eyebrow && (
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#3b82f6]">
                {data.welcome.eyebrow}
              </p>
            )}
            {data.welcome.title && (
              <h2
                id="welcome-title"
                className="font-serif text-4xl font-bold leading-tight text-[#1e40af] sm:text-5xl"
                dangerouslySetInnerHTML={{ __html: data.welcome.title }}
              />
            )}
            <div className="mt-8 h-1 w-20 rounded-full bg-[#eab308]" />
            {data.welcome.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-8 max-w-xl text-lg leading-8 text-slate-600 first:mt-8">
                {paragraph}
              </p>
            ))}
            {data.welcome.linkLabel && (
              <a
                href={data.welcome.linkHref || '#presentation'}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-[#1e40af] hover:text-[#3b82f6]"
              >
                {data.welcome.linkLabel} <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
          <figure className="relative">
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-xl bg-[#eab308]" aria-hidden="true" />
            <img
              src={welcomeImage}
              alt="Choristes de L'Eau Vive en concert"
              className="relative aspect-[4/3] w-full rounded-xl object-cover shadow-2xl"
            />
            {data.welcome.caption && (
              <figcaption className="mt-4 text-sm text-slate-500">{data.welcome.caption}</figcaption>
            )}
          </figure>
        </div>
      </section>

      {data.actualites.length > 0 && (
        <section id="actualites" className="bg-[#f8fafc] py-24 sm:py-32" aria-labelledby="news-title">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <SectionHeader
              title={data.newsSection.title || 'Actualités & Événements'}
              subtitle={data.newsSection.subtitle || 'La vie du chœur'}
              align="left"
            />
            <div className="grid gap-7 md:grid-cols-3">
              {data.actualites.map((card) => (
                <ContentCard
                  key={`${card.title}-${card.date}`}
                  image={card.imageUrl || defaultHeroImage}
                  title={card.title}
                  date={card.date || ''}
                  description={card.description || ''}
                  category={card.category || 'Autre'}
                  href={card.link || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="mariage" className="bg-[#eab308] py-16" aria-labelledby="wedding-title">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:px-10 md:flex-row md:items-center lg:px-16">
          <div>
            {data.weddingCta.eyebrow && (
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#1e2d5a]/70">
                {data.weddingCta.eyebrow}
              </p>
            )}
            <h2 id="wedding-title" className="font-serif text-4xl font-bold text-[#1e2d5a] sm:text-5xl">
              {data.weddingCta.title || 'Votre mariage doit être fêté !'}
            </h2>
            {data.weddingCta.text && (
              <p className="mt-4 text-lg text-[#1e2d5a]/80">{data.weddingCta.text}</p>
            )}
          </div>
          <Link
            href={siteRoutes.mariage}
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-[#1e40af] shadow-md transition hover:-translate-y-1 hover:bg-blue-50"
          >
            {data.weddingCta.buttonLabel || 'Découvrir nos prestations mariage'}{' '}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {data.miniCards.length > 0 && (
        <section id="presentation" className="bg-white py-20" aria-labelledby="discover-title">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <h2 id="discover-title" className="sr-only">
              Découvrir L&apos;Eau Vive
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.miniCards.map((card) => {
                const Icon = iconMap[card.icon || 'users'] || Users
                return (
                  <article
                    key={card.title}
                    className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#1e40af]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1e40af]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{card.text}</p>
                    <Link
                      href={card.link || siteRoutes.accueil}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#3b82f6]"
                    >
                      En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  )
}

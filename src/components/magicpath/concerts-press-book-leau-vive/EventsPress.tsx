'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import { ContentCard } from './ContentCard'
import { SectionHeader } from './SectionHeader'
import type { serializeConcertsPage } from '@/lib/payload/serialize'

type EventsPressProps = {
  data: ReturnType<typeof serializeConcertsPage>
}

const defaultImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467403904036864/427467403933396992/9ec2f46cc9fb50749f1a1ce1bd7921a4f1b48a65650758f1182bac6331d8994b.png'

export const EventsPress = ({ data }: EventsPressProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'Presse' | 'Concerts'>('Presse')
  const cards = selectedFilter === 'Presse' ? data.presse : data.concerts
  const heroImage = data.hero.imageUrl || defaultImage

  return (
    <SiteShell activeTab="Concerts">
      <section
        aria-labelledby="events-hero-title"
        className="relative flex min-h-[540px] items-end overflow-hidden bg-[#1e40af] pt-24 pb-16"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          {data.hero.eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              {data.hero.eyebrow}
            </p>
          )}
          <h1 id="events-hero-title" className="max-w-3xl text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            {data.hero.title || 'Concerts & Presse'}
          </h1>
          {data.hero.subtitle && (
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-50 sm:text-lg">{data.hero.subtitle}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16" aria-labelledby="gazette-title">
        <div className="mb-12 flex flex-col gap-8 border-b border-blue-200 pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            title={data.sectionTitle || 'La Gazette Musicale de France'}
            subtitle={data.sectionSubtitle || 'Archives & actualités'}
            align="left"
            className="mb-0"
          />
          <div
            className="flex w-fit rounded-full border border-blue-800 bg-white p-1 shadow-sm"
            aria-label="Filtrer les contenus"
          >
            <button
              type="button"
              onClick={() => setSelectedFilter('Presse')}
              aria-pressed={selectedFilter === 'Presse'}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${selectedFilter === 'Presse' ? 'bg-[#1e40af] text-white shadow-md' : 'text-[#1e40af] hover:bg-blue-50'}`}
            >
              Presse
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('Concerts')}
              aria-pressed={selectedFilter === 'Concerts'}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${selectedFilter === 'Concerts' ? 'bg-[#1e40af] text-white shadow-md' : 'text-[#1e40af] hover:bg-blue-50'}`}
            >
              Concerts
            </button>
          </div>
        </div>

        {selectedFilter === 'Presse' && data.gazette && (
          <div className="mb-14">
            <a
              href="#press-grid"
              className="group block overflow-hidden rounded-xl bg-[#fff9e8] shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex min-h-[220px] items-center justify-center border-b border-yellow-100 px-6 py-10 text-center sm:min-h-[270px]">
                <div>
                  <p className="font-serif text-4xl font-bold leading-none text-[#b33b32] sm:text-6xl">
                    {data.gazette.title || 'La Gazette'}
                  </p>
                  <p className="mt-1 font-serif text-3xl italic text-[#b33b32] sm:text-5xl">
                    {data.gazette.titleItalic || 'Musicale de France'}
                  </p>
                  <div className="mx-auto mt-5 h-1 w-24 bg-yellow-500" />
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">
                    {data.gazette.subtitle || 'Le journal de nos concerts'}
                  </p>
                </div>
              </div>
              {data.gazette.instruction && (
                <p className="flex items-center justify-center gap-2 px-5 py-4 text-center text-sm italic text-[#1e40af]">
                  {data.gazette.instruction}{' '}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </p>
              )}
            </a>
          </div>
        )}

        <div id="press-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, cardIndex) => (
            <ContentCard
              key={`${card.title}-${card.date}`}
              image={card.imageUrl || defaultImage}
              title={card.title}
              date={card.date || ''}
              description={card.description || ''}
              category={selectedFilter === 'Presse' ? 'Presse' : 'Concert'}
              variant="gallery"
              href={card.url || undefined}
            />
          ))}
        </div>
      </section>
    </SiteShell>
  )
}

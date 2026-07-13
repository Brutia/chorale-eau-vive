'use client'

import React from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import type { serializeActivitesPage } from '@/lib/payload/serialize'

type ActivitiesIndexProps = {
  page: ReturnType<typeof serializeActivitesPage>
  activities: { slug: string; label: string }[]
}

const defaultHeroImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467302842281984/427467302875836416/a82f8b939322eb7311722dddb5a204adfe8d454114a4987f42e984129cbd6d50.png'

export const ActivitiesIndex: React.FC<ActivitiesIndexProps> = ({ page, activities }) => {
  const heroImage = page.hero.imageUrl || defaultHeroImage

  return (
    <SiteShell activeTab="Activités">
      <section
        className="relative flex min-h-[420px] items-end overflow-hidden bg-[#1e40af] pt-24 pb-16 md:min-h-[500px]"
        aria-labelledby="activities-hero-title"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          {page.hero.eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              {page.hero.eyebrow}
            </p>
          )}
          <h1
            id="activities-hero-title"
            className="max-w-3xl font-serif text-5xl leading-tight text-white md:text-7xl"
          >
            {page.hero.title || 'Activités'}
          </h1>
          {page.hero.subtitle && (
            <p className="mt-7 max-w-xl text-base leading-7 text-blue-50 md:text-lg">{page.hero.subtitle}</p>
          )}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <li key={activity.slug}>
                <Link
                  href={`/activites/${activity.slug}`}
                  className="flex min-h-[88px] items-center rounded-xl border border-slate-100 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1e40af] hover:shadow-md"
                >
                  {activity.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import RichText from '@/components/RichText'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { serializeConcert } from '@/lib/payload/serialize'

type ConcertLocationPageProps = {
  concert: ReturnType<typeof serializeConcert>
  otherConcerts: { slug: string; label: string }[]
}

const defaultHeroImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467302842281984/427467302875836416/9ec2f46cc9fb50749f1a1ce1bd7921a4f1b48a65650758f1182bac6331d8994b.png'

export const ConcertLocationPage: React.FC<ConcertLocationPageProps> = ({
  concert,
  otherConcerts,
}) => {
  const heroImage = concert.heroImageUrl || defaultHeroImage
  const hasContent = Boolean(concert.content)

  return (
    <SiteShell activeTab="Concerts" activeConcertSlug={concert.slug}>
      <section
        className="relative flex min-h-[420px] items-end overflow-hidden bg-[#1e40af] pt-24 pb-16 md:min-h-[500px]"
        aria-labelledby="concert-hero-title"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">Concerts</p>
          <h1
            id="concert-hero-title"
            className="max-w-4xl font-serif text-4xl leading-tight text-white md:text-6xl"
          >
            {concert.title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          {hasContent ? (
            <div className="prose prose-lg max-w-none text-slate-600">
              <RichText data={concert.content as DefaultTypedEditorState} enableGutter={false} />
            </div>
          ) : (
            <p className="text-lg leading-8 text-slate-600">
              Le contenu de cette page sera bientôt disponible. Les bénévoles de l&apos;association
              complèteront ce récit de nos concerts.
            </p>
          )}
          <Link
            href="/concerts"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-[#1e40af] hover:text-[#3b82f6]"
          >
            <ArrowLeft className="h-4 w-4" />
            Concerts &amp; Presse
          </Link>
        </div>
      </section>

      {otherConcerts.length > 0 && (
        <section className="border-t border-slate-100 bg-[#f8fafc] py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <h2 className="mb-8 font-serif text-2xl font-bold text-[#1e40af]">Autres concerts</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherConcerts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/concerts/${item.slug}`}
                    className="block rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#1e40af]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </SiteShell>
  )
}

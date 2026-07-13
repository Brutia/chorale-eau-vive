'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import { SectionHeader } from './SectionHeader'
import type { serializePresentation } from '@/lib/payload/serialize'

type PresentationPageProps = {
  data: ReturnType<typeof serializePresentation>
}

const defaultImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467352599310336/427467352641253376/9ec2f46cc9fb50749f1a1ce1bd7921a4f1b48a65650758f1182bac6331d8994b.png'

export const PresentationPage: React.FC<PresentationPageProps> = ({ data }) => {
  const heroImage = data.hero.imageUrl || defaultImage

  return (
    <SiteShell activeTab="Présentation">
      <section
        className="relative flex min-h-[540px] items-end overflow-hidden bg-[#1e40af] pt-24 pb-16 md:min-h-[600px]"
        aria-labelledby="presentation-hero-title"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          {data.hero.eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              {data.hero.eyebrow}
            </p>
          )}
          <h1 id="presentation-hero-title" className="max-w-3xl text-5xl leading-[1.05] text-white md:text-7xl">
            {data.hero.title || 'Qui sommes-nous ?'}
          </h1>
          {data.hero.subtitle && (
            <p className="mt-7 max-w-xl text-base leading-7 text-blue-50 md:text-lg">{data.hero.subtitle}</p>
          )}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="history-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[.9fr_1.1fr] md:items-center lg:gap-20 lg:px-10">
          <div>
            {data.history.eyebrow && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                {data.history.eyebrow}
              </p>
            )}
            {data.history.title && (
              <h2 id="history-title" className="text-4xl leading-tight md:text-5xl">
                {data.history.title}
              </h2>
            )}
            <div className="mt-8 space-y-5 text-[17px] leading-8 text-slate-600">
              {data.history.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure className="overflow-hidden rounded-[12px] shadow-soft">
            <img
              src={data.history.imageUrl || defaultImage}
              alt="Les choristes de L'Eau Vive réunis en concert"
              className="h-[360px] w-full object-cover md:h-[500px]"
            />
            {data.history.caption && (
              <figcaption className="bg-slate-50 px-5 py-4 text-sm italic text-slate-500">
                {data.history.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {data.teamMembers.length > 0 && (
        <section className="bg-slate-50 py-20 md:py-28" aria-labelledby="team-title">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              title={data.teamSection.title || "L'équipe artistique"}
              subtitle={data.teamSection.subtitle || "Celles et ceux qui font sonner L'Eau Vive"}
            />
            <div className="grid gap-8 lg:grid-cols-2">
              {data.teamMembers.map((member, index) => {
                const imageFirst = member.imagePosition === 'left'
                const imageBlock = (
                  <figure className="min-h-[280px] md:min-h-full">
                    <img
                      src={member.imageUrl || defaultImage}
                      alt={member.name || ''}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                )
                const textBlock = (
                  <div className="p-7 md:p-8">
                    {member.roleLabel && (
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600">
                        {member.roleLabel}
                      </p>
                    )}
                    <h3 className="text-2xl leading-tight text-blue-900">{member.name}</h3>
                    {member.bio && (
                      <div className="prose prose-sm mt-5 max-w-none text-slate-600">
                        <RichText data={member.bio} enableGutter={false} />
                      </div>
                    )}
                  </div>
                )

                return (
                  <article
                    key={`${member.name}-${index}`}
                    className={`grid overflow-hidden rounded-[12px] bg-white shadow-soft ${
                      imageFirst ? 'md:grid-cols-[.82fr_1.18fr]' : 'md:grid-cols-[1.18fr_.82fr]'
                    }`}
                  >
                    {imageFirst ? (
                      <>
                        {imageBlock}
                        {textBlock}
                      </>
                    ) : (
                      <>
                        {textBlock}
                        {imageBlock}
                      </>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {data.gallery.length > 0 && (
        <section className="bg-white py-20 md:py-28" aria-labelledby="years-title">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeader
              title={data.gallerySection.title || "L'Eau Vive au fil des années"}
              subtitle={data.gallerySection.subtitle || 'Des souvenirs qui continuent de chanter'}
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
              {data.gallery.map((item, index) => (
                <figure key={`${item.imageUrl}-${index}`} className="overflow-hidden rounded-xl">
                  <img
                    src={item.imageUrl || defaultImage}
                    alt={item.alt || ''}
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-64"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  )
}

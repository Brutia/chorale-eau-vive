'use client'

import { FormBlock } from '@/blocks/Form/Component'
import type { FormBlockType } from '@/blocks/Form/Component'
import { Facebook, Mail, MapPin, Send } from 'lucide-react'
import Link from 'next/link'
import { SiteShell } from '@/components/magicpath/shared/SiteShell'
import { SectionHeader } from './SectionHeader'
import { siteRoutes } from '@/components/magicpath/routes'
import type { serializeContact } from '@/lib/payload/serialize'

interface ContactCardProps {
  icon: 'location' | 'email' | 'facebook'
  title: string
  children: React.ReactNode
}

const ContactInfoCard = ({ icon, title, children }: ContactCardProps) => {
  const Icon = icon === 'location' ? MapPin : icon === 'email' ? Mail : Facebook
  return (
    <article className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(30,64,175,0.07)] transition-shadow hover:shadow-[0_12px_30px_rgba(30,64,175,0.12)]">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${icon === 'facebook' ? 'bg-blue-100 text-[#1e40af]' : 'bg-blue-50 text-[#1e40af]'}`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <div>
        <h3 className="mb-1 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          {title}
        </h3>
        <div className="text-base leading-7 text-slate-700">{children}</div>
      </div>
    </article>
  )
}

type ContactScreenProps = {
  data: ReturnType<typeof serializeContact>
}

const defaultHeroImage =
  'https://storage.googleapis.com/storage.magicpath.ai/component-assets/427467448967639040/427467448996999168/9ec2f46cc9fb50749f1a1ce1bd7921a4f1b48a65650758f1182bac6331d8994b.png'

export const ContactScreen = ({ data }: ContactScreenProps) => {
  const heroImage = data.hero.imageUrl || defaultHeroImage
  const email = data.email || 'eauvive@evc.net'

  return (
    <SiteShell activeTab="Contacts">
      <section
        className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-[#1e40af] pt-24 pb-16 text-center"
        aria-labelledby="contact-hero-title"
      >
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#1e40af]/70" aria-hidden="true" />
        <div className="relative max-w-3xl px-6">
          {data.hero.eyebrow && (
            <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
              {data.hero.eyebrow}
            </p>
          )}
          <h1
            id="contact-hero-title"
            className="font-heading text-5xl leading-[1.05] text-white drop-shadow-sm sm:text-7xl"
          >
            {data.hero.title || 'Contactez-nous'}
          </h1>
          {data.hero.subtitle && (
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-blue-50 sm:text-xl">
              {data.hero.subtitle}
            </p>
          )}
          <span className="mx-auto mt-8 block h-1 w-16 rounded-full bg-[#eab308]" aria-hidden="true" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28" aria-labelledby="contact-section-title">
        <SectionHeader
          title={data.sectionTitle || 'Une question, un projet ?'}
          subtitle={data.sectionSubtitle || 'Échangeons'}
        />
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-16">
          <div className="space-y-5">
            {data.introTitle && (
              <div className="mb-8 max-w-md">
                <h2 id="contact-section-title" className="font-heading text-3xl text-[#1e40af]">
                  {data.introTitle}
                </h2>
              </div>
            )}

            {data.findUs && (
              <ContactInfoCard icon="location" title="Nous trouver">
                <address className="not-italic">{data.findUs}</address>
              </ContactInfoCard>
            )}
            <ContactInfoCard icon="email" title={data.emailLabel || 'Nous écrire'}>
              <a
                className="font-medium text-[#1e40af] underline decoration-blue-200 underline-offset-4 hover:text-[#3b82f6]"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </ContactInfoCard>
            <ContactInfoCard icon="facebook" title={data.facebookLabel || 'Rester au courant'}>
              <div className="flex flex-wrap items-center gap-3">
                <span>{data.facebookText || 'Suivez-nous sur Facebook'}</span>
                {data.facebookUrl && (
                  <a
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1e40af] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#17358f]"
                    href={data.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Suivez Groupe Vocal L'Eau Vive sur Facebook"
                  >
                    <Facebook className="h-4 w-4" fill="currentColor" /> Facebook
                  </a>
                )}
              </div>
            </ContactInfoCard>

            {data.weddingPromo?.title && (
              <article className="rounded-xl bg-[#eab308] p-6 text-slate-950 shadow-[0_8px_24px_rgba(202,138,4,0.18)]">
                <h3 className="font-heading text-2xl text-slate-950">{data.weddingPromo.title}</h3>
                {data.weddingPromo.text && (
                  <p className="mt-3 text-sm font-medium leading-6">{data.weddingPromo.text}</p>
                )}
                <Link
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#1e2d5a] transition-colors hover:bg-slate-50"
                  href={siteRoutes.mariage}
                >
                  {data.weddingPromo.linkLabel || 'Voir nos prestations mariage'} <Send className="h-4 w-4" />
                </Link>
              </article>
            )}

            <div className="mt-8 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-[0_8px_24px_rgba(30,64,175,0.07)]">
              <div className="flex items-center justify-between border-b border-blue-100 px-5 py-4">
                <h3 className="font-heading text-xl text-[#1e40af]">
                  {data.mapTitle || 'Notre région'}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {data.mapLabel || 'Carte'}
                </span>
              </div>
              <div
                className="relative flex h-48 items-center justify-center overflow-hidden bg-[#dbeafe]"
                style={{
                  backgroundImage:
                    'linear-gradient(28deg, transparent 47%, rgba(59,130,246,.22) 48%, transparent 50%), linear-gradient(112deg, transparent 48%, rgba(255,255,255,.8) 49%, transparent 51%)',
                }}
              >
                <div
                  className="absolute left-[28%] top-[28%] h-20 w-20 rounded-full border border-white/70 bg-white/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-[18%] right-[18%] h-28 w-28 rounded-full border border-white/60 bg-white/20"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col items-center gap-2 rounded-lg bg-white px-4 py-3 text-center shadow-lg">
                  <MapPin className="h-6 w-6 text-[#1e40af]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-[#1e2d5a]">Strasbourg · Hoerdt</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_12px_36px_rgba(30,64,175,0.09)] sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3b82f6]">
                  Votre message
                </p>
                <h2 className="font-heading text-3xl text-[#1e40af] sm:text-4xl">Envoyez-nous un message</h2>
              </div>
              <span className="hidden rounded-full bg-blue-50 p-3 text-[#1e40af] sm:block" aria-hidden="true">
                <Mail className="h-5 w-5" />
              </span>
            </div>
            {data.form ? (
              <FormBlock enableIntro={false} form={data.form as unknown as FormBlockType['form']} />
            ) : (
              <p className="text-slate-600">
                Le formulaire de contact n&apos;est pas encore configuré. Créez un formulaire dans
                l&apos;admin (Formulaires) puis sélectionnez-le dans la page Contact.
              </p>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

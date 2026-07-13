import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getMariageBySlug, getMariages } from '@/lib/payload/queries'
import { serializeMariage, serializeNavItem } from '@/lib/payload/serialize'
import MariageSlugPageClient from './page.client'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const mariages = await getMariages({ draft: false })
  return mariages.map((wedding) => ({ slug: wedding.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const wedding = await getMariageBySlug(slug)

  if (!wedding) {
    return { title: "Mariage — Groupe Vocal L'Eau Vive" }
  }

  return {
    title: `${wedding.title} — Groupe Vocal L'Eau Vive`,
    description: `Prestation de mariage du Groupe Vocal L'Eau Vive : ${wedding.title}.`,
  }
}

export default async function MariageSlugRoutePage({ params }: PageProps) {
  const { slug } = await params
  const [wedding, allMariages] = await Promise.all([getMariageBySlug(slug), getMariages()])

  if (!wedding) {
    notFound()
  }

  const otherWeddings = allMariages.filter((item) => item.slug !== slug).map(serializeNavItem)

  return (
    <MariageSlugPageClient wedding={serializeMariage(wedding)} otherWeddings={otherWeddings} />
  )
}

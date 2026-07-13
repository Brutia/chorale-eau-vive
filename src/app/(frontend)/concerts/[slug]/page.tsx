import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getConcertBySlug, getConcerts } from '@/lib/payload/queries'
import { serializeConcert, serializeNavItem } from '@/lib/payload/serialize'
import ConcertSlugPageClient from './page.client'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const concerts = await getConcerts({ draft: false })
  return concerts.map((location) => ({ slug: location.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const concert = await getConcertBySlug(slug)

  if (!concert) {
    return { title: "Concert — Groupe Vocal L'Eau Vive" }
  }

  return {
    title: `${concert.title} — Groupe Vocal L'Eau Vive`,
    description: `Concert du Groupe Vocal L'Eau Vive : ${concert.title}.`,
  }
}

export default async function ConcertSlugRoutePage({ params }: PageProps) {
  const { slug } = await params
  const [concert, allConcerts] = await Promise.all([getConcertBySlug(slug), getConcerts()])

  if (!concert) {
    notFound()
  }

  const otherConcerts = allConcerts.filter((item) => item.slug !== slug).map(serializeNavItem)

  return (
    <ConcertSlugPageClient concert={serializeConcert(concert)} otherConcerts={otherConcerts} />
  )
}

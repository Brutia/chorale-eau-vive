import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getActiviteBySlug, getActivites } from '@/lib/payload/queries'
import { serializeActivite, serializeNavItem } from '@/lib/payload/serialize'
import ActiviteSlugPageClient from './page.client'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const activites = await getActivites({ draft: false })
  return activites.map((activity) => ({ slug: activity.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActiviteBySlug(slug)

  if (!activity) {
    return { title: "Activité — Groupe Vocal L'Eau Vive" }
  }

  return {
    title: `${activity.title} — Groupe Vocal L'Eau Vive`,
    description: `Activité du Groupe Vocal L'Eau Vive : ${activity.title}.`,
  }
}

export default async function ActiviteSlugRoutePage({ params }: PageProps) {
  const { slug } = await params
  const [activity, allActivites] = await Promise.all([getActiviteBySlug(slug), getActivites()])

  if (!activity) {
    notFound()
  }

  const otherActivities = allActivites
    .filter((item) => item.slug !== slug)
    .map(serializeNavItem)

  return (
    <ActiviteSlugPageClient activity={serializeActivite(activity)} otherActivities={otherActivities} />
  )
}

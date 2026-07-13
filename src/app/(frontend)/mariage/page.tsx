import type { Metadata } from 'next'

import { getMariagePageSettings, getMariages } from '@/lib/payload/queries'
import { serializeMariagePage, serializeNavItem } from '@/lib/payload/serialize'
import MariagePageClient from './page.client'

export const metadata: Metadata = {
  title: "Mariage — Groupe Vocal L'Eau Vive",
  description:
    "Des chants vivants et sensibles pour accompagner votre cérémonie religieuse avec le Groupe Vocal L'Eau Vive.",
}

export default async function MariageRoutePage() {
  const [page, mariages] = await Promise.all([getMariagePageSettings(), getMariages()])

  return (
    <MariagePageClient
      page={serializeMariagePage(page)}
      weddings={mariages.map((m) => ({
        slug: m.slug,
        label: m.title,
        date: m.date,
        location: m.location,
      }))}
    />
  )
}

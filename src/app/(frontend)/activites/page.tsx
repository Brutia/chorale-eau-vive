import type { Metadata } from 'next'

import { getActivites, getActivitesPageSettings } from '@/lib/payload/queries'
import { serializeActivitesPage, serializeNavItem } from '@/lib/payload/serialize'
import ActivitesPageClient from './page.client'

export const metadata: Metadata = {
  title: "Activités — Groupe Vocal L'Eau Vive",
  description:
    "Voyages, festivals et rencontres chorales du Groupe Vocal L'Eau Vive de Strasbourg.",
}

export default async function ActivitesRoutePage() {
  const [page, activites] = await Promise.all([getActivitesPageSettings(), getActivites()])

  return (
    <ActivitesPageClient
      page={serializeActivitesPage(page)}
      activities={activites.map(serializeNavItem)}
    />
  )
}

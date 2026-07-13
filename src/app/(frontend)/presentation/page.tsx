import type { Metadata } from 'next'

import { getPresentationPage } from '@/lib/payload/queries'
import { serializePresentation } from '@/lib/payload/serialize'
import PresentationPageClient from './page.client'

export const metadata: Metadata = {
  title: "Présentation — Groupe Vocal L'Eau Vive",
  description:
    "Découvrez l'histoire, l'équipe artistique et la vie du Groupe Vocal L'Eau Vive de Strasbourg.",
}

export default async function PresentationRoutePage() {
  const presentation = await getPresentationPage()
  const data = serializePresentation(presentation)

  return <PresentationPageClient data={data} />
}

import type { Metadata } from 'next'

import { getConcertsPageSettings, getEvenements } from '@/lib/payload/queries'
import { serializeConcertsPage } from '@/lib/payload/serialize'
import ConcertsPageClient from './page.client'

export const metadata: Metadata = {
  title: "Concerts & Presse — Groupe Vocal L'Eau Vive",
  description:
    "Retrouvez nos concerts, la gazette musicale et les actualités du Groupe Vocal L'Eau Vive.",
}

export default async function ConcertsRoutePage() {
  const [page, evenements] = await Promise.all([getConcertsPageSettings(), getEvenements()])
  const data = serializeConcertsPage(page, evenements)

  return <ConcertsPageClient data={data} />
}

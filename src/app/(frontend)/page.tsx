import type { Metadata } from 'next'

import {
  getAccueilPage,
  getActualites,
} from '@/lib/payload/queries'
import { serializeAccueil } from '@/lib/payload/serialize'
import AccueilPageClient from './page.client'

export const metadata: Metadata = {
  title: "Groupe Vocal L'Eau Vive — Accueil",
  description:
    "Chœur amateur de Strasbourg et environs. Découvrez nos concerts, notre histoire et rejoignez le Groupe Vocal L'Eau Vive.",
}

export default async function AccueilPage() {
  const [accueil, actualites] = await Promise.all([getAccueilPage(), getActualites()])
  const data = serializeAccueil(accueil, actualites)

  return <AccueilPageClient data={data} />
}

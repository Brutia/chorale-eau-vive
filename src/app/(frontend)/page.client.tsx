'use client'

import { Home } from '@/components/magicpath/accueil-leau-vive/Home'
import type { serializeAccueil } from '@/lib/payload/serialize'

type AccueilPageClientProps = {
  data: ReturnType<typeof serializeAccueil>
}

export default function AccueilPageClient({ data }: AccueilPageClientProps) {
  return <Home data={data} />
}

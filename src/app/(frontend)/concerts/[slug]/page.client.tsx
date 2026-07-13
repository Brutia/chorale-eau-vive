'use client'

import { ConcertLocationPage } from '@/components/magicpath/concerts/ConcertLocationPage'
import type { serializeConcert } from '@/lib/payload/serialize'

interface ConcertSlugPageClientProps {
  concert: ReturnType<typeof serializeConcert>
  otherConcerts: { slug: string; label: string }[]
}

export default function ConcertSlugPageClient({
  concert,
  otherConcerts,
}: ConcertSlugPageClientProps) {
  return <ConcertLocationPage concert={concert} otherConcerts={otherConcerts} />
}

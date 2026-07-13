'use client'

import { EventsPress } from '@/components/magicpath/concerts-press-book-leau-vive/EventsPress'
import type { serializeConcertsPage } from '@/lib/payload/serialize'

type ConcertsPageClientProps = {
  data: ReturnType<typeof serializeConcertsPage>
}

export default function ConcertsPageClient({ data }: ConcertsPageClientProps) {
  return <EventsPress data={data} />
}

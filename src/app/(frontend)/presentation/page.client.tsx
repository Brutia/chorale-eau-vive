'use client'

import { PresentationPage } from '@/components/magicpath/prsentation-leau-vive/PresentationPage'
import type { serializePresentation } from '@/lib/payload/serialize'

type PresentationPageClientProps = {
  data: ReturnType<typeof serializePresentation>
}

export default function PresentationPageClient({ data }: PresentationPageClientProps) {
  return <PresentationPage data={data} />
}

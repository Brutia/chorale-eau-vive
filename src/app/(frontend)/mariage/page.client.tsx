'use client'

import { MariageIndex } from '@/components/magicpath/mariage/MariageIndex'
import type { serializeMariagePage } from '@/lib/payload/serialize'

type MariagePageClientProps = {
  page: ReturnType<typeof serializeMariagePage>
  weddings: { slug: string; label: string; date?: string | null; location?: string | null }[]
}

export default function MariagePageClient({ page, weddings }: MariagePageClientProps) {
  return <MariageIndex page={page} weddings={weddings} />
}

'use client'

import { WeddingPage } from '@/components/magicpath/mariage/WeddingPage'
import type { serializeMariage } from '@/lib/payload/serialize'

interface MariageSlugPageClientProps {
  wedding: ReturnType<typeof serializeMariage>
  otherWeddings: { slug: string; label: string }[]
}

export default function MariageSlugPageClient({
  wedding,
  otherWeddings,
}: MariageSlugPageClientProps) {
  return <WeddingPage wedding={wedding} otherWeddings={otherWeddings} />
}

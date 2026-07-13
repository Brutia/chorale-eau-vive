'use client'

import { ActivityPage } from '@/components/magicpath/activites/ActivityPage'
import type { serializeActivite } from '@/lib/payload/serialize'

interface ActiviteSlugPageClientProps {
  activity: ReturnType<typeof serializeActivite>
  otherActivities: { slug: string; label: string }[]
}

export default function ActiviteSlugPageClient({
  activity,
  otherActivities,
}: ActiviteSlugPageClientProps) {
  return <ActivityPage activity={activity} otherActivities={otherActivities} />
}

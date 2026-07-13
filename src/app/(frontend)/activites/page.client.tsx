'use client'

import { ActivitiesIndex } from '@/components/magicpath/activites/ActivitiesIndex'
import type { serializeActivitesPage } from '@/lib/payload/serialize'

type ActivitesPageClientProps = {
  page: ReturnType<typeof serializeActivitesPage>
  activities: { slug: string; label: string }[]
}

export default function ActivitesPageClient({ page, activities }: ActivitesPageClientProps) {
  return <ActivitiesIndex page={page} activities={activities} />
}

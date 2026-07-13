import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

export const publishedCollectionDefaults = {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
} satisfies Partial<CollectionConfig>

export const sortOrderField = {
  name: 'sortOrder',
  type: 'number' as const,
  defaultValue: 0,
  admin: {
    description: "Ordre d'affichage (plus petit = en premier)",
    position: 'sidebar' as const,
  },
}

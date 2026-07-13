import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { publishedCollectionDefaults, sortOrderField } from '../shared'
import { createSlugCollectionHooks } from '@/hooks/revalidateSite'

export const Concerts: CollectionConfig<'concerts'> = {
  slug: 'concerts',
  labels: {
    singular: 'Concert',
    plural: 'Concerts',
  },
  ...publishedCollectionDefaults,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'updatedAt'],
    description: 'Pages détaillées des concerts (sous-menu Concerts).',
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Ex. : Concert à Truchtersheim',
      },
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
    },
    sortOrderField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    ...publishedCollectionDefaults.hooks,
    ...createSlugCollectionHooks({ paths: ['/concerts'], slugPrefix: '/concerts' }),
  },
}

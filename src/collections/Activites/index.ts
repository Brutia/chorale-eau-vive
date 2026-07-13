import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { publishedCollectionDefaults, sortOrderField } from '../shared'
import { createSlugCollectionHooks } from '@/hooks/revalidateSite'

export const Activites: CollectionConfig<'activites'> = {
  slug: 'activites',
  labels: {
    singular: 'Activité',
    plural: 'Activités',
  },
  ...publishedCollectionDefaults,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'updatedAt'],
    description: 'Voyages, festivals et rencontres chorales.',
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
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
    ...createSlugCollectionHooks({ paths: ['/activites'], slugPrefix: '/activites' }),
  },
}

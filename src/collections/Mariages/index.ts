import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { publishedCollectionDefaults, sortOrderField } from '../shared'
import { createSlugCollectionHooks } from '@/hooks/revalidateSite'

export const Mariages: CollectionConfig<'mariages'> = {
  slug: 'mariages',
  labels: {
    singular: 'Prestation mariage',
    plural: 'Mariages',
  },
  ...publishedCollectionDefaults,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'updatedAt'],
    description: 'Exemples de prestations mariage réalisées.',
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Ex. : Sophie & Thomas — Geudertheim',
      },
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'date',
      type: 'text',
      label: 'Date',
      admin: {
        description: 'Ex. : Juin 2024',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lieu',
      admin: {
        description: 'Ex. : Église Saint-Pierre, Geudertheim',
      },
    },
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
    ...createSlugCollectionHooks({ paths: ['/mariage'], slugPrefix: '/mariage' }),
  },
}

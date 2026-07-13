import type { CollectionConfig } from 'payload'

import { publishedCollectionDefaults, sortOrderField } from '../shared'
import {
  createRevalidateDeleteHook,
  createRevalidateHook,
} from '@/hooks/revalidateSite'

export const Evenements: CollectionConfig<'evenements'> = {
  slug: 'evenements',
  labels: {
    singular: 'Événement',
    plural: 'Événements presse & concerts',
  },
  ...publishedCollectionDefaults,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date', 'sortOrder'],
    description: 'Cartes affichées sur la page Concerts & Presse.',
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'presse',
      label: 'Type',
      options: [
        { label: 'Presse', value: 'presse' },
        { label: 'Concert', value: 'concert' },
      ],
    },
    {
      name: 'date',
      type: 'text',
      label: 'Date',
      admin: {
        description: 'Ex. : 5 juin 2019',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Lien externe',
      admin: {
        description: 'Optionnel — lien vers un article de presse.',
      },
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
    afterChange: [createRevalidateHook({ paths: ['/concerts'] })],
    afterDelete: [createRevalidateDeleteHook({ paths: ['/concerts'] })],
  },
}

import type { CollectionConfig } from 'payload'

import { publishedCollectionDefaults, sortOrderField } from '../shared'
import {
  createRevalidateDeleteHook,
  createRevalidateHook,
} from '@/hooks/revalidateSite'

export const Actualites: CollectionConfig<'actualites'> = {
  slug: 'actualites',
  labels: {
    singular: 'Actualité',
    plural: 'Actualités',
  },
  ...publishedCollectionDefaults,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'sortOrder'],
    description: "Cartes affichées sur la page d'accueil.",
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
      name: 'date',
      type: 'text',
      label: 'Date',
      admin: {
        description: 'Ex. : 19 mai 2019 · Temple de Geudertheim',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Concert',
      label: 'Catégorie',
      options: [
        { label: 'Concert', value: 'Concert' },
        { label: 'Concours', value: 'Concours' },
        { label: 'Mariage', value: 'Mariage' },
        { label: 'Autre', value: 'Autre' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Lien',
      admin: {
        description: 'Optionnel — page interne ou URL externe.',
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
    afterChange: [createRevalidateHook({ paths: ['/'] })],
    afterDelete: [createRevalidateDeleteHook({ paths: ['/'] })],
  },
}

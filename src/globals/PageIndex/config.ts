import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'
import { heroFields } from '../fields/heroFields'

export const ActivitesPage: GlobalConfig = {
  slug: 'activites-page',
  label: 'Page activités (liste)',
  access: {
    read: () => true,
  },
  fields: heroFields('hero'),
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/activites'] })],
  },
}

export const MariagePage: GlobalConfig = {
  slug: 'mariage-page',
  label: 'Page mariage (liste)',
  access: {
    read: () => true,
  },
  fields: [
    ...heroFields('hero'),
    {
      name: 'cta',
      type: 'group',
      label: 'Bandeau contact',
      fields: [
        { name: 'text', type: 'textarea', label: 'Texte' },
        { name: 'buttonLabel', type: 'text', label: 'Bouton', defaultValue: 'Nous contacter' },
      ],
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/mariage'] })],
  },
}

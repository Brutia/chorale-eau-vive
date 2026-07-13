import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'
import { heroFields } from '../fields/heroFields'

export const ConcertsPage: GlobalConfig = {
  slug: 'concerts-page',
  label: 'Page concerts & presse',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bannière',
          fields: heroFields('hero'),
        },
        {
          label: 'Gazette',
          fields: [
            {
              name: 'sectionTitle',
              type: 'text',
              label: 'Titre section',
              defaultValue: 'La Gazette Musicale de France',
            },
            {
              name: 'sectionSubtitle',
              type: 'text',
              label: 'Sous-titre section',
              defaultValue: 'Archives & actualités',
            },
            {
              name: 'gazette',
              type: 'group',
              label: 'Bandeau La Gazette',
              fields: [
                { name: 'title', type: 'text', label: 'Titre ligne 1', defaultValue: 'La Gazette' },
                {
                  name: 'titleItalic',
                  type: 'text',
                  label: 'Titre ligne 2',
                  defaultValue: 'Musicale de France',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Sous-titre',
                  defaultValue: 'Le journal de nos concerts',
                },
                {
                  name: 'instruction',
                  type: 'text',
                  label: 'Instruction',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/concerts'] })],
  },
}

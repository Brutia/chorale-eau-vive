import type { Field } from 'payload'

export const heroFields = (prefix = 'hero'): Field[] => [
  {
    name: prefix,
    type: 'group',
    label: 'Bannière',
    fields: [
      {
        name: 'eyebrow',
        type: 'text',
        label: 'Surtitre',
      },
      {
        name: 'title',
        type: 'text',
        label: 'Titre',
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Sous-titre',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Image de fond',
      },
    ],
  },
]

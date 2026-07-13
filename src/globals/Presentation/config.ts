import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'
import { heroFields } from '../fields/heroFields'

export const Presentation: GlobalConfig = {
  slug: 'presentation',
  label: 'Page présentation',
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
          label: 'Histoire',
          fields: [
            {
              name: 'history',
              type: 'group',
              label: 'Section histoire',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Surtitre' },
                { name: 'title', type: 'text', label: 'Titre' },
                {
                  name: 'paragraphs',
                  type: 'array',
                  label: 'Paragraphes',
                  fields: [{ name: 'text', type: 'textarea', label: 'Texte' }],
                },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
                { name: 'caption', type: 'text', label: 'Légende' },
              ],
            },
          ],
        },
        {
          label: 'Équipe',
          fields: [
            {
              name: 'teamSection',
              type: 'group',
              label: 'En-tête équipe',
              fields: [
                { name: 'title', type: 'text', label: 'Titre' },
                { name: 'subtitle', type: 'text', label: 'Sous-titre' },
              ],
            },
            {
              name: 'teamMembers',
              type: 'array',
              label: "Membres de l'équipe",
              fields: [
                { name: 'roleLabel', type: 'text', label: 'Rôle' },
                { name: 'name', type: 'text', label: 'Nom', required: true },
                { name: 'bio', type: 'richText', label: 'Biographie' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Photo' },
                {
                  name: 'imagePosition',
                  type: 'select',
                  label: 'Position de la photo',
                  options: [
                    { label: 'Gauche', value: 'left' },
                    { label: 'Droite', value: 'right' },
                  ],
                  defaultValue: 'left',
                },
              ],
            },
          ],
        },
        {
          label: 'Galerie',
          fields: [
            {
              name: 'gallerySection',
              type: 'group',
              label: 'En-tête galerie',
              fields: [
                { name: 'title', type: 'text', label: 'Titre' },
                { name: 'subtitle', type: 'text', label: 'Sous-titre' },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Photos',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Image', required: true },
                { name: 'alt', type: 'text', label: 'Texte alternatif' },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/presentation'] })],
  },
}

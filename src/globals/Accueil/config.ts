import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'
import { heroFields } from '../fields/heroFields'

export const Accueil: GlobalConfig = {
  slug: 'accueil',
  label: "Page d'accueil",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bannière',
          fields: [
            ...heroFields('hero'),
            {
              name: 'heroTitleEmphasis',
              type: 'text',
              label: 'Titre mis en valeur',
              defaultValue: "L'Eau Vive",
            },
            {
              name: 'heroCtaLabel',
              type: 'text',
              label: 'Texte du bouton',
              defaultValue: 'Nous découvrir',
            },
            {
              name: 'heroCtaHref',
              type: 'text',
              label: 'Lien du bouton',
              defaultValue: '#actualites',
            },
          ],
        },
        {
          label: 'Bienvenue',
          fields: [
            {
              name: 'welcome',
              type: 'group',
              label: 'Section bienvenue',
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
                { name: 'linkLabel', type: 'text', label: 'Texte du lien' },
                { name: 'linkHref', type: 'text', label: 'Lien' },
              ],
            },
          ],
        },
        {
          label: 'Actualités',
          fields: [
            {
              name: 'newsSection',
              type: 'group',
              label: 'En-tête section actualités',
              fields: [
                { name: 'title', type: 'text', label: 'Titre', defaultValue: 'Actualités & Événements' },
                { name: 'subtitle', type: 'text', label: 'Sous-titre', defaultValue: 'La vie du chœur' },
              ],
            },
          ],
        },
        {
          label: 'Mariage & découverte',
          fields: [
            {
              name: 'weddingCta',
              type: 'group',
              label: 'Bandeau mariage',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Surtitre' },
                { name: 'title', type: 'text', label: 'Titre' },
                { name: 'text', type: 'textarea', label: 'Texte' },
                { name: 'buttonLabel', type: 'text', label: 'Bouton' },
              ],
            },
            {
              name: 'miniCards',
              type: 'array',
              label: 'Cartes de découverte',
              fields: [
                { name: 'title', type: 'text', label: 'Titre', required: true },
                { name: 'text', type: 'textarea', label: 'Texte' },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icône',
                  options: [
                    { label: 'Utilisateurs', value: 'users' },
                    { label: 'Musique', value: 'music' },
                    { label: 'Étoiles', value: 'sparkles' },
                    { label: 'Cœur', value: 'heart' },
                  ],
                  defaultValue: 'users',
                },
                { name: 'link', type: 'text', label: 'Lien' },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/'] })],
  },
}

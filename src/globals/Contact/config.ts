import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'
import { heroFields } from '../fields/heroFields'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Page contact',
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
          label: 'Coordonnées',
          fields: [
            {
              name: 'findUs',
              type: 'text',
              label: 'Nous trouver',
            },
            {
              name: 'emailLabel',
              type: 'text',
              label: 'Libellé email',
              defaultValue: 'Nous écrire',
            },
            {
              name: 'facebookLabel',
              type: 'text',
              label: 'Libellé Facebook',
              defaultValue: 'Rester au courant',
            },
            {
              name: 'facebookText',
              type: 'text',
              label: 'Texte Facebook',
              defaultValue: 'Suivez-nous sur Facebook',
            },
            {
              name: 'sectionTitle',
              type: 'text',
              label: 'Titre section',
            },
            {
              name: 'sectionSubtitle',
              type: 'text',
              label: 'Sous-titre section',
            },
            {
              name: 'introTitle',
              type: 'text',
              label: 'Titre intro formulaire',
            },
          ],
        },
        {
          label: 'Mariage & carte',
          fields: [
            {
              name: 'weddingPromo',
              type: 'group',
              label: 'Encart mariage',
              fields: [
                { name: 'title', type: 'text', label: 'Titre' },
                { name: 'text', type: 'textarea', label: 'Texte' },
                { name: 'linkLabel', type: 'text', label: 'Lien' },
              ],
            },
            {
              name: 'mapLabel',
              type: 'text',
              label: 'Libellé carte',
            },
            {
              name: 'mapTitle',
              type: 'text',
              label: 'Titre carte',
            },
          ],
        },
        {
          label: 'Formulaire',
          fields: [
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Formulaire de contact',
              admin: {
                description: 'Créez un formulaire dans « Formulaires » puis sélectionnez-le ici.',
              },
            },
            {
              name: 'successTitle',
              type: 'text',
              label: 'Titre message de succès',
              defaultValue: 'Merci pour votre message',
            },
            {
              name: 'successMessage',
              type: 'textarea',
              label: 'Message de succès',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createGlobalRevalidateHook({ paths: ['/contact'] })],
  },
}

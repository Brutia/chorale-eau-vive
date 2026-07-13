import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '@/hooks/revalidateSite'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Paramètres du site',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          fields: [
            {
              name: 'brandName',
              type: 'text',
              label: 'Nom de la marque',
              defaultValue: "Groupe Vocal L'Eau Vive",
            },
            {
              name: 'brandShortName',
              type: 'text',
              label: 'Nom court (footer)',
              defaultValue: "L'Eau Vive",
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'address',
              type: 'text',
              label: 'Adresse',
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Lien Facebook',
            },
          ],
        },
        {
          label: 'Pied de page',
          fields: [
            {
              name: 'footerWeddingTitle',
              type: 'text',
              label: 'Titre encart mariage',
              defaultValue: 'Mariage',
            },
            {
              name: 'footerWeddingText',
              type: 'textarea',
              label: 'Texte encart mariage',
            },
            {
              name: 'footerWeddingButton',
              type: 'text',
              label: 'Bouton encart mariage',
              defaultValue: 'Découvrir le mariage',
            },
            {
              name: 'legalMentionsUrl',
              type: 'text',
              label: 'Lien mentions légales',
            },
            {
              name: 'privacyUrl',
              type: 'text',
              label: 'Lien politique de confidentialité',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      createGlobalRevalidateHook({
        paths: ['/', '/presentation', '/activites', '/mariage', '/concerts', '/contact'],
      }),
    ],
  },
}

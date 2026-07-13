import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'],
    }),
    OrderedListFeature(),
    UnorderedListFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['activites', 'mariages', 'concerts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'alt',
              type: 'text',
              label: 'Texte alternatif',
            },
          ],
        },
      },
    }),
    FixedToolbarFeature(),
  ],
})

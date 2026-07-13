import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

const collectionBasePaths: Record<string, string> = {
  activites: '/activites',
  mariages: '/mariage',
  concerts: '/concerts',
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  const base = collectionBasePaths[relationTo] ?? ''
  return base ? `${base}/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    if (node.relationTo !== 'media') return null

    const uploadDoc = node.value
    if (!uploadDoc || typeof uploadDoc !== 'object') return null

    const media = uploadDoc as Media
    const url = getMediaUrl(media.url, media.updatedAt)
    if (!url) return null

    return (
      <figure className="my-8">
        <img
          src={url}
          alt={media.alt || ''}
          width={media.width ?? undefined}
          height={media.height ?? undefined}
          className="w-full rounded-lg"
        />
      </figure>
    )
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}

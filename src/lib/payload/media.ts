import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaSize = 'thumbnail' | 'square' | 'small' | 'medium' | 'large' | 'xlarge' | 'og'

export function resolveMediaUrl(
  media: number | Media | null | undefined,
  size?: MediaSize,
): string {
  if (!media || typeof media === 'number') return ''

  const sized = size ? media.sizes?.[size] : null
  const url = sized?.url || media.url

  return getMediaUrl(url, media.updatedAt)
}

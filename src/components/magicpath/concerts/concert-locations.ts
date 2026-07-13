export type ConcertLocation = {
  slug: string
  label: string
}

export const concertLocations: ConcertLocation[] = [
  { slug: 'truchtersheim', label: 'Concert à Truchtersheim' },
  { slug: 'montanay', label: 'Concert à Montanay' },
  { slug: 'lipsheim', label: 'Concert à Lipsheim' },
]

export function getConcertLocationBySlug(slug: string): ConcertLocation | undefined {
  return concertLocations.find((location) => location.slug === slug)
}

export function getConcertLocationHref(slug: string): string {
  return `/concerts/${slug}`
}

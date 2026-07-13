export type WeddingPrestation = {
  slug: string
  label: string
  date?: string
  location?: string
}

export const weddingPrestations: WeddingPrestation[] = [
  {
    slug: 'sophie-thomas-geudertheim-2024',
    label: 'Sophie & Thomas — Geudertheim',
    date: 'Juin 2024',
    location: 'Église Saint-Pierre, Geudertheim',
  },
  {
    slug: 'claire-marc-strasbourg-2023',
    label: 'Claire & Marc — Strasbourg',
    date: 'Septembre 2023',
    location: 'Église Saint-Paul, Strasbourg',
  },
  {
    slug: 'anne-pierre-hoerdt-2023',
    label: 'Anne & Pierre — Hoerdt',
    date: 'Mai 2023',
    location: 'Église Saint-Médard, Hoerdt',
  },
  {
    slug: 'julie-david-saverne-2022',
    label: 'Julie & David — Saverne',
    date: 'Août 2022',
    location: 'Basilique Notre-Dame, Saverne',
  },
]

export function getWeddingBySlug(slug: string): WeddingPrestation | undefined {
  return weddingPrestations.find((wedding) => wedding.slug === slug)
}

export function getWeddingHref(slug: string): string {
  return `/mariage/${slug}`
}

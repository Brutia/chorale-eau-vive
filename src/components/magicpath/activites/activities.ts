export type Activity = {
  slug: string
  label: string
}

export const activities: Activity[] = [
  { slug: 'projet-2020-cracovie', label: 'PROJET 2022 : CRACOVIE' },
  { slug: 'la-venue-de-cantabile-en-alsace', label: 'La venue de Cantabile en Alsace' },
  { slug: 'l-eau-vive-au-festival-de-verone', label: "2018 L'Eau Vive au festival de Vérone" },
  { slug: 'rencontre-eau-vive-montadour', label: '2018 Rencontre avec la Montadour' },
  { slug: 'participation-festival-de-prague', label: '2016 Participation festival de Prague' },
  { slug: 'voyagemontanay', label: '2015 Notre voyage à Montanay' },
  { slug: 'ardechoisstrasbourg', label: '2014 les ardéchois à Strasbourg' },
  { slug: 'rencontrechantevieze', label: 'Rencontre avec Chantevieze' },
  { slug: 'eauviveprivas', label: '2013 notre voyage à Privas' },
]

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug)
}

export function getActivityHref(slug: string): string {
  return `/activites/${slug}`
}

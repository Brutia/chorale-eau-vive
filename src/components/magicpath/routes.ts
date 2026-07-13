export const siteRoutes = {
  accueil: '/',
  presentation: '/presentation',
  activites: '/activites',
  concerts: '/concerts',
  mariage: '/mariage',
  contact: '/contact',
} as const

export const navRouteByName: Record<string, string> = {
  Home: siteRoutes.accueil,
  Accueil: siteRoutes.accueil,
  Présentation: siteRoutes.presentation,
  Activités: siteRoutes.activites,
  Concerts: siteRoutes.concerts,
  'Concerts & Presse': siteRoutes.concerts,
  Mariage: siteRoutes.mariage,
  Contacts: siteRoutes.contact,
  Contact: siteRoutes.contact,
  'Press Book': siteRoutes.concerts,
}

export function getNavHref(name: string, fallback?: string): string {
  return navRouteByName[name] ?? fallback ?? siteRoutes.accueil
}

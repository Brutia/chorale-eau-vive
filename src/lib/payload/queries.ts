import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  Accueil,
  Activite,
  ActivitesPage,
  Actualite,
  Concert,
  ConcertsPage,
  Contact,
  Evenement,
  Mariage,
  MariagePage,
  Presentation,
  Site,
} from '@/payload-types'

async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

type CollectionQueryOptions = {
  draft?: boolean
}

async function resolveDraft(explicitDraft?: boolean): Promise<boolean> {
  if (explicitDraft !== undefined) {
    return explicitDraft
  }

  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    // draftMode() is unavailable outside a request (e.g. generateStaticParams at build time)
    return false
  }
}

export const getSiteSettings = cache(async (): Promise<Site> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site', depth: 0 })
})

export const getAccueilPage = cache(async (): Promise<Accueil> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'accueil', depth: 2 })
})

export const getPresentationPage = cache(async (): Promise<Presentation> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'presentation', depth: 2 })
})

export const getContactPage = cache(async (): Promise<Contact> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'contact', depth: 2 })
})

export const getConcertsPageSettings = cache(async (): Promise<ConcertsPage> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'concerts-page', depth: 2 })
})

export const getActivitesPageSettings = cache(async (): Promise<ActivitesPage> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'activites-page', depth: 2 })
})

export const getMariagePageSettings = cache(async (): Promise<MariagePage> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'mariage-page', depth: 2 })
})

export const getActivites = cache(async (options?: CollectionQueryOptions): Promise<Activite[]> => {
  const payload = await getPayloadClient()
  const draft = await resolveDraft(options?.draft)

  const result = await payload.find({
    collection: 'activites',
    draft,
    limit: 100,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    depth: 1,
  })

  return result.docs
})

export const getActiviteBySlug = cache(
  async (slug: string, options?: CollectionQueryOptions): Promise<Activite | null> => {
    const payload = await getPayloadClient()
    const draft = await resolveDraft(options?.draft)

    const result = await payload.find({
      collection: 'activites',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 2,
      where: {
        slug: { equals: slug },
      },
    })

    return result.docs[0] ?? null
  },
)

export const getMariages = cache(async (options?: CollectionQueryOptions): Promise<Mariage[]> => {
  const payload = await getPayloadClient()
  const draft = await resolveDraft(options?.draft)

  const result = await payload.find({
    collection: 'mariages',
    draft,
    limit: 100,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    depth: 1,
  })

  return result.docs
})

export const getMariageBySlug = cache(
  async (slug: string, options?: CollectionQueryOptions): Promise<Mariage | null> => {
    const payload = await getPayloadClient()
    const draft = await resolveDraft(options?.draft)

    const result = await payload.find({
      collection: 'mariages',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 2,
      where: {
        slug: { equals: slug },
      },
    })

    return result.docs[0] ?? null
  },
)

export const getConcerts = cache(async (options?: CollectionQueryOptions): Promise<Concert[]> => {
  const payload = await getPayloadClient()
  const draft = await resolveDraft(options?.draft)

  const result = await payload.find({
    collection: 'concerts',
    draft,
    limit: 100,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    depth: 1,
  })

  return result.docs
})

export const getConcertBySlug = cache(
  async (slug: string, options?: CollectionQueryOptions): Promise<Concert | null> => {
    const payload = await getPayloadClient()
    const draft = await resolveDraft(options?.draft)

    const result = await payload.find({
      collection: 'concerts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 2,
      where: {
        slug: { equals: slug },
      },
    })

    return result.docs[0] ?? null
  },
)

export const getEvenements = cache(async (options?: CollectionQueryOptions): Promise<Evenement[]> => {
  const payload = await getPayloadClient()
  const draft = await resolveDraft(options?.draft)

  const result = await payload.find({
    collection: 'evenements',
    draft,
    limit: 100,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    depth: 2,
  })

  return result.docs
})

export const getActualites = cache(async (options?: CollectionQueryOptions): Promise<Actualite[]> => {
  const payload = await getPayloadClient()
  const draft = await resolveDraft(options?.draft)

  const result = await payload.find({
    collection: 'actualites',
    draft,
    limit: 100,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    depth: 2,
  })

  return result.docs
})

export type SiteNavData = {
  site: Site
  activites: Pick<Activite, 'slug' | 'title'>[]
  concerts: Pick<Concert, 'slug' | 'title'>[]
  mariages: Pick<Mariage, 'slug' | 'title'>[]
}

export const getSiteNavData = cache(async (): Promise<SiteNavData> => {
  const [site, activites, concerts, mariages] = await Promise.all([
    getSiteSettings(),
    getActivites(),
    getConcerts(),
    getMariages(),
  ])

  return {
    site,
    activites: activites.map((a) => ({ slug: a.slug, title: a.title })),
    concerts: concerts.map((c) => ({ slug: c.slug, title: c.title })),
    mariages: mariages.map((m) => ({ slug: m.slug, title: m.title })),
  }
})

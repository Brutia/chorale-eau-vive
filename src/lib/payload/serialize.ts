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

import { resolveMediaUrl } from './media'

export type SerializedHero = {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  imageUrl?: string
}

export function serializeHero(hero?: Accueil['hero'] | null): SerializedHero {
  return {
    eyebrow: hero?.eyebrow,
    title: hero?.title,
    subtitle: hero?.subtitle,
    imageUrl: resolveMediaUrl(hero?.image),
  }
}

export function serializeAccueil(
  page: Accueil,
  actualites: Actualite[],
) {
  return {
    hero: {
      ...serializeHero(page.hero),
      titleEmphasis: page.heroTitleEmphasis,
      ctaLabel: page.heroCtaLabel,
      ctaHref: page.heroCtaHref,
    },
    welcome: {
      eyebrow: page.welcome?.eyebrow,
      title: page.welcome?.title,
      paragraphs: page.welcome?.paragraphs?.map((p) => p.text).filter(Boolean) as string[],
      imageUrl: resolveMediaUrl(page.welcome?.image),
      caption: page.welcome?.caption,
      linkLabel: page.welcome?.linkLabel,
      linkHref: page.welcome?.linkHref,
    },
    newsSection: {
      title: page.newsSection?.title,
      subtitle: page.newsSection?.subtitle,
    },
    actualites: actualites.map((item) => ({
      title: item.title,
      date: item.date,
      description: item.description,
      category: item.category,
      imageUrl: resolveMediaUrl(item.image),
      link: item.link,
    })),
    weddingCta: {
      eyebrow: page.weddingCta?.eyebrow,
      title: page.weddingCta?.title,
      text: page.weddingCta?.text,
      buttonLabel: page.weddingCta?.buttonLabel,
    },
    miniCards:
      page.miniCards?.map((card) => ({
        title: card.title,
        text: card.text,
        icon: card.icon,
        link: card.link,
      })) ?? [],
  }
}

export function serializePresentation(page: Presentation) {
  return {
    hero: serializeHero(page.hero),
    history: {
      eyebrow: page.history?.eyebrow,
      title: page.history?.title,
      paragraphs: page.history?.paragraphs?.map((p) => p.text).filter(Boolean) as string[],
      imageUrl: resolveMediaUrl(page.history?.image),
      caption: page.history?.caption,
    },
    teamSection: {
      title: page.teamSection?.title,
      subtitle: page.teamSection?.subtitle,
    },
    teamMembers:
      page.teamMembers?.map((member) => ({
        roleLabel: member.roleLabel,
        name: member.name,
        bio: member.bio,
        imageUrl: resolveMediaUrl(member.image),
        imagePosition: member.imagePosition,
      })) ?? [],
    gallerySection: {
      title: page.gallerySection?.title,
      subtitle: page.gallerySection?.subtitle,
    },
    gallery:
      page.gallery?.map((item) => ({
        imageUrl: resolveMediaUrl(item.image),
        alt: item.alt,
      })) ?? [],
  }
}

export function serializeContact(page: Contact, site: Site) {
  return {
    hero: serializeHero(page.hero),
    findUs: page.findUs,
    email: site.email,
    emailLabel: page.emailLabel,
    facebookLabel: page.facebookLabel,
    facebookText: page.facebookText,
    facebookUrl: site.facebookUrl,
    sectionTitle: page.sectionTitle,
    sectionSubtitle: page.sectionSubtitle,
    introTitle: page.introTitle,
    weddingPromo: {
      title: page.weddingPromo?.title,
      text: page.weddingPromo?.text,
      linkLabel: page.weddingPromo?.linkLabel,
    },
    mapLabel: page.mapLabel,
    mapTitle: page.mapTitle,
    form: typeof page.form === 'object' ? page.form : null,
    successTitle: page.successTitle,
    successMessage: page.successMessage,
  }
}

export function serializeConcertsPage(page: ConcertsPage, evenements: Evenement[]) {
  return {
    hero: serializeHero(page.hero),
    sectionTitle: page.sectionTitle,
    sectionSubtitle: page.sectionSubtitle,
    gazette: page.gazette,
    presse: evenements
      .filter((e) => e.type === 'presse')
      .map((e) => ({
        title: e.title,
        date: e.date,
        description: e.description,
        imageUrl: resolveMediaUrl(e.image),
        url: e.url,
      })),
    concerts: evenements
      .filter((e) => e.type === 'concert')
      .map((e) => ({
        title: e.title,
        date: e.date,
        description: e.description,
        imageUrl: resolveMediaUrl(e.image),
        url: e.url,
      })),
  }
}

export function serializeActivitesPage(page: ActivitesPage) {
  return { hero: serializeHero(page.hero) }
}

export function serializeMariagePage(page: MariagePage) {
  return {
    hero: serializeHero(page.hero),
    cta: page.cta,
  }
}

export function serializeActivite(activity: Activite) {
  return {
    slug: activity.slug,
    title: activity.title,
    heroImageUrl: resolveMediaUrl(activity.heroImage),
    content: activity.content,
  }
}

export function serializeMariage(mariage: Mariage) {
  return {
    slug: mariage.slug,
    title: mariage.title,
    date: mariage.date,
    location: mariage.location,
    heroImageUrl: resolveMediaUrl(mariage.heroImage),
    content: mariage.content,
  }
}

export function serializeConcert(concert: Concert) {
  return {
    slug: concert.slug,
    title: concert.title,
    heroImageUrl: resolveMediaUrl(concert.heroImage),
    content: concert.content,
  }
}

export function serializeNavItem(item: { slug: string; title: string }) {
  return { slug: item.slug, label: item.title }
}

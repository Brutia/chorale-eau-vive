import React from 'react'
import Link from 'next/link'
import { Facebook, Heart, Mail, MapPin } from 'lucide-react'
import { siteRoutes } from '@/components/magicpath/routes'
import { useSiteData } from '@/providers/SiteData'

export const Footer: React.FC = () => {
  const { site } = useSiteData()
  const currentYear = new Date().getFullYear()

  const brandShort = site.brandShortName || "L'Eau Vive"
  const email = site.email || 'eauvive@evc.net'
  const address = site.address || '67720 Hoerdt & Strasbourg, France'
  const facebookUrl = site.facebookUrl || '#'
  const description =
    site.description ||
    'Groupe Vocal basé à Strasbourg et Hoerdt. Passionnés par le chant choral et le partage musical depuis de nombreuses années.'

  return (
    <footer className="bg-blue-900 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1">
                <div className="rounded-full bg-blue-800 p-1.5" />
              </div>
              <span className="text-2xl font-bold tracking-tight">{brandShort}</span>
            </div>
            <p className="text-sm leading-relaxed text-blue-100 opacity-80">{description}</p>
            <div className="flex space-x-4 pt-2">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  className="rounded-lg bg-blue-800 p-2 transition-colors hover:text-yellow-500"
                  target={facebookUrl.startsWith('http') ? '_blank' : undefined}
                  rel={facebookUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${email}`}
                className="rounded-lg bg-blue-800 p-2 transition-colors hover:text-yellow-500"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-500">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm opacity-80">
                <MapPin className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                <span>{address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm opacity-80">
                <Mail className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-500">Navigation</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href={siteRoutes.accueil} className="transition-colors hover:text-yellow-500">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href={siteRoutes.presentation} className="transition-colors hover:text-yellow-500">
                  L&apos;ensemble vocal
                </Link>
              </li>
              <li>
                <Link href={siteRoutes.concerts} className="transition-colors hover:text-yellow-500">
                  Concerts &amp; Gazette
                </Link>
              </li>
              <li>
                <Link href={siteRoutes.contact} className="transition-colors hover:text-yellow-500">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-blue-700/50 bg-blue-800 p-6 shadow-inner">
            <div className="relative z-10">
              <h4 className="mb-2 flex items-center text-lg font-bold text-white">
                <Heart className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
                {site.footerWeddingTitle || 'Mariage'}
              </h4>
              <p className="mb-4 text-xs leading-relaxed text-blue-100">
                {site.footerWeddingText ||
                  "Vous voulez accompagner votre mariage d'une chorale ? Contactez-nous."}
              </p>
              <Link
                href={siteRoutes.mariage}
                className="inline-block w-full transform rounded-xl bg-yellow-500 px-4 py-2 text-center text-sm font-bold text-blue-950 shadow-md transition-all hover:scale-105 hover:bg-yellow-600"
              >
                {site.footerWeddingButton || 'Découvrir le mariage'}
              </Link>
            </div>
            <Heart className="absolute -bottom-4 -right-4 h-24 w-24 rotate-12 text-white/5 transition-transform group-hover:scale-110" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between space-y-4 border-t border-blue-800 pt-8 md:flex-row md:space-y-0">
          <p className="text-xs text-blue-200 opacity-60">
            © {currentYear} {site.brandName || "Groupe Vocal L'Eau Vive"}. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-xs text-blue-200 opacity-60">
            {site.legalMentionsUrl && (
              <a href={site.legalMentionsUrl} className="transition-colors hover:text-yellow-500">
                Mentions Légales
              </a>
            )}
            {site.privacyUrl && (
              <a href={site.privacyUrl} className="transition-colors hover:text-yellow-500">
                Politique de Confidentialité
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

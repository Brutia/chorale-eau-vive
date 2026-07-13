import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, Music } from 'lucide-react'
import { getNavHref, siteRoutes } from '@/components/magicpath/routes'
import { useSiteData } from '@/providers/SiteData'

interface NavLink {
  name: string
  label: string
}

interface SubmenuItem {
  slug: string
  label: string
}

interface NavSubmenu {
  name: string
  indexHref: string
  menuLabel: string
  items: SubmenuItem[]
  getItemHref: (slug: string) => string
}

interface NavbarProps {
  activeTab?: string
  activeActivitySlug?: string
  activeConcertSlug?: string
  activeWeddingSlug?: string
}

const navLinks: NavLink[] = [
  { name: 'Home', label: 'Accueil' },
  { name: 'Présentation', label: 'Présentation' },
  { name: 'Activités', label: 'Activités' },
  { name: 'Concerts', label: 'Concerts' },
  { name: 'Mariage', label: 'Mariage' },
  { name: 'Contacts', label: 'Contacts' },
  { name: 'Press Book', label: 'Press Book' },
]

const linkClass = (isActive: boolean) =>
  `rounded-full px-3 py-2 text-xs font-medium transition ${
    isActive
      ? 'bg-[#1e40af] text-white shadow-sm'
      : 'text-slate-600 hover:bg-blue-50 hover:text-[#1e40af]'
  }`

const mobileLinkClass = (isActive: boolean) =>
  `text-sm font-medium ${
    isActive
      ? 'bg-[#1e40af] text-white'
      : 'text-slate-600 hover:bg-blue-50 hover:text-[#1e40af]'
  }`

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Home',
  activeActivitySlug,
  activeConcertSlug,
  activeWeddingSlug,
}) => {
  const { site, activites, concerts, mariages } = useSiteData()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  const navSubmenus: Record<string, NavSubmenu> = {
    Activités: {
      name: 'Activités',
      indexHref: siteRoutes.activites,
      menuLabel: 'Sous-menu Activités',
      items: activites.map((a) => ({ slug: a.slug, label: a.title })),
      getItemHref: (slug) => `/activites/${slug}`,
    },
    Concerts: {
      name: 'Concerts',
      indexHref: siteRoutes.concerts,
      menuLabel: 'Sous-menu Concerts',
      items: concerts.map((c) => ({ slug: c.slug, label: c.title })),
      getItemHref: (slug) => `/concerts/${slug}`,
    },
    Mariage: {
      name: 'Mariage',
      indexHref: siteRoutes.mariage,
      menuLabel: 'Sous-menu Mariage',
      items: mariages.map((m) => ({ slug: m.slug, label: m.title })),
      getItemHref: (slug) => `/mariage/${slug}`,
    },
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getActiveSubmenuSlug = (name: string) => {
    if (name === 'Activités') return activeActivitySlug
    if (name === 'Concerts') return activeConcertSlug
    if (name === 'Mariage') return activeWeddingSlug
    return undefined
  }

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((current) => ({ ...current, [name]: !current[name] }))
  }

  const renderDesktopLink = (link: NavLink) => {
    const submenu = navSubmenus[link.name]

    if (!submenu) {
      return (
        <Link key={link.name} href={getNavHref(link.name)} className={linkClass(activeTab === link.name)}>
          {link.label}
        </Link>
      )
    }

    const isActive = activeTab === link.name
    const activeSlug = getActiveSubmenuSlug(link.name)

    return (
      <div key={link.name} className="group relative">
        <Link
          href={submenu.indexHref}
          className={`inline-flex items-center gap-1 ${linkClass(isActive)}`}
          aria-haspopup="menu"
        >
          {link.label}
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {submenu.items.length > 0 && (
          <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <ul
              className="min-w-[273px] rounded-xl border border-slate-100 bg-white py-2 shadow-lg"
              role="menu"
              aria-label={submenu.menuLabel}
            >
              {submenu.items.map((item) => (
                <li key={item.slug} role="none">
                  <Link
                    href={submenu.getItemHref(item.slug)}
                    role="menuitem"
                    className={`block px-4 py-2.5 text-xs leading-5 transition hover:bg-blue-50 hover:text-[#1e40af] ${
                      activeSlug === item.slug
                        ? 'bg-blue-50 font-semibold text-[#1e40af]'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  const renderMobileLink = (link: NavLink) => {
    const submenu = navSubmenus[link.name]

    if (!submenu) {
      return (
        <Link
          key={link.name}
          href={getNavHref(link.name)}
          onClick={() => setIsOpen(false)}
          className={`rounded-lg px-4 py-3 ${mobileLinkClass(activeTab === link.name)}`}
        >
          {link.label}
        </Link>
      )
    }

    const isActive = activeTab === link.name
    const activeSlug = getActiveSubmenuSlug(link.name)
    const isSubmenuOpen = Boolean(openSubmenus[link.name])

    return (
      <div key={link.name} className="overflow-hidden rounded-lg border border-slate-100">
        <div className="flex items-stretch">
          <Link
            href={submenu.indexHref}
            onClick={() => setIsOpen(false)}
            className={`flex flex-1 items-center rounded-lg px-4 py-3 ${mobileLinkClass(isActive)}`}
          >
            {link.label}
          </Link>
          {submenu.items.length > 0 && (
            <button
              type="button"
              onClick={() => toggleSubmenu(link.name)}
              className="border-l border-slate-100 px-3 text-[#1e40af] hover:bg-blue-50"
              aria-label={
                isSubmenuOpen
                  ? `Replier le sous-menu ${link.label}`
                  : `Déplier le sous-menu ${link.label}`
              }
              aria-expanded={isSubmenuOpen}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        {isSubmenuOpen && submenu.items.length > 0 && (
          <ul className="border-t border-slate-100 px-2 py-2">
            {submenu.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={submenu.getItemHref(item.slug)}
                  onClick={() => {
                    setIsOpen(false)
                    setOpenSubmenus({})
                  }}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    activeSlug === item.slug
                      ? 'bg-[#1e40af] text-white'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-[#1e40af]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  const brandName = site.brandName || "Groupe Vocal L'Eau Vive"

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-slate-200 bg-white/95 py-3 shadow-sm backdrop-blur'
          : 'border-white/20 bg-white/90 py-4 backdrop-blur-md'
      }`}
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href={siteRoutes.accueil}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${brandName}, accueil`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e40af] text-white">
            <Music className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-bold leading-tight text-[#1e40af] sm:text-xl">
            {brandName.includes('L') ? (
              <>
                Groupe Vocal
                <br className="sm:hidden" /> L&apos;Eau Vive
              </>
            ) : (
              brandName
            )}
          </span>
        </Link>
        <div className="hidden items-center gap-1 xl:flex">{navLinks.map(renderDesktopLink)}</div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#1e40af] hover:bg-blue-50 xl:hidden"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`xl:hidden ${isOpen ? 'block' : 'hidden'} border-t border-slate-100 bg-white px-5 pb-5 pt-3`}
      >
        <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">
          {navLinks.map(renderMobileLink)}
        </div>
      </div>
    </nav>
  )
}

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Music2, X } from 'lucide-react';
import { getNavHref, siteRoutes } from '@/components/magicpath/routes';
interface NavbarProps {
  activeTab?: string;
}
const navigationLinks = [
  { name: 'Accueil' },
  { name: 'Présentation' },
  { name: 'Activités' },
  { name: 'Concerts' },
  { name: 'Mariage' },
  { name: 'Contacts' },
  { name: 'Press Book' },
];
export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Accueil'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white/90 backdrop-blur-sm'}`}>
      <nav aria-label="Navigation principale" className="mx-auto max-w-[1500px] px-5 py-3 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href={siteRoutes.accueil} className="flex min-w-fit items-center gap-3 text-blue-950" aria-label="Groupe Vocal L'Eau Vive, accueil">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white"><Music2 className="h-5 w-5" aria-hidden="true" /></span>
            <span className="font-serif text-lg font-bold leading-tight md:text-xl">Groupe Vocal L'Eau Vive</span>
          </Link>
          <div className="hidden flex-wrap items-center justify-end gap-1 xl:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={getNavHref(link.name)}
                className={`rounded-full px-3 py-2 text-[11px] font-semibold transition-colors ${activeTab === link.name ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-800'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button type="button" className="rounded-lg p-2 text-blue-900 hover:bg-blue-50 xl:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={isOpen}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isOpen && <div className="mt-3 grid gap-1 border-t border-slate-200 pt-3 xl:hidden">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={getNavHref(link.name)}
              onClick={() => setIsOpen(false)}
              className={`rounded-lg px-3 py-3 text-sm font-semibold ${activeTab === link.name ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-blue-50'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>}
      </nav>
    </header>;
};
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Music } from 'lucide-react';
import { getNavHref, siteRoutes } from '@/components/magicpath/routes';
interface NavbarProps {
  activeTab?: string;
}
export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Home'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Home', label: 'Accueil' },
    { name: 'Présentation', label: 'Présentation' },
    { name: 'Concerts & Presse', label: 'Concerts & Presse' },
    { name: 'Contact', label: 'Contact' },
  ];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href={siteRoutes.accueil} className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-blue-800' : 'bg-white/20 backdrop-blur-md'}`}>
              <Music className={`${isScrolled ? 'text-white' : 'text-blue-800'} w-6 h-6`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl tracking-tight leading-tight ${isScrolled ? 'text-blue-900' : 'text-blue-900'}`}>
                L'Eau Vive
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold ${isScrolled ? 'text-blue-600' : 'text-blue-700'}`}>
                Groupe Vocal - Strasbourg
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getNavHref(link.name)}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-blue-700 ${activeTab === link.name ? 'text-blue-800' : 'text-gray-600'}`}
              >
                {link.label}
                {activeTab === link.name && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-2 px-6 rounded-full text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Mariages
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-blue-900 p-2 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={getNavHref(link.name)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${activeTab === link.name ? 'bg-blue-50 text-blue-800 border-l-4 border-yellow-500' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <button className="w-full bg-yellow-500 text-blue-950 font-bold py-3 rounded-lg text-center shadow-md">
              Chanter pour un Mariage
            </button>
          </div>
        </div>
      </div>
    </nav>;
};
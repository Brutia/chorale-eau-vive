import React from 'react';
import { Facebook, Heart, Mail, MapPin, Phone } from 'lucide-react';
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#1e2d5a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Group Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 rounded-full">
                <div className="bg-blue-800 p-1.5 rounded-full" />
              </div>
              <span className="font-bold text-2xl tracking-tight">L'Eau Vive</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed opacity-80">
              Groupe Vocal basé à Strasbourg et Hoerdt. Passionnés par le chant choral et le partage musical depuis de nombreuses années.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-yellow-500 transition-colors bg-blue-800 p-2 rounded-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:eauvive@evc.net" className="hover:text-yellow-500 transition-colors bg-blue-800 p-2 rounded-lg">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Quick Info */}
          <div className="space-y-4">
            <h4 className="text-yellow-500 font-bold text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm opacity-80">
                <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>67720 Hoerdt & Strasbourg, France</span>
              </li>
              <li className="flex items-center space-x-3 text-sm opacity-80">
                <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>eauvive@evc.net</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-yellow-500 font-bold text-lg">Navigation</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#home" className="hover:text-yellow-500 transition-colors">Accueil</a></li>
              <li><a href="#présentation" className="hover:text-yellow-500 transition-colors">L'ensemble vocal</a></li>
              <li><a href="#concerts-&-presse" className="hover:text-yellow-500 transition-colors">Concerts & Gazette</a></li>
              <li><a href="#contact" className="hover:text-yellow-500 transition-colors">Nous contacter</a></li>
            </ul>
          </div>

          {/* Wedding CTA Section */}
          <div className="bg-blue-800 rounded-2xl p-6 relative overflow-hidden group shadow-inner border border-blue-700/50">
            <div className="relative z-10">
              <h4 className="text-white font-bold text-lg mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                Mariage
              </h4>
              <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                Vous voulez accompagner votre mariage d&apos;une chorale&nbsp;? Contactez-nous.
              </p>
              <a href="/mariage" className="inline-block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-2 px-4 rounded-xl text-sm transition-all shadow-md transform hover:scale-105">
                Découvrir le mariage
              </a>
            </div>
            <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-blue-200 opacity-60">
            © {currentYear} Groupe Vocal L'Eau Vive. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-xs text-blue-200 opacity-60">
            <a href="#" className="hover:text-yellow-500 transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>;
};
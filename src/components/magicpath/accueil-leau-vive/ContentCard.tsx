import React from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
interface ContentCardProps {
  image?: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'news' | 'profile' | 'gallery';
}
export const ContentCard: React.FC<ContentCardProps> = ({
  image,
  title,
  description,
  date,
  category,
  href,
  onClick,
  variant = 'news'
}) => {
  const card = <div className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100 cursor-pointer ${variant === 'profile' ? 'text-center' : ''}`} onClick={onClick}>
      {/* Image Container */}
      <div className={`relative overflow-hidden ${variant === 'profile' ? 'aspect-square' : 'aspect-video'}`}>
        {image ? <img src={image} alt={title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${variant === 'profile' ? 'rounded-t-xl' : ''}`} /> : <div className="w-full h-full bg-blue-100 flex items-center justify-center">
            <div className="text-blue-300 font-medium italic">Image à venir</div>
          </div>}
        
        {/* Category Badge */}
        {category && <span className="absolute top-4 left-4 bg-yellow-500 text-blue-950 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
            {category}
          </span>}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {date && <div className="flex items-center text-gray-400 text-xs mb-3">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{date}</span>
          </div>}
        
        <h3 className={`font-serif font-bold text-xl mb-3 group-hover:text-blue-800 transition-colors ${variant === 'profile' ? 'text-blue-900' : 'text-slate-800'}`}>
          {title}
        </h3>
        
        <p className={`text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 ${variant === 'profile' ? 'line-clamp-none italic' : ''}`}>
          {description}
        </p>

        <div className={`mt-auto pt-4 ${variant === 'profile' ? 'hidden' : 'flex justify-start'}`}>
          <button className="flex items-center text-blue-800 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            En savoir plus
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>;

  if (href) {
    return <Link href={href} className="block h-full">{card}</Link>;
  }

  return card;
};
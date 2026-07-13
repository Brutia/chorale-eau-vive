import React from 'react';
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  withUnderline?: boolean;
  className?: string;
}
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  withUnderline = true,
  className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center'
  };
  const underlineAlignment = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2'
  };
  return <div className={`flex flex-col mb-12 ${alignmentClasses[align]} ${className}`}>
      {subtitle && <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 animate-fade-in">
          {subtitle}
        </span>}
      <div className="relative inline-block">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
          {title}
        </h2>
        {withUnderline && <div className={`absolute -bottom-4 w-16 md:w-24 h-1 bg-yellow-500 rounded-full ${underlineAlignment[align]}`} />}
      </div>
    </div>;
};
import React from 'react'
import { Navbar } from '@/components/magicpath/accueil-leau-vive/Navbar'
import { Footer } from '@/components/magicpath/accueil-leau-vive/Footer'

interface SiteShellProps {
  activeTab?: string
  activeActivitySlug?: string
  activeConcertSlug?: string
  activeWeddingSlug?: string
  children: React.ReactNode
}

export const SiteShell: React.FC<SiteShellProps> = ({
  activeTab = 'Home',
  activeActivitySlug,
  activeConcertSlug,
  activeWeddingSlug,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700">
      <Navbar
        activeTab={activeTab}
        activeActivitySlug={activeActivitySlug}
        activeConcertSlug={activeConcertSlug}
        activeWeddingSlug={activeWeddingSlug}
      />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

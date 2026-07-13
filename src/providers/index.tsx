import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { SiteDataProvider } from './SiteData'
import { ThemeProvider } from './Theme'
import type { SiteNavData } from '@/lib/payload/queries'

export const Providers: React.FC<{
  children: React.ReactNode
  siteData: SiteNavData
}> = ({ children, siteData }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <SiteDataProvider value={siteData}>{children}</SiteDataProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}

'use client'

import React, { createContext, use } from 'react'

import type { SiteNavData } from '@/lib/payload/queries'

const SiteDataContext = createContext<SiteNavData | null>(null)

export function SiteDataProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: SiteNavData
}) {
  return <SiteDataContext value={value}>{children}</SiteDataContext>
}

export function useSiteData(): SiteNavData {
  const context = use(SiteDataContext)
  if (!context) {
    throw new Error('useSiteData must be used within SiteDataProvider')
  }
  return context
}

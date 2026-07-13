import type { Metadata } from 'next'

import { getContactPage, getSiteSettings } from '@/lib/payload/queries'
import { serializeContact } from '@/lib/payload/serialize'
import ContactPageClient from './page.client'

export const metadata: Metadata = {
  title: "Contact — Groupe Vocal L'Eau Vive",
  description:
    "Contactez le Groupe Vocal L'Eau Vive pour vos questions, projets ou pour nous rejoindre.",
}

export default async function ContactRoutePage() {
  const [contact, site] = await Promise.all([getContactPage(), getSiteSettings()])
  const data = serializeContact(contact, site)

  return <ContactPageClient data={data} />
}

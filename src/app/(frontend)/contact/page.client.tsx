'use client'

import { ContactScreen } from '@/components/magicpath/contact-leau-vive/ContactScreen'
import type { serializeContact } from '@/lib/payload/serialize'

type ContactPageClientProps = {
  data: ReturnType<typeof serializeContact>
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  return <ContactScreen data={data} />
}

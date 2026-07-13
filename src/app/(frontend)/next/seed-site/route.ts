import { createLocalReq, getPayload } from 'payload'
import { seedSiteContent } from '@/endpoints/seed/site-content'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)
    await seedSiteContent({ payload, req: payloadReq })
    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding site content' })
    return new Response('Error seeding site content.', { status: 500 })
  }
}

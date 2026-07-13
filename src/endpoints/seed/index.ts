import type { Payload, PayloadRequest } from 'payload'

import { seedSiteContent } from './site-content'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Chargement du contenu initial Eau Vive...')
  await seedSiteContent({ payload, req })
}

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

type RevalidateOptions = {
  paths: string[]
}

type SlugCollectionOptions = RevalidateOptions & {
  slugPrefix: string
}

function revalidatePaths(
  payload: { logger: { info: (msg: string) => void } },
  paths: string[],
) {
  paths.forEach((path) => {
    payload.logger.info(`Revalidating path: ${path}`)
    revalidatePath(path)
  })
}

export function createRevalidateHook({ paths }: RevalidateOptions): CollectionAfterChangeHook {
  return ({ doc, previousDoc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc

    const shouldRevalidate =
      doc?._status === 'published' || previousDoc?._status === 'published'

    if (shouldRevalidate) {
      revalidatePaths(payload, paths)
    }

    return doc
  }
}

export function createSlugCollectionHooks({
  paths,
  slugPrefix,
}: SlugCollectionOptions): {
  afterChange: CollectionAfterChangeHook[]
  afterDelete: CollectionAfterDeleteHook[]
} {
  return {
    afterChange: [
      createRevalidateHook({ paths }),
      ({ doc, previousDoc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc

        const slugPaths: string[] = []
        if (doc?.slug) slugPaths.push(`${slugPrefix}/${doc.slug}`)
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          slugPaths.push(`${slugPrefix}/${previousDoc.slug}`)
        }

        if (slugPaths.length) revalidatePaths(payload, slugPaths)
        return doc
      },
    ],
    afterDelete: [
      createRevalidateDeleteHook({ paths }),
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate && doc?.slug) {
          revalidatePath(`${slugPrefix}/${doc.slug}`)
        }
      },
    ],
  }
}

export function createRevalidateDeleteHook({ paths }: RevalidateOptions): CollectionAfterDeleteHook {
  return ({ req: { context } }) => {
    if (!context.disableRevalidate) {
      paths.forEach((path) => revalidatePath(path))
    }
  }
}

export function createGlobalRevalidateHook({ paths }: RevalidateOptions): GlobalAfterChangeHook {
  return ({ req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      paths.forEach((path) => {
        payload.logger.info(`Revalidating global path: ${path}`)
        revalidatePath(path)
      })
    }
  }
}

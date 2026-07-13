import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Activites } from './collections/Activites'
import { Actualites } from './collections/Actualites'
import { Concerts } from './collections/Concerts'
import { Evenements } from './collections/Evenements'
import { Mariages } from './collections/Mariages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Accueil } from './globals/Accueil/config'
import { ConcertsPage } from './globals/ConcertsPage/config'
import { Contact } from './globals/Contact/config'
import { ActivitesPage, MariagePage } from './globals/PageIndex/config'
import { Presentation } from './globals/Presentation/config'
import { Site } from './globals/Site/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { fr } from '@payloadcms/translations/languages/fr';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [
    Activites,
    Mariages,
    Concerts,
    Evenements,
    Actualites,
    Media,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Site,
    Accueil,
    Presentation,
    Contact,
    ConcertsPage,
    ActivitesPage,
    MariagePage,
  ],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  }
})

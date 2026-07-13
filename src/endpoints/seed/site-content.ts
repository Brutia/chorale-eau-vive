import type { Payload, PayloadRequest } from 'payload'

function paragraph(text: string) {
  return {
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'paragraph' as const,
          children: [{ type: 'text' as const, text, version: 1 as const }],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1 as const,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1 as const,
    },
  }
}

export async function seedSiteContent({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> {
  payload.logger.info('— Vérification du contenu du site...')

  const existing = await payload.find({
    collection: 'activites',
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0) {
    payload.logger.info('Le contenu du site existe déjà, seed ignoré.')
    return
  }

  payload.logger.info('— Initialisation du contenu Eau Vive...')

  const contactForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Formulaire de contact',
      submitButtonLabel: 'Envoyer',
      confirmationType: 'message',
      confirmationMessage: paragraph(
        'Votre demande a bien été prise en compte. L\'Eau Vive reviendra vers vous très bientôt.',
      ),
      fields: [
        {
          name: 'nom',
          blockType: 'text',
          label: 'Nom',
          required: true,
          width: 100,
        },
        {
          name: 'email',
          blockType: 'email',
          label: 'Email',
          required: true,
          width: 100,
        },
        {
          name: 'sujet',
          blockType: 'text',
          label: 'Sujet',
          required: false,
          width: 100,
        },
        {
          name: 'message',
          blockType: 'textarea',
          label: 'Message',
          required: false,
          width: 100,
        },
      ],
    },
    req,
  })

  await payload.updateGlobal({
    slug: 'site',
    data: {
      brandName: "Groupe Vocal L'Eau Vive",
      brandShortName: "L'Eau Vive",
      description:
        'Groupe Vocal basé à Strasbourg et Hoerdt. Passionnés par le chant choral et le partage musical depuis de nombreuses années.',
      email: 'eauvive@evc.net',
      address: '67720 Hoerdt & Strasbourg, France',
      footerWeddingTitle: 'Mariage',
      footerWeddingText:
        "Vous voulez accompagner votre mariage d'une chorale ? Contactez-nous.",
      footerWeddingButton: 'Découvrir le mariage',
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'accueil',
    data: {
      hero: {
        eyebrow: 'Strasbourg & environs',
        title: 'Groupe Vocal',
        subtitle: 'Strasbourg & environs · Chœur amateur depuis plus de 50 ans',
      },
      heroTitleEmphasis: "L'Eau Vive",
      heroCtaLabel: 'Nous découvrir',
      heroCtaHref: '#actualites',
      welcome: {
        eyebrow: 'Bienvenue chez nous',
        title: 'Bonjour à vous tous,<br /><em>amis qui aimez le chant.</em>',
        paragraphs: [
          {
            text: 'Nous sommes un groupe vocal amateur de Strasbourg et environs, répartis en 4 groupes de voix : sopranes, altos, ténors et basses.',
          },
          {
            text: 'Une aventure humaine et musicale où chaque voix compte, depuis plus de cinquante ans.',
          },
        ],
        caption: 'Chanter ensemble, simplement.',
        linkLabel: 'Faire connaissance',
        linkHref: '#presentation',
      },
      newsSection: {
        title: 'Actualités & Événements',
        subtitle: 'La vie du chœur',
      },
      weddingCta: {
        eyebrow: 'Une cérémonie en musique',
        title: 'Votre mariage doit être fêté !',
        text: "Le Groupe Vocal L'Eau Vive accompagne votre cérémonie religieuse",
        buttonLabel: 'Découvrir nos prestations mariage',
      },
      miniCards: [
        {
          title: 'Présentation',
          text: 'Découvrez notre histoire, notre chef et les voix qui composent le chœur.',
          icon: 'users',
          link: '/presentation',
        },
        {
          title: 'Activités',
          text: 'Répétitions, rencontres et concerts rythment notre saison musicale.',
          icon: 'music',
          link: '/activites',
        },
        {
          title: 'Nos projets',
          text: 'Des rendez-vous musicaux et de nouveaux répertoires à partager.',
          icon: 'sparkles',
          link: '/concerts',
        },
        {
          title: 'Rejoignez-nous',
          text: 'Envie de chanter ? Venez faire connaissance avec notre groupe.',
          icon: 'heart',
          link: '/contact',
        },
      ],
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'presentation',
    data: {
      hero: {
        eyebrow: "L'ensemble vocal de Strasbourg",
        title: 'Qui sommes-nous ?',
        subtitle:
          'Une énergie collective, quatre voix et une même envie : faire vivre le plaisir du chant.',
      },
      history: {
        eyebrow: 'Depuis Strasbourg',
        title: 'Une histoire de voix, de rencontres et de partage.',
        paragraphs: [
          {
            text: "L'Eau Vive est un groupe vocal amateur de Strasbourg, réuni par une passion commune pour le chant et la musique. Plus de cinquante choristes de tous âges se retrouvent dans une atmosphère chaleureuse et exigeante.",
          },
          {
            text: "Notre ensemble s'organise autour de quatre pupitres — sopranes, altos, ténors et basses — qui se répondent et se mêlent pour donner vie à un répertoire riche et varié.",
          },
          {
            text: 'Tout au long de l\'année, nous partageons notre travail lors de concerts dans la région de Strasbourg, avec le goût des découvertes, de la transmission et de l\'émotion collective.',
          },
        ],
        caption: "Chanter ensemble, c'est écouter l'autre.",
      },
      teamSection: {
        title: "L'équipe artistique",
        subtitle: "Celles et ceux qui font sonner L'Eau Vive",
      },
      teamMembers: [
        {
          roleLabel: 'Direction musicale',
          name: 'Jean-Robert Guirao',
          bio: paragraph(
            "Jean-Robert aime la musique et le chant, sans être un musicien professionnel. Après les conservatoires, il a pris la direction du groupe vocal L'Eau Vive en 1992. Excellent meneur, il s'investit notamment dans la Cantate pour la Paix. Il dirige sans partition, une façon de rester pleinement en relation avec les choristes et de faire grandir la communication musicale.",
          ),
          imagePosition: 'left',
        },
        {
          roleLabel: 'Accompagnement au piano',
          name: 'Jean-Paul Stocky',
          bio: paragraph(
            "Depuis 2012, Jean-Paul accompagne le groupe au piano lors des répétitions et des concerts. Il joue sur piano droit avec une écoute attentive et une grande sensibilité. Originaire de la région de Wangenbourg, cet ancien enseignant est un musicien autodidacte dont la présence soutient chaque voix avec discrétion.",
          ),
          imagePosition: 'right',
        },
      ],
      gallerySection: {
        title: "L'Eau Vive au fil des années",
        subtitle: 'Des souvenirs qui continuent de chanter',
      },
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      hero: {
        eyebrow: "Groupe Vocal L'Eau Vive",
        title: 'Contactez-nous',
        subtitle: "Nous serions ravis d'échanger avec vous !",
      },
      findUs: 'Strasbourg & région de Hoerdt, Alsace',
      sectionTitle: 'Une question, un projet ?',
      sectionSubtitle: 'Échangeons',
      introTitle: 'Parlons de votre projet musical',
      weddingPromo: {
        title: 'Chanter pour un mariage ?',
        text: "Vous voulez accompagner votre mariage d'une chorale ? Contactez-nous via le formulaire ci-dessous ou découvrez nos prestations réalisées.",
        linkLabel: 'Voir nos prestations mariage',
      },
      mapTitle: 'Notre région',
      mapLabel: 'Carte',
      form: contactForm.id,
      successTitle: 'Merci pour votre message',
      successMessage:
        "Votre demande a bien été prise en compte. L'Eau Vive reviendra vers vous très bientôt.",
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'concerts-page',
    data: {
      hero: {
        eyebrow: "L'Eau Vive · Strasbourg",
        title: 'Concerts & Presse',
        subtitle:
          'Les traces de nos concerts, les rencontres qui nous font vibrer et les articles qui racontent notre aventure chorale.',
      },
      sectionTitle: 'La Gazette Musicale de France',
      sectionSubtitle: 'Archives & actualités',
      gazette: {
        title: 'La Gazette',
        titleItalic: 'Musicale de France',
        subtitle: 'Le journal de nos concerts',
        instruction:
          "Cliquez sur l'image pour ouvrir l'article de presse concernant le concert.",
      },
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'activites-page',
    data: {
      hero: {
        eyebrow: "Groupe Vocal L'Eau Vive",
        title: 'Activités',
        subtitle:
          'Voyages, festivals, rencontres chorales et projets qui rythment la vie du chœur.',
      },
    },
    req,
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'mariage-page',
    data: {
      hero: {
        eyebrow: "Groupe Vocal L'Eau Vive",
        title: 'Mariage',
        subtitle:
          'Des chants vivants et sensibles pour accompagner votre cérémonie religieuse.',
      },
      cta: {
        text: "Vous voulez accompagner votre mariage d'une chorale ? Contactez-nous.",
        buttonLabel: 'Nous contacter',
      },
    },
    req,
    context: { disableRevalidate: true },
  })

  const activites = [
    { title: 'PROJET 2022 : CRACOVIE', slug: 'projet-2020-cracovie', sortOrder: 0 },
    { title: 'La venue de Cantabile en Alsace', slug: 'la-venue-de-cantabile-en-alsace', sortOrder: 1 },
    { title: "2018 L'Eau Vive au festival de Vérone", slug: 'l-eau-vive-au-festival-de-verone', sortOrder: 2 },
    { title: '2018 Rencontre avec la Montadour', slug: 'rencontre-eau-vive-montadour', sortOrder: 3 },
    { title: '2016 Participation festival de Prague', slug: 'participation-festival-de-prague', sortOrder: 4 },
    { title: '2015 Notre voyage à Montanay', slug: 'voyagemontanay', sortOrder: 5 },
    { title: '2014 les ardéchois à Strasbourg', slug: 'ardechoisstrasbourg', sortOrder: 6 },
    { title: 'Rencontre avec Chantevieze', slug: 'rencontrechantevieze', sortOrder: 7 },
    { title: '2013 notre voyage à Privas', slug: 'eauviveprivas', sortOrder: 8 },
  ]

  for (const item of activites) {
    await payload.create({
      collection: 'activites',
      data: { ...item, _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  const mariages = [
    {
      title: 'Sophie & Thomas — Geudertheim',
      slug: 'sophie-thomas-geudertheim-2024',
      date: 'Juin 2024',
      location: 'Église Saint-Pierre, Geudertheim',
      sortOrder: 0,
    },
    {
      title: 'Claire & Marc — Strasbourg',
      slug: 'claire-marc-strasbourg-2023',
      date: 'Septembre 2023',
      location: 'Église Saint-Paul, Strasbourg',
      sortOrder: 1,
    },
    {
      title: 'Anne & Pierre — Hoerdt',
      slug: 'anne-pierre-hoerdt-2023',
      date: 'Mai 2023',
      location: 'Église Saint-Médard, Hoerdt',
      sortOrder: 2,
    },
    {
      title: 'Julie & David — Saverne',
      slug: 'julie-david-saverne-2022',
      date: 'Août 2022',
      location: 'Basilique Notre-Dame, Saverne',
      sortOrder: 3,
    },
  ]

  for (const item of mariages) {
    await payload.create({
      collection: 'mariages',
      data: { ...item, _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  const concerts = [
    { title: 'Concert à Truchtersheim', slug: 'truchtersheim', sortOrder: 0 },
    { title: 'Concert à Montanay', slug: 'montanay', sortOrder: 1 },
    { title: 'Concert à Lipsheim', slug: 'lipsheim', sortOrder: 2 },
  ]

  for (const item of concerts) {
    await payload.create({
      collection: 'concerts',
      data: { ...item, _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  const actualites = [
    {
      title: 'Concert du 19 mai 2019',
      date: '19 mai 2019 · Temple de Geudertheim',
      description: 'Un moment de partage et d\'harmonie dans un lieu chargé d\'histoire.',
      category: 'Concert' as const,
      sortOrder: 0,
    },
    {
      title: 'Participation au Concours Canteva',
      date: '15 — 20 juin 2022',
      description:
        "L'ensemble vocal retrouve le plaisir de chanter ensemble et de faire rayonner Strasbourg.",
      category: 'Concours' as const,
      sortOrder: 1,
    },
    {
      title: 'Animations mariage',
      date: "Toute l'année · Alsace",
      description:
        'Des chants vivants et sensibles pour accompagner les cérémonies religieuses.',
      category: 'Mariage' as const,
      sortOrder: 2,
    },
  ]

  for (const item of actualites) {
    await payload.create({
      collection: 'actualites',
      data: { ...item, _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  const presse = [
    { title: "Comme un hymne à l'amour", date: '5 juin 2019', description: 'Concert du 19 mai 2019 au temple de Geudertheim', sortOrder: 0 },
    { title: 'Un concert festif et coloré', date: '7 fév 2019', description: 'Concert du 3 février 2019 au temple de Wasselonne', sortOrder: 1 },
    { title: 'Chanter pour le Téléthon', date: '9 déc 2017', description: "Concert du 9 décembre 2017 à l'Agora de Hoerdt", sortOrder: 2 },
    { title: "Chants d'ici et d'ailleurs", date: '11.12.2016', description: 'Concert du 11 décembre 2016 à l\'église de Weyersheim', sortOrder: 3 },
    { title: 'Une voix, mille couleurs', date: '14 juin 2016', description: 'Un rendez-vous choral plein de lumière et de partage', sortOrder: 4 },
    { title: 'Au fil des saisons', date: '6 déc 2015', description: "Concert de Noël avec les choristes de L'Eau Vive", sortOrder: 5 },
    { title: 'La musique en partage', date: '18 oct 2015', description: 'Une rencontre musicale au cœur de la région', sortOrder: 6 },
    { title: 'Un chœur en fête', date: '21 juin 2015', description: "Les grands moments d'un concert estival inoubliable", sortOrder: 7 },
  ]

  for (const item of presse) {
    await payload.create({
      collection: 'evenements',
      data: { ...item, type: 'presse', _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  const concertCards = [
    { title: 'Concerts à venir', date: '2024 — 2025', description: 'Retrouvez les prochaines dates et venez chanter avec nous.', sortOrder: 0 },
    { title: 'Répertoire sacré', date: 'Programme', description: 'Des œuvres choisies pour les églises et les beaux lieux.', sortOrder: 1 },
    { title: 'Chants du monde', date: 'En tournée', description: 'Une promenade musicale portée par toutes les voix du groupe.', sortOrder: 2 },
    { title: 'Moments de répétition', date: "Toute l'année", description: 'La préparation joyeuse de nos prochains rendez-vous.', sortOrder: 3 },
  ]

  for (const item of concertCards) {
    await payload.create({
      collection: 'evenements',
      data: { ...item, type: 'concert', _status: 'published' },
      req,
      context: { disableRevalidate: true },
    })
  }

  payload.logger.info('— Contenu Eau Vive initialisé avec succès.')
}

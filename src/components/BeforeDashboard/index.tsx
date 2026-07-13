'use client'

import React, { useState } from 'react'
import { Banner, Button } from '@payloadcms/ui'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSeedSite = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/next/seed-site', { method: 'POST' })
      if (!res.ok) throw new Error('Échec')
      setMessage('Contenu initial chargé avec succès.')
    } catch {
      setMessage('Erreur lors du chargement du contenu initial.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenue dans l&apos;administration du site Eau Vive</h4>
      </Banner>
      <p>Depuis ce panneau, les bénévoles peuvent modifier tout le contenu du site :</p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Paramètres du site</strong> — email, adresse, pied de page
        </li>
        <li>
          <strong>Page d&apos;accueil</strong>, <strong>Présentation</strong>, <strong>Contact</strong>{' '}
          — textes et images des pages principales
        </li>
        <li>
          <strong>Activités</strong>, <strong>Mariages</strong>, <strong>Concerts</strong> — listes et
          pages détaillées
        </li>
        <li>
          <strong>Actualités</strong> et <strong>Événements presse &amp; concerts</strong> — cartes
          affichées sur l&apos;accueil et la page Concerts &amp; Presse
        </li>
        <li>
          <strong>Médias</strong> — bibliothèque d&apos;images
        </li>
      </ul>
      <p>
        Première utilisation ? Chargez le contenu de départ (textes actuels du site) puis{' '}
        <a href="/" target="_blank">
          visitez le site
        </a>
        .
      </p>
      <Button buttonStyle="secondary" disabled={loading} onClick={handleSeedSite}>
        {loading ? 'Chargement…' : 'Charger le contenu initial'}
      </Button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}

export default BeforeDashboard

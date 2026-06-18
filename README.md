# Success Media TV

**Le Micro pour transformer** — Site web d'information et de médias tchadien, basé à Sarh.

## Fonctionnalités

- **Actualités** — Articles d'actualité avec catégories (Politique, Économie, Société, Culture, Technologie)
- **Télévision en direct** — Lecteur vidéo intégré (YouTube/Facebook) pour les directs
- **Radio en streaming** — Barre de lecteur radio sticky en bas de page
- **Podcasts** — Épisodes audio/vidéo
- **Galerie média** — Photos et événements
- **Blog** — Fil d'actualités avec pagination et filtrage par catégorie
- **Administration** — Interface admin (CRUD articles, lives, podcasts, galerie)
- **Hors ligne** — Mode démo complet sans backend
- **Progressive Web App (PWA)** — Service worker, manifeste, icônes
- **Responsive** — Menu mobile dropdown, design adaptatif
- **Cookies (RGPD)** — Bannière de consentement

## Stack technique

- **100% vanilla** — HTML5, CSS3, JavaScript ES6 (aucun framework)
- **Routing hash-based** — `#/`, `#/blog?category=...`, `#/live`, etc.
- **API REST simulée** — Client fetch avec fallback offline (`js/api.js`)
- **État global** — Objet `state` dans `js/app-core.js`
- **PWA** — `sw.js` (cache-first), `manifest.json`, icônes 192/512px

## Structure

```
success/
├── index.html              # Shell HTML principal
├── manifest.json           # Manifeste PWA
├── sw.js                   # Service worker
├── logo-jaune.svg          # Favicon SVG (logo jaune)
├── logo.png                # Fallback favicon PNG
├── icon-192.png            # PWA icon 192px
├── icon-512.png            # PWA icon 512px
├── css/
│   └── style.css           # Styles (12k+ lignes, FontAwesome intégré)
├── js/
│   ├── api.js              # Client fetch + données démo offline
│   ├── app-core.js         # Routeur hash, helpers, composants
│   ├── app-pages.js        # Rendu de toutes les pages
│   └── app-main.js         # Point d'entrée, render(), événements
├── assets/
│   ├── fa-brands-400.woff2
│   ├── fa-regular-400.woff2
│   └── fa-solid-900.woff2
└── images/
    ├── article-1.jpg       # Images d'articles (génériques)
    ├── tchad-aerial.jpg    # Vue aérienne du Tchad (Unsplash)
    ├── tchad-airport.jpg   # Aéroport de N'Djamena (Flickr CC)
    ├── tchad-camel.jpg     # Chamelier Toubou (Flickr CC)
    ├── fb-profile.jpg      # Photo de profil Facebook
    ├── gallery-1.jpg       # Images de la galerie
    ├── live-1.jpg          # Images des directs
    ├── podcast-1.jpg       # Images des podcasts
    └── placeholder.svg     # Image par défaut SVG
```

## Lancement

```bash
npx serve <chemin-vers-success/>
```

Puis ouvrir `http://localhost:3000` (ou le port affiché).

## Mode démo (offline)

Le site fonctionne sans backend grâce aux données démo dans `api.js`.  
Login admin offline : `admin` / `admin123`

## API

Endpoint attendu : `/api` (préfixe).  
En cas d'indisponibilité, le fallback `DEMO` prend le relais.

Routes démo disponibles :
- `GET /api/articles` — articles avec pagination
- `GET /api/articles/:slug` — article individuel
- `GET /api/lives` — liste des directs
- `GET /api/lives/current` — direct en cours
- `GET /api/categories` — catégories
- `GET /api/podcasts` — podcasts
- `GET /api/gallery` — galerie
- `GET /api/radio/stream` — URL du flux radio
- `POST /api/auth/login` — authentification
- CRUD admin sur `/api/admin/*`

## Crédits images

- `tchad-aerial.jpg` — Unsplash (licence gratuite)
- `tchad-airport.jpg` — Ken Doerr / Flickr (CC BY 2.0)
- `tchad-camel.jpg` — David Stanley / Flickr (CC BY 2.0)
- Autres images — picsum.photos (licence gratuite)

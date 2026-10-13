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
    ├── cover-success.svg   # Visuel neutre en attendant la vraie photo d'un article
    ├── fb-profile.jpg      # Photo de profil Facebook
    ├── *.png               # Photos des articles
    └── placeholder.svg     # Image par défaut SVG
```

## Lancement

```bash
npx serve <chemin-vers-success/>
```

Puis ouvrir `http://localhost:3000` (ou le port affiché).

## Mode démo (offline)

Sans backend PHP, le site public s'affiche avec les données démo de `api.js` (lecture seule).
L'administration et les formulaires (commentaires, contact, newsletter) nécessitent le backend.

## Compte administrateur

À la création de la base, le mot de passe admin est pris dans la variable d'environnement
`SMTV_ADMIN_PASSWORD`, sinon généré aléatoirement et écrit dans `api/data/admin-password.txt`
(dossier inaccessible depuis le web). Pour le changer :

```bash
php api/set-admin-password.php "<nouveau-mot-de-passe>"
```

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

## Images

Le site ne contient plus d'images de banque. Les photos des articles, lives, podcasts et de la galerie s'ajoutent depuis l'administration (section Médiathèque).

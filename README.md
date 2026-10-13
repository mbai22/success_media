# Success Media TV

**Le business en temps réel** — Média tchadien basé à Sarh, consacré à l'économie, la finance, l'entrepreneuriat et l'innovation.

Site en ligne : <https://successmedia-tv.com>

## Fonctionnalités

- **Rubriques** — Économie, Finance, Business, Entrepreneuriat, Tech & Innovation, Leadership, Analyses, Opportunités
- **Accueil** — Carrousel « À la une », bandeau défilant « En ce moment », cartes des derniers articles, panneau des rubriques, tendances
- **Articles** — Lecture, temps de lecture, partage (WhatsApp, Facebook, X, Telegram, LinkedIn), articles similaires, commentaires
- **Lives et replays** — Lecteur YouTube, Facebook ou vidéo directe
- **Podcasts** et **galerie photo**
- **Recherche** dans les articles, lives et podcasts
- **Contact** et **newsletter**
- **Radio** — Lecteur affiché uniquement quand un flux est configuré
- **Administration** — Tableau de bord, articles, lives, podcasts, galerie, catégories, médiathèque, messages
- **Animations** — Apparition au défilement, carrousel, bandeau ; désactivées si l'appareil demande moins d'animations
- **PWA** — Installable sur mobile (manifeste, icônes, service worker)
- **Réseaux sociaux** — Facebook, YouTube, LinkedIn

## Stack technique

- **Front** — HTML, CSS et JavaScript sans framework, routage par hash (`#/`, `#/blog?category=finance`, `#/article/<slug>`…)
- **API** — PHP 8 + SQLite (`api/index.php`), base créée et mise à jour automatiquement
- **Polices** — Inter et Work Sans (Google Fonts), icônes Font Awesome intégrées dans `css/style.css`

## Structure

```
success/
├── index.html               # Page unique de l'application
├── manifest.json            # Manifeste PWA
├── sw.js                    # Service worker (cache des fichiers statiques)
├── .htaccess                # Réécriture /api et sitemap.xml, protection des fichiers sensibles
├── router.php               # Routeur pour le serveur PHP intégré (développement)
├── sitemap.php              # Sitemap servi sur /sitemap.xml
├── logo.png, logo-jaune.svg # Logos
├── icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
├── api/
│   ├── index.php            # API REST + migrations de la base
│   ├── set-admin-password.php  # Changement du mot de passe admin (ligne de commande)
│   ├── nginx.conf           # Configuration équivalente pour Nginx
│   └── data/                # Base SQLite (non versionnée, protégée par .htaccess)
├── css/style.css            # Styles
├── js/
│   ├── api.js               # Client de l'API + données de secours hors ligne
│   ├── app-core.js          # État, routeur, rubriques, réseaux sociaux, composants
│   ├── app-pages.js         # Gabarits des pages
│   └── app-main.js          # Rendu, accueil, animations, administration
├── assets/                  # Polices Font Awesome
└── images/                  # Photos des articles et fichiers envoyés depuis l'admin
```

## Lancement en local

Prérequis : PHP 8 avec les extensions `pdo_sqlite` et `fileinfo`.

```bash
php -S localhost:8000 router.php
```

Puis ouvrir <http://localhost:8000>. La base `api/data/success.db` est créée au premier appel de l'API.

Sans backend PHP (par exemple avec `npx serve`), le site public s'affiche avec les données de secours de `js/api.js`, en lecture seule. L'administration et les formulaires nécessitent le backend.

## Administration

- Adresse : `/#/admin/login` (en ligne : <https://successmedia-tv.com/#/admin/login>)
- À la création de la base, le compte `admin` reçoit le mot de passe de la variable d'environnement `SMTV_ADMIN_PASSWORD`, sinon un mot de passe aléatoire écrit dans `api/data/admin-password.txt`.
- Pour changer le mot de passe (le fichier `admin-password.txt` est alors supprimé) :

```bash
php api/set-admin-password.php "<nouveau-mot-de-passe>" [utilisateur]
```

## Mise en ligne

1. Envoyer les fichiers du dépôt sur un serveur Apache (avec `mod_rewrite`) ou Nginx (voir `api/nginx.conf`) et PHP 8.
2. **Ne pas écraser `api/data/success.db`** s'il existe déjà sur le serveur : il contient le contenu publié depuis l'admin.
3. Ouvrir une page du site : les migrations de la base s'appliquent automatiquement.
4. Vérifier que `api/data/` n'est pas accessible depuis le navigateur.
5. Changer le mot de passe admin avec `api/set-admin-password.php`.

Après une modification des fichiers JS ou CSS, augmenter `CACHE_NAME` dans `sw.js` pour que les visiteurs reçoivent la nouvelle version.

## Configuration

| Réglage | Fichier |
|---|---|
| Rubriques de la navigation | `RUBRIQUES` dans `js/app-core.js` (et `api/index.php` pour la base) |
| Réseaux sociaux | `SOCIAL_LINKS` dans `js/app-core.js` |
| Flux de la radio | `RADIO_STREAM_URL` dans `api/index.php` (vide : bouton masqué) |
| Domaine (liens canoniques, sitemap) | `js/app-core.js`, `sitemap.php` |

## API

Préfixe : `/api`. Les routes marquées 🔒 demandent l'en-tête `Authorization: Bearer <token>` obtenu à la connexion.

| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/login` | Connexion (renvoie un token) |
| GET | `/stats` 🔒 | Statistiques du tableau de bord |
| GET | `/articles` | Liste (`category`, `featured`, `sort=views`, `limit`, `page`, `per_page`, `all` 🔒) |
| GET | `/articles/:slug` | Article (les brouillons demandent 🔒) |
| POST / PUT / DELETE | `/articles`, `/articles/:id` 🔒 | Gestion des articles |
| GET | `/categories` | Catégories avec nombre d'articles |
| POST / PUT / DELETE | `/categories`, `/categories/:id` 🔒 | Gestion des catégories |
| GET | `/lives`, `/lives/current` | Lives, direct en cours |
| POST / PUT / DELETE | `/lives`, `/lives/:id` 🔒 | Gestion des lives |
| GET | `/podcasts` | Podcasts |
| POST / PUT / DELETE | `/podcasts`, `/podcasts/:id` 🔒 | Gestion des podcasts |
| GET | `/gallery`, `/gallery/categories` | Galerie |
| POST / PUT / DELETE | `/gallery`, `/gallery/:id` 🔒 | Gestion de la galerie |
| GET / POST | `/comments/article/:id`, `/comments` | Commentaires |
| POST | `/contact`, `/newsletter` | Formulaires publics |
| GET | `/contact` 🔒 | Messages reçus |
| GET | `/search?q=` | Recherche |
| GET / POST / DELETE | `/upload`, `/upload/multiple`, `/upload/:fichier` 🔒 | Médiathèque (images JPG, PNG, WebP, GIF, 10 Mo max) |
| GET | `/programs`, `/radio/stream` | Grille des programmes, flux radio |

## Images

Le site ne contient pas d'images de banque. Les photos des articles, lives, podcasts et de la galerie s'ajoutent depuis l'administration (Médiathèque). `images/cover-success.svg` sert de visuel neutre tant qu'un article n'a pas de vraie photo.

## Crédits

Conception : MBAIHORNOM Wilfried — Success Media TV, entité du groupe ND Media-w4b.

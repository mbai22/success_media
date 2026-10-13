/* ============ PAGE RENDERERS ============ */
function renderHome() {
  setPageMeta('Accueil', null, '/');
  return '<div class="page-content" id="page-home">'
    + '<div class="loading-screen" id="home-loading">'
    + '<div class="loading-spinner"><i class="fas fa-tower-broadcast"></i></div>'
    + '<p>Success Media TV</p></div></div>';
}

function renderLives() {
  setPageMeta('Émissions & Lives', 'Regardez Success Media TV en direct et retrouvez toutes nos émissions et replays depuis Sarh, Tchad.', '/lives');
  return '<div class="page-content container" id="page-lives">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-video" style="margin-right:10px;color:var(--primary)"></i> Émissions & Lives</h1>'
    + '<p>Regardez nos émissions en direct et en replay</p></div>'
    + '<div class="live-featured" id="live-featured"><div class="loading"><div class="spinner"></div></div></div>'
    + '<div class="filter-bar">'
    + '<button class="filter-btn active" data-filter="all"><i class="fas fa-th-list"></i> Tous</button>'
    + '<button class="filter-btn" data-filter="live"><i class="fas fa-circle" style="color:var(--primary)"></i> En direct</button>'
    + '<button class="filter-btn" data-filter="replay"><i class="fas fa-rotate-left"></i> Replays</button></div>'
    + '<div class="lives-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderPodcasts() {
  setPageMeta('Podcasts', 'Écoutez et téléchargez nos podcasts — contenus audio inspirants et informatifs.', '/podcasts');
  return '<div class="page-content container" id="page-podcasts">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-podcast" style="margin-right:10px;color:var(--primary)"></i> Podcasts</h1>'
    + '<p>Écoutez et téléchargez nos podcasts</p></div>'
    + '<div class="filter-bar"><div class="search-box">'
    + '<i class="fas fa-search"></i>'
    + '<input type="text" id="podcast-search" placeholder="Rechercher un podcast...">'
    + '<button class="search-clear" id="podcast-search-clear" style="display:none"><i class="fas fa-xmark"></i></button>'
    + '</div></div>'
    + '<div class="podcasts-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderBlog() {
  var catFilter = state.searchParams.get('category');
  var rubrique = RUBRIQUES.find(function(r) { return r.slug === catFilter; });
  var title = rubrique ? rubrique.name : (catFilter ? 'Actualités' : 'Toutes les actualités');
  setPageMeta(title, 'Toute l\'actualité économique et business de Success Media TV au Tchad.', blogUrl(catFilter));
  return '<div class="page-content container" id="page-blog">'
    + '<div class="page-header">'
    + '<h1><i class="fas ' + (rubrique ? rubrique.icon : 'fa-newspaper') + '" style="margin-right:10px;color:var(--primary)"></i> ' + esc(title) + '</h1>'
    + '<p>' + (rubrique ? 'Le business en temps réel — rubrique ' + esc(rubrique.name) : 'Toute l\'actualité de Success Media TV') + '</p></div>'
    + '<div class="blog-layout">'
    + '<div><div class="filter-bar" id="blog-filters">'
    + '<button class="filter-btn' + (!catFilter ? ' active' : '') + '" data-category=""><i class="fas fa-th-list"></i> Tous</button></div>'
    + '<div class="blog-articles-content"><div class="loading"><div class="spinner"></div></div></div></div>'
    + Sidebar() + '</div></div>';
}

function renderArticle() {
  setPageMeta('Article');
  return '<div class="page-content container" id="page-article"><div class="loading"><div class="spinner"></div></div></div>';
}
function setArticleMeta(article) {
  if (!article) return;
  setPageMeta(article.title, article.excerpt || article.content, '/article/' + article.slug);
}

function renderEmissions() {
  setPageMeta('Émissions', 'Découvrez la grille des émissions de Success Media TV — Matinales, débats, culture, sport et divertissement.', '/emissions');
  return '<div class="page-content container" id="page-emissions">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-calendar-alt" style="margin-right:10px;color:var(--primary)"></i> Grille des Émissions</h1>'
    + '<p>Découvrez nos émissions et leur horaire</p></div>'
    + '<div class="emissions-hero fade-in">'
    + '<div class="emissions-hero-text">'
    + '<h2>Ne ratez aucune émission</h2>'
    + '<p>Success Media TV vous propose une grille de programmes variée : information, culture, sport, débats et divertissement.</p>'
    + '</div></div>'
    + '<div class="filter-bar" id="emissions-filters">'
    + '<button class="filter-btn active" data-filter="all"><i class="fas fa-th-list"></i> Toutes</button>'
    + '<button class="filter-btn" data-filter="lundi"><i class="fas fa-calendar-day"></i> Lundi</button>'
    + '<button class="filter-btn" data-filter="mardi"><i class="fas fa-calendar-day"></i> Mardi</button>'
    + '<button class="filter-btn" data-filter="mercredi"><i class="fas fa-calendar-day"></i> Mercredi</button>'
    + '<button class="filter-btn" data-filter="jeudi"><i class="fas fa-calendar-day"></i> Jeudi</button>'
    + '<button class="filter-btn" data-filter="vendredi"><i class="fas fa-calendar-day"></i> Vendredi</button>'
    + '<button class="filter-btn" data-filter="samedi"><i class="fas fa-calendar-day"></i> Samedi</button>'
    + '<button class="filter-btn" data-filter="dimanche"><i class="fas fa-calendar-day"></i> Dimanche</button>'
    + '</div>'
    + '<div class="emissions-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderGallery() {
  setPageMeta('Galerie', 'Découvrez nos photos et vidéos.', '/galerie');
  return '<div class="page-content container" id="page-gallery">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-images" style="margin-right:10px;color:var(--primary)"></i> Galerie</h1>'
    + '<p>Découvrez nos photos et vidéos</p></div>'
    + '<div class="gallery-filters" id="gallery-filters"></div>'
    + '<div class="gallery-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderAbout() {
  setPageMeta('À propos', 'Success Media TV est un média tchadien basé à Sarh, dédié à la production de contenus audiovisuels de qualité.', '/a-propos');
  return '<div class="page-content container" id="page-about">'
    + '<div class="about-hero fade-in">'
    + '<h1>À propos de <span style="color:var(--primary)">Success Media TV</span></h1>'
    + '<p>Success Media TV est un média tchadien basé à Sarh, dédié à la production de contenus audiovisuels de qualité.</p></div>'
    + '<div class="about-info fade-in">'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-tower-broadcast"></i></div><h3>Lives & Émissions</h3><p>Productions en direct et émissions variées</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-headphones"></i></div><h3>Podcasts</h3><p>Contenus audio à écouter partout</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-fire"></i></div><h3>Motivation</h3><p>Des contenus inspirants</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-handshake"></i></div><h3>Opportunités</h3><p>Plateforme pour la jeunesse tchadienne</p></div></div>'
    + '<div class="about-info fade-in" style="grid-template-columns:1fr 1fr">'
    + '<div class="about-card" style="text-align:left"><h3><i class="fas fa-address-card" style="margin-right:8px;color:var(--primary)"></i> Nos coordonnées</h3>'
    + '<p style="margin-top:10px"><i class="fas fa-location-dot" style="width:24px;color:var(--primary)"></i> Sarh, Tchad<br>'
    + '<i class="fas fa-phone" style="width:24px;color:var(--primary)"></i> +235 66 57 65 85<br>'
    + '<i class="fas fa-envelope" style="width:24px;color:var(--primary)"></i> ndgroupmedia89@gmail.com</p></div>'
    + '<div class="about-card" style="text-align:left"><h3><i class="fas fa-building" style="margin-right:8px;color:var(--primary)"></i> ND Media-w4b</h3>'
    + '<p style="margin-top:10px">Success Media TV est une entité du groupe ND Media-w4b.</p></div></div>'
    + '<div class="contact-form fade-in">'
    + '<h2><i class="fas fa-paper-plane" style="margin-right:8px;color:var(--primary)"></i> Nous contacter</h2>'
    + '<div class="contact-form-wrapper">'
    + '<form id="contact-form"><p class="contact-error" style="color:var(--primary);margin-bottom:15px;display:none"></p>'
    + '<div class="form-group"><label><i class="fas fa-user" style="margin-right:6px"></i>Nom complet</label><input type="text" name="name" required placeholder="Votre nom"></div>'
    + '<div class="form-group"><label><i class="fas fa-envelope" style="margin-right:6px"></i>Email</label><input type="email" name="email" required placeholder="votre@email.com"></div>'
    + '<div class="form-group"><label><i class="fas fa-tag" style="margin-right:6px"></i>Sujet</label><input type="text" name="subject" placeholder="Sujet de votre message"></div>'
    + '<div class="form-group"><label><i class="fas fa-comment" style="margin-right:6px"></i>Message</label><textarea name="message" required placeholder="Votre message..."></textarea></div>'
    + '<button type="submit" class="btn btn-primary" style="width:100%"><i class="fas fa-paper-plane" style="margin-right:6px"></i>Envoyer le message</button></form>'
    + '<div class="contact-success" style="display:none;text-align:center;padding:20px">'
    + '<i class="fas fa-check-circle" style="font-size:3rem;color:var(--accent-light);margin-bottom:15px"></i>'
    + '<p style="color:var(--accent-light);font-size:1.1rem">Message envoyé avec succès !</p>'
    + '<button class="btn btn-outline contact-reset" style="margin-top:15px"><i class="fas fa-redo" style="margin-right:6px"></i>Envoyer un autre message</button></div></div></div></div>';
}

function renderAdminLogin() {
  setPageMeta('Administration');
  return '<div class="page-content" id="page-admin-login" style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg-dark);padding:20px">'
    + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:40px;width:100%;max-width:400px">'
    + '<div style="text-align:center;margin-bottom:30px">'
    + '<img src="./logo.png" alt="Success Media TV" style="height:60px;width:auto;margin:0 auto 15px;display:block">'
    + '<h1 style="font-size:1.5rem;font-weight:700">Administration</h1>'
    + '<p style="color:var(--text-secondary);font-size:0.9rem;margin-top:5px">Success Media TV</p></div>'
    + '<div class="login-error" style="background:rgba(230,57,70,0.15);color:var(--primary);padding:10px 15px;border-radius:var(--radius-sm);margin-bottom:20px;font-size:0.9rem;display:none"></div>'
    + '<form id="login-form"><div class="form-group"><label>Nom d\'utilisateur</label><input type="text" id="login-username" placeholder="admin" required></div>'
    + '<div class="form-group"><label>Mot de passe</label><input type="password" id="login-password" placeholder="******" required></div>'
    + '<button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px">Se connecter</button></form></div></div>';
}

var ADMIN_NAV = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'fa-table-cells-large' },
  { id: 'articles', label: 'Articles', icon: 'fa-newspaper' },
  { id: 'lives', label: 'Lives', icon: 'fa-video' },
  { id: 'podcasts', label: 'Podcasts', icon: 'fa-podcast' },
  { id: 'gallery', label: 'Galerie', icon: 'fa-images' },
  { id: 'categories', label: 'Catégories', icon: 'fa-tags' },
  { id: 'media', label: 'Médiathèque', icon: 'fa-folder-open' },
  { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
];

function renderAdmin() {
  if (!state.user) { setTimeout(function() { navigate('/admin/login', { replace: true }); }); return ''; }
  var current = ADMIN_NAV.find(function(n) { return n.id === state.adminSection; }) || ADMIN_NAV[0];
  setPageMeta('Administration — ' + current.label);
  var name = state.user.name || state.user.username || 'Admin';
  return '<div class="page-content adm" id="page-admin">'
    + '<div class="adm-frame">'
    + '<aside class="adm-side">'
    + '<a href="/" class="adm-brand" title="Voir le site"><img src="./logo-jaune.svg" alt=""><span><strong>Success</strong><small>Media TV</small></span></a>'
    + '<nav class="adm-nav" aria-label="Administration">'
    + ADMIN_NAV.map(function(item) {
      var active = item.id === current.id;
      return '<button type="button" class="admin-nav-btn' + (active ? ' active' : '') + '" data-section="' + item.id + '"' + (active ? ' aria-current="page"' : '') + '>'
        + '<i class="fas ' + item.icon + '"></i><span>' + item.label + '</span></button>';
    }).join('')
    + '</nav>'
    + '<button type="button" id="admin-logout" class="adm-logout"><i class="fas fa-right-from-bracket"></i><span>Déconnexion</span></button>'
    + '<div class="adm-version">Success Media TV · admin</div>'
    + '</aside>'
    + '<div class="adm-main">'
    + '<header class="adm-top">'
    + '<h1 id="admin-section-title">' + esc(current.label) + '</h1>'
    + '<div class="adm-top-actions">'
    + '<a href="/" class="adm-icon-btn" target="_blank" rel="noopener noreferrer" title="Voir le site" aria-label="Voir le site"><i class="fas fa-arrow-up-right-from-square"></i></a>'
    + '<button type="button" class="adm-icon-btn" data-goto="messages" title="Messages" aria-label="Messages"><i class="fas fa-envelope"></i><span class="adm-badge" id="adm-msg-badge" hidden></span></button>'
    + '<div class="adm-user"><span>' + esc(name) + '</span><span class="adm-avatar" aria-hidden="true">' + esc(name.charAt(0).toUpperCase()) + '</span></div>'
    + '</div></header>'
    + '<div class="adm-panel" id="admin-content"><div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div></div>'
    + '</div></div></div>';
}

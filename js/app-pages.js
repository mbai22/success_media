/* ============ PAGE RENDERERS ============ */
function renderHome() {
  setPageMeta('Accueil', 'Success Media TV — Media tchadien base a Sarh, production de contenus audiovisuels de qualite.');
  return '<div class="page-content" id="page-home">'
    + '<div class="loading-screen" id="home-loading">'
    + '<div class="loading-spinner"><i class="fas fa-tower-broadcast"></i></div>'
    + '<p>Success Media TV</p></div></div>';
}

function renderLives() {
  setPageMeta('Emissions & Lives', 'Regardez Success Media TV en direct et retrouvez toutes nos emissions et replays depuis Sarh, Tchad.');
  return '<div class="page-content container" id="page-lives">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-video" style="margin-right:10px;color:var(--primary)"></i> Emissions & Lives</h1>'
    + '<p>Regardez nos emissions en direct et en replay</p></div>'
    + '<div class="live-featured" id="live-featured"><div class="loading"><div class="spinner"></div></div></div>'
    + '<div class="filter-bar">'
    + '<button class="filter-btn active" data-filter="all"><i class="fas fa-th-list"></i> Tous</button>'
    + '<button class="filter-btn" data-filter="live"><i class="fas fa-circle" style="color:var(--primary)"></i> En direct</button>'
    + '<button class="filter-btn" data-filter="replay"><i class="fas fa-rotate-left"></i> Replays</button></div>'
    + '<div class="lives-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderPodcasts() {
  setPageMeta('Podcasts', 'Ecoutez et telechargez nos podcasts — contenus audio inspirants et informatifs.');
  return '<div class="page-content container" id="page-podcasts">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-podcast" style="margin-right:10px;color:var(--primary)"></i> Podcasts</h1>'
    + '<p>Ecoutez et telechargez nos podcasts</p></div>'
    + '<div class="filter-bar"><div class="search-box">'
    + '<i class="fas fa-search"></i>'
    + '<input type="text" id="podcast-search" placeholder="Rechercher un podcast...">'
    + '<button class="search-clear" id="podcast-search-clear" style="display:none"><i class="fas fa-xmark"></i></button>'
    + '</div></div>'
    + '<div class="podcasts-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderBlog() {
  var catFilter = state.searchParams.get('category');
  setPageMeta('Blog & Actualites' + (catFilter ? ' - ' + catFilter : ''), 'Toute l\'actualite de Success Media TV au Tchad.');
  return '<div class="page-content container" id="page-blog">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-newspaper" style="margin-right:10px;color:var(--primary)"></i> Blog & Actualites</h1>'
    + '<p>' + (catFilter ? 'Articles dans la categorie : ' + catFilter : 'Toute l\'actualite de Success Media TV') + '</p></div>'
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

function renderGallery() {
  setPageMeta('Galerie', 'Decouvrez nos photos et videos.');
  return '<div class="page-content container" id="page-gallery">'
    + '<div class="page-header">'
    + '<h1><i class="fas fa-images" style="margin-right:10px;color:var(--primary)"></i> Galerie</h1>'
    + '<p>Decouvrez nos photos et videos</p></div>'
    + '<div class="gallery-filters" id="gallery-filters"></div>'
    + '<div class="gallery-content"><div class="loading"><div class="spinner"></div></div></div></div>';
}

function renderAbout() {
  setPageMeta('A propos', 'Success Media TV est un media tchadien base a Sarh, dedie a la production de contenus audiovisuels de qualite.');
  return '<div class="page-content container" id="page-about">'
    + '<div class="about-hero fade-in">'
    + '<h1>A propos de <span style="color:var(--primary)">Success Media TV</span></h1>'
    + '<p>Success Media TV est un media tchadien base a Sarh, dedie a la production de contenus audiovisuels de qualite.</p></div>'
    + '<div class="about-info fade-in">'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-tower-broadcast"></i></div><h3>Lives & Emissions</h3><p>Productions en direct et emissions variees</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-headphones"></i></div><h3>Podcasts</h3><p>Contenus audio a ecouter partout</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-fire"></i></div><h3>Motivation</h3><p>Des contenus inspirants</p></div>'
    + '<div class="about-card"><div class="about-card-icon"><i class="fas fa-handshake"></i></div><h3>Opportunites</h3><p>Plateforme pour la jeunesse tchadienne</p></div></div>'
    + '<div class="about-info fade-in" style="grid-template-columns:1fr 1fr">'
    + '<div class="about-card" style="text-align:left"><h3><i class="fas fa-address-card" style="margin-right:8px;color:var(--primary)"></i> Nos coordonnees</h3>'
    + '<p style="margin-top:10px"><i class="fas fa-location-dot" style="width:24px;color:var(--primary)"></i> Sarh, Tchad<br>'
    + '<i class="fas fa-phone" style="width:24px;color:var(--primary)"></i> +235 66 57 65 85<br>'
    + '<i class="fas fa-envelope" style="width:24px;color:var(--primary)"></i> ndgroupmedia89@gmail.com</p></div>'
    + '<div class="about-card" style="text-align:left"><h3><i class="fas fa-building" style="margin-right:8px;color:var(--primary)"></i> ND Media-w4b</h3>'
    + '<p style="margin-top:10px">Success Media TV est une entite du groupe ND Media-w4b.</p></div></div>'
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
    + '<p style="color:var(--accent-light);font-size:1.1rem">Message envoye avec succes !</p>'
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

function renderAdmin() {
  setPageMeta('Administration' + (state.adminSection ? ' - ' + state.adminSection.charAt(0).toUpperCase() + state.adminSection.slice(1) : ''));
  if (!state.user) { navigate('/admin/login'); return ''; }
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
    { id: 'articles', label: 'Articles', icon: 'fa-newspaper' },
    { id: 'podcasts', label: 'Podcasts', icon: 'fa-podcast' },
    { id: 'lives', label: 'Emissions', icon: 'fa-video' },
    { id: 'categories', label: 'Categories', icon: 'fa-tags' },
    { id: 'gallery', label: 'Galerie', icon: 'fa-images' },
    { id: 'media', label: 'Mediatheque', icon: 'fa-folder-open' },
    { id: 'messages', label: 'Messages', icon: 'fa-envelope' },
  ];
  return '<div class="page-content" id="page-admin" style="display:flex;min-height:100vh;background:var(--bg-dark)">'
    + '<aside style="width:250px;background:var(--bg-card);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50;overflow-y:auto">'
    + '<div style="padding:20px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px">'
    + '<img src="./logo.png" alt="" style="height:36px;width:auto;flex-shrink:0">'
    + '<div><div style="font-weight:700;font-size:0.95rem">Success Media</div><div style="font-size:0.75rem;color:var(--text-muted)">Administration</div></div></div>'
    + '<nav style="flex:1;padding:12px 8px">'
    + navItems.map(function(item) {
      return '<button class="admin-nav-btn' + (state.adminSection === item.id ? ' active' : '') + '" data-section="' + item.id + '" style="width:100%;display:flex;align-items:center;gap:12px;padding:10px 12px;margin-bottom:2px;border-radius:var(--radius-sm);border:none;background:' + (state.adminSection === item.id ? 'rgba(230,57,70,0.15)' : 'transparent') + ';color:' + (state.adminSection === item.id ? 'var(--primary)' : 'var(--text-secondary)') + ';font-weight:' + (state.adminSection === item.id ? '600' : '400') + ';font-size:0.9rem;cursor:pointer;text-align:left">'
        + '<i class="fas ' + item.icon + '" style="width:20px;text-align:center;flex-shrink:0"></i><span>' + item.label + '</span></button>';
    }).join('')
    + '</nav>'
    + '<div style="padding:12px 8px;border-top:1px solid var(--border)">'
    + '<button id="admin-logout" style="width:100%;display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius-sm);border:none;background:transparent;color:var(--text-muted);font-size:0.9rem;cursor:pointer">'
    + '<i class="fas fa-right-from-bracket" style="width:20px;text-align:center"></i><span>Deconnexion</span></button></div></aside>'
    + '<div style="margin-left:250px;flex:1;min-height:100vh">'
    + '<header style="height:60px;background:var(--bg-card);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:40">'
    + '<h2 style="font-size:1.1rem;font-weight:700" id="admin-section-title">' + (navItems.find(function(n) { return n.id === state.adminSection; })?.label || 'Dashboard') + '</h2>'
    + '<a href="/" target="_blank" rel="noopener noreferrer" style="font-size:0.85rem;color:var(--accent)"><i class="fas fa-external-link-alt" style="margin-right:6px"></i>Voir le site</a></header>'
    + '<div style="padding:24px" id="admin-content"><div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div></div></div></div>';
}


/* ============ MAIN RENDER ============ */
function render() {
  const root = document.getElementById('root');
  if (state.route === 'admin-login' || state.route === 'admin') {
    root.innerHTML = state.route === 'admin-login' ? renderAdminLogin() : renderAdmin();
    if (state.route === 'admin-login') bindAdminLoginEvents();
    if (state.route === 'admin') bindAdminEvents();
    return;
  }

  root.innerHTML = '<div id="app">'
    + '<header class="header" id="main-header">'
    + '<div class="header-inner">'
    + '<a href="/" class="logo" aria-label="Success Media TV — Accueil"><img src="./logo.png" alt="Success Media TV" style="height:40px;width:auto"></a>'
    + '<nav class="nav" id="main-nav" aria-label="Médias">'
    + '<div class="nav-item"><a href="/lives" class="nav-link" data-path="/lives">Lives</a></div>'
    + '<div class="nav-item"><a href="/podcasts" class="nav-link" data-path="/podcasts">Podcasts</a></div>'
    + '<div class="nav-item"><a href="/galerie" class="nav-link" data-path="/galerie">Galerie</a></div>'
    + '<div class="nav-item"><a href="/a-propos" class="nav-link" data-path="/a-propos">À propos</a></div>'
    + '<div class="nav-actions">'
    + '<a href="/lives" class="live-btn live-btn-tv"><span class="live-dot-sm"></span> Direct TV</a>'
    + '<button id="radio-toggle-btn" class="live-btn live-btn-radio" title="Écouter la radio"><i class="fas fa-microphone" style="font-size:0.75rem"></i> Radio</button>'
    + '<button id="search-open-btn" class="nav-search-btn" title="Rechercher" aria-label="Rechercher"><i class="fas fa-search"></i></button>'
    + '</div></nav>'
    + '<div class="nav-right-mobile">'
    + '<a href="/lives" class="live-btn live-btn-tv live-btn-compact" aria-label="Direct TV"><span class="live-dot-sm"></span> Direct</a>'
    + '<button class="nav-search-btn" id="search-open-btn-mobile" title="Rechercher" aria-label="Rechercher"><i class="fas fa-search"></i></button>'
    + '<button type="button" class="hamburger-lines" id="hamburger-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu"><span class="line line1"></span><span class="line line2"></span><span class="line line3"></span></button></div></div>'
    + '<nav class="rubriques-bar" aria-label="Rubriques"><div class="rubriques-inner">'
    + '<a href="/" class="rubrique-link" data-rubrique="">Accueil</a>'
    + RUBRIQUES.map(function(r) {
      return '<a href="' + blogUrl(r.slug) + '" class="rubrique-link" data-rubrique="' + r.slug + '">' + esc(r.name) + '</a>';
    }).join('')
    + '</div></nav>'
    + '<div class="mobile-overlay" id="mobile-overlay"></div>'
    + '<div class="mobile-menu" id="mobile-menu"><div class="mobile-menu-inner"><div class="mobile-menu-links">'
    + '<a href="/" class="nav-link-mobile" data-path="/"><i class="fas fa-home nav-icon"></i>Accueil</a>'
    + RUBRIQUES.map(function(r) {
      return '<a href="' + blogUrl(r.slug) + '" class="nav-link-mobile" data-rubrique="' + r.slug + '"><i class="fas ' + r.icon + ' nav-icon"></i>' + esc(r.name) + '</a>';
    }).join('')
    + '<div class="mobile-menu-divider"></div>'
    + '<a href="/lives" class="nav-link-mobile" data-path="/lives"><i class="fas fa-video nav-icon"></i>Lives</a>'
    + '<a href="/podcasts" class="nav-link-mobile" data-path="/podcasts"><i class="fas fa-podcast nav-icon"></i>Podcasts</a>'
    + '<a href="/galerie" class="nav-link-mobile" data-path="/galerie"><i class="fas fa-images nav-icon"></i>Galerie</a>'
    + '<a href="/a-propos" class="nav-link-mobile" data-path="/a-propos"><i class="fas fa-info-circle nav-icon"></i>À propos</a>'
    + '<div class="mobile-menu-divider"></div>'
    + '<div class="mobile-menu-social">' + socialLinks('social-link') + '</div>'
    + '</div></div></div></header>'
    + '<main class="page-transition" id="main-content"></main>'
    + '<footer class="footer-enhanced" id="main-footer"><div class="container">'
    + '<div id="footer-newsletter"></div>'
    + '<div class="footer-grid">'
    + '<div class="footer-col footer-col-brand"><a href="/" class="footer-logo"><img src="./logo.png" alt="Success Media TV"></a>'
    + '<p>Le Micro pour transformer. Success Media TV est un média tchadien basé à Sarh, dédié à la production de contenus audiovisuels de qualité.</p>'
    + '<div class="footer-social">'
    + socialLinks('social-link') + '</div></div>'
    + '<div class="footer-col"><h4>Rubriques</h4>'
    + RUBRIQUES.map(function(r) { return '<a href="' + blogUrl(r.slug) + '">' + esc(r.name) + '</a>'; }).join('')
    + '</div>'
    + '<div class="footer-col"><h4>Média</h4>'
    + '<a href="/lives">Lives</a><a href="/lives?filter=live">En direct</a><a href="/lives?filter=replay">Replays</a><a href="/podcasts">Podcasts</a><a href="/galerie">Galerie</a></div>'
    + '<div class="footer-col"><h4>Liens</h4>'
    + '<a href="/a-propos">À propos</a><a href="/a-propos">Contact</a><a href="/actualites">Toutes les actualités</a><a href="/">Accueil</a></div>'
    + '<div class="footer-col"><h4>Contact</h4>'
    + '<span class="footer-contact-item"><i class="fas fa-phone"></i>+235 66 57 65 85</span>'
    + '<span class="footer-contact-item"><i class="fas fa-envelope"></i>ndgroupmedia89@gmail.com</span>'
    + '<span class="footer-contact-item"><i class="fas fa-location-dot"></i>Sarh, Tchad</span>'
    + '</div></div>'
    + '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + ' Success Media TV. Tous droits réservés.</span>'
    + '<span>Le business en temps réel</span>'
    + '<span>Conception elit\'com Group</span></div></div></footer>'
    + '<div id="search-modal-container"></div>'
    + '<div id="video-modal-container"></div>'
    + '<div id="lightbox-container"></div>'
    + '<div id="toast-container" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:380px"></div>'
    + '<div class="cookie-consent" id="cookie-consent" role="region" aria-label="Information sur les données">'
    + '<div class="cookie-consent-inner">'
    + '<div class="cookie-consent-text"><p>Ce site n\'utilise ni cookies publicitaires ni mesure d\'audience. Seules vos préférences (comme ce message) sont enregistrées sur votre appareil.</p></div>'
    + '<div class="cookie-consent-actions">'
    + '<button class="cookie-btn cookie-btn-accept" id="cookie-accept">J\'ai compris</button>'
    + '</div></div></div>'
    + '<div class="radio-player-bar" id="radio-player-bar">'
    + '<div class="radio-player-inner">'
    + '<div class="radio-player-left"><i class="fas fa-tower-broadcast radio-player-icon"></i><div><div class="radio-player-title">Success Media Radio</div><div class="radio-player-status" id="radio-status">Arrêtée</div></div></div>'
    + '<div class="radio-player-center"><button class="radio-play-btn" id="radio-play-btn"><i class="fas fa-play"></i></button></div>'
    + '<div class="radio-player-right"><audio id="radio-audio" preload="none"></audio><button class="radio-close-btn" id="radio-close-btn" title="Fermer"><i class="fas fa-chevron-down"></i></button></div>'
    + '</div></div></div>';

  document.getElementById('footer-newsletter').innerHTML = NewsletterForm();
  document.getElementById('search-modal-container').innerHTML = SearchModal();
  document.getElementById('video-modal-container').innerHTML = VideoPlayerModal(state.playingLive);
  const mainContent = document.getElementById('main-content');

  switch (state.route) {
    case 'home': mainContent.innerHTML = renderHome(); loadHome(); break;
    case 'emissions': mainContent.innerHTML = renderEmissions(); loadEmissions(); break;
    case 'lives': mainContent.innerHTML = renderLives(); loadLives(); break;
    case 'podcasts': mainContent.innerHTML = renderPodcasts(); loadPodcasts(); break;
    case 'blog': mainContent.innerHTML = renderBlog(); loadBlog(); break;
    case 'article': mainContent.innerHTML = renderArticle(); loadArticle(); break;
    case 'gallery': mainContent.innerHTML = renderGallery(); loadGallery(); break;
    case 'about': mainContent.innerHTML = renderAbout(); break;
    default: mainContent.innerHTML = renderHome(); loadHome();
  }

  updateNav();
  checkLiveNow();
  loadTrending();
  bindEvents();
}

/* ============ UPDATE NAV ============ */
function updateNav() {
  const pathMap = { home: '', emissions: '/emissions', lives: '/lives', podcasts: '/podcasts', blog: '/blog', article: '/article', gallery: '/galerie', about: '/a-propos' };
  const path = pathMap[state.route] || '';
  // Active rubrique: "" for the home page, the category slug on a filtered blog page
  var rubrique = state.route === 'home' ? '' : (state.route === 'blog' ? (state.searchParams.get('category') || null) : null);
  document.querySelectorAll('.nav-link, .nav-link-mobile, .rubrique-link').forEach(function(a) {
    var isActive = a.dataset.rubrique !== undefined ? a.dataset.rubrique === rubrique : a.dataset.path === path;
    a.classList.toggle('active', isActive);
    if (isActive) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  var activeRubrique = document.querySelector('.rubrique-link.active');
  if (activeRubrique) activeRubrique.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

/* ============ CHECK LIVE NOW ============ */
async function checkLiveNow() {
  try {
    const data = await API.get('/lives/current');
    if (data) {
      /* live detected */
    }
  } catch(e) {}
}

/* ============ TRENDING ============ */
async function loadTrending() {
  try {
    var r = await API.get('/articles?limit=5&sort=views');
    var items = getData(r);
    var list = document.getElementById('trending-list');
    if (!list) return;
    if (items.length) {
      list.innerHTML = items.map(function(a, i) {
        return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="trending-item">'
          + '<span class="trending-rank">' + (i + 1) + '</span>'
          + '<div class="trending-info"><span class="trending-title">' + esc(a.title) + '</span>'
          + '<span class="trending-meta">' + formatDate(a.created_at) + '</span></div></a>';
      }).join('');
    } else {
      list.innerHTML = '<div style="padding:10px;text-align:center;color:var(--text-muted);font-size:0.85rem">Aucune tendance</div>';
    }
  } catch(e) {
    var list2 = document.getElementById('trending-list');
    if (list2) list2.innerHTML = '<div style="padding:10px;text-align:center;color:var(--text-muted);font-size:0.85rem">Erreur de chargement</div>';
  }
}

/* ============ BIND EVENTS ============ */
function handleGlobalKeydown(e) {
  if (e.key === 'Escape' && state.menuOpen) {
    var hamburgerBtn = document.getElementById('hamburger-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileOverlay = document.getElementById('mobile-overlay');
    state.menuOpen = false;
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
      hamburgerBtn.focus();
    }
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}

document.addEventListener('keydown', handleGlobalKeydown);

function bindEvents() {
  /* Mobile menu toggle */
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileOverlay = document.getElementById('mobile-overlay');
  function toggleMenu(open) {
    var isOpen = open !== undefined ? open : !state.menuOpen;
    state.menuOpen = isOpen;
    if (hamburgerBtn) {
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    }
    if (mobileMenu) mobileMenu.classList.toggle('open', isOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  }
  if (hamburgerBtn) hamburgerBtn.onclick = function() { toggleMenu(); };
  if (mobileOverlay) mobileOverlay.onclick = function() { toggleMenu(false); };
  /* Close menu on link click */
  document.querySelectorAll('.mobile-menu-links .nav-link-mobile').forEach(function(a) {
    a.onclick = function() { toggleMenu(false); };
  });
  /* Search */
  document.querySelectorAll('#search-open-btn, #search-open-btn-mobile').forEach(function(btn) {
    btn.onclick = function() { state.searchOpen = true; render(); setTimeout(function() { var inp = document.getElementById('search-input'); if (inp) inp.focus(); }, 100); };
  });
  var searchClose = document.getElementById('search-close');
  if (searchClose) searchClose.onclick = function() { state.searchOpen = false; render(); };
  var searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay) searchOverlay.onclick = function(e) { if (e.target === searchOverlay) { state.searchOpen = false; render(); } };
  var searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.oninput = debounce(handleSearch, 300);

  /* Cookie consent */
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-consent').classList.add('show');
  }
  document.getElementById('cookie-accept').onclick = function() {
    localStorage.setItem('cookieConsent', 'acknowledged');
    document.getElementById('cookie-consent').classList.remove('show');
  };

  /* Poll */
  document.querySelectorAll('.poll-option').forEach(function(btn) {
    btn.onclick = function() {
      if (state.pollVoted) return;
      state.pollVoted = true;
      localStorage.setItem('pollVoted', 'true');
      var w = document.getElementById('poll-widget');
      if (w) w.innerHTML = '<h3><i class="fas fa-chart-bar" style="margin-right:8px;color:var(--primary)"></i> Sondage</h3>' + renderPoll();
      showToast('Merci pour votre avis !');
    };
  });

  /* Video player */
  var videoClose = document.getElementById('video-close');
  if (videoClose) videoClose.onclick = function() { state.playingLive = null; render(); };
  var videoOverlay = document.getElementById('video-overlay');
  if (videoOverlay) videoOverlay.onclick = function(e) { if (e.target === videoOverlay) { state.playingLive = null; render(); } };

  /* Newsletter */
  document.querySelectorAll('.newsletter-form-inline').forEach(function(form) {
    form.onsubmit = handleNewsletterSubmit;
  });

  /* Share copy link */
  document.querySelectorAll('.share-copy-link').forEach(function(btn) {
    btn.onclick = function(e) { e.preventDefault(); navigator.clipboard.writeText(window.location.href); showToast('Lien copié !'); };
  });

  /* Pagination */
  document.querySelectorAll('.page-btn[data-page]').forEach(function(btn) {
    btn.onclick = function() { handlePageClick(parseInt(btn.dataset.page)); };
  });

  /* Live cards */
  document.querySelectorAll('.live-card').forEach(function(card) {
    card.onclick = function() {
      try { state.playingLive = JSON.parse(card.dataset.live); render(); } catch(e) {}
    };
  });

  /* Radio player */
  bindRadioEvents();

  /* Live filters */
  document.querySelectorAll('.filter-btn[data-filter]').forEach(function(btn) {
    btn.onclick = function() {
      document.querySelectorAll('.filter-btn[data-filter]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.liveFilter = btn.dataset.filter;
      renderLivesList();
    };
  });

  /* Blog category filters */
  document.querySelectorAll('.filter-btn[data-category]').forEach(function(btn) {
    btn.onclick = function() {
      var cat = btn.dataset.category;
      navigate(blogUrl(cat));
    };
  });

  /* Podcast search */
  var podcastSearch = document.getElementById('podcast-search');
  if (podcastSearch) {
    podcastSearch.oninput = debounce(function() {
      state.podcastSearch = podcastSearch.value;
      var clear = document.getElementById('podcast-search-clear');
      if (clear) clear.style.display = state.podcastSearch ? '' : 'none';
      renderPodcastsList();
    }, 300);
    var podClear = document.getElementById('podcast-search-clear');
    if (podClear) {
      podClear.onclick = function() {
        state.podcastSearch = '';
        podcastSearch.value = '';
        podClear.style.display = 'none';
        renderPodcastsList();
      };
    }
  }

  /* Comment form */
  var commentForm = document.querySelector('.comment-form');
  if (commentForm) commentForm.onsubmit = handleCommentSubmit;

  /* Contact form */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.onsubmit = handleContactSubmit;
  var contactReset = document.querySelector('.contact-reset');
  if (contactReset) {
    contactReset.onclick = function() {
      document.querySelector('.contact-success').style.display = 'none';
      var f = document.getElementById('contact-form');
      if (f) f.style.display = '';
    };
  }

  /* Gallery filters */
  document.querySelectorAll('.gallery-filter[data-gallery-cat]').forEach(function(btn) {
    btn.onclick = function() {
      document.querySelectorAll('.gallery-filter[data-gallery-cat]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.galleryCat = btn.dataset.galleryCat;
      renderGalleryItems();
    };
  });

  /* Gallery items (lightbox) */
  document.querySelectorAll('.gallery-item[data-gallery-id]').forEach(function(item) {
    item.onclick = function() {
      var id = parseInt(item.dataset.galleryId);
      var filtered = state.galleryCat === 'all'
        ? (state.galleryItems || [])
        : (state.galleryItems || []).filter(function(i) { return i.category === state.galleryCat; });
      state.lightboxItem = filtered.find(function(i) { return i.id === id; }) || null;
      state.lightboxIndex = filtered.findIndex(function(i) { return i.id === id; });
      renderLightbox();
    };
  });
}

/* ============ HANDLE PAGE CLICK ============ */
function handlePageClick(page) {
  if (state.route === 'blog') {
    var params = new URLSearchParams(state.searchParams);
    navigate(blogUrl(params.get('category'), page));
  } else if (state.route === 'lives') {
    state.livesPage = page;
    loadLives();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.route === 'podcasts') {
    state.podcastsPage = page;
    loadPodcasts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (state.route === 'gallery') {
    state.galleryPage = page;
    loadGallery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function downloadAdminExport(path, filename) {
  var token = localStorage.getItem('token');
  try {
    var res = await fetch(API.baseURL + path, {
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    });
    if (!res.ok) throw new Error(res.statusText || 'Export impossible');
    var blob = await res.blob();
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch(e) {
    showToast('Export indisponible', 'error');
  }
}

/* ============ SEARCH ============ */
async function handleSearch() {
  var query = document.getElementById('search-input')?.value || '';
  var resultsDiv = document.getElementById('search-results');
  if (!resultsDiv) return;

  if (query.length < 2) {
    resultsDiv.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:0.3"></i><p>Commencez a taper pour rechercher...</p></div>';
    return;
  }

  resultsDiv.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:1.5rem;color:var(--primary)"></i></div>';

  try {
    var data = await API.get('/search?q=' + encodeURIComponent(query));
    var html = '';

    if (data?.articles?.length) {
      html += '<div class="search-result-group"><h4><i class="fas fa-newspaper"></i> Articles (' + data.articles.length + ')</h4>';
      html += data.articles.map(function(a) {
        return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (a.image ? '<img src="' + escAttr(safeUrl(a.image, './images/placeholder.svg')) + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(a.title) + '</div><span class="search-result-meta">' + esc(a.category_name || 'Article') + '</span></div></a>';
      }).join('');
      html += '</div>';
    }
    if (data?.podcasts?.length) {
      html += '<div class="search-result-group"><h4><i class="fas fa-podcast"></i> Podcasts (' + data.podcasts.length + ')</h4>';
      html += data.podcasts.map(function(p) {
        return '<a href="/podcasts" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (p.image ? '<img src="' + escAttr(safeUrl(p.image, './images/placeholder.svg')) + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(p.title) + '</div><span class="search-result-meta">Podcast</span></div></a>';
      }).join('');
      html += '</div>';
    }
    if (data?.lives?.length) {
      html += '<div class="search-result-group"><h4><i class="fas fa-video"></i> Émissions (' + data.lives.length + ')</h4>';
      html += data.lives.map(function(l) {
        return '<a href="/lives" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (l.image ? '<img src="' + escAttr(safeUrl(l.image, './images/placeholder.svg')) + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(l.title) + '</div><span class="search-result-meta">Émission</span></div></a>';
      }).join('');
      html += '</div>';
    }

    if (!html) {
      html = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:0.3"></i><p>Aucun résultat pour "' + esc(query) + '"</p></div>';
    }
    resultsDiv.innerHTML = html;
  } catch(e) {
    resultsDiv.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><p>Erreur de recherche</p></div>';
  }
}

/* ============ NEWSLETTER ============ */
async function handleNewsletterSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var email = form.querySelector('.newsletter-email')?.value;
  var parent = form.closest('.newsletter-section, .sidebar-card');
  var msgEl = parent ? parent.querySelector('.newsletter-msg') : null;
  if (!email) return;
  try {
    await API.post('/newsletter', { email: email });
    if (msgEl) { msgEl.style.display = ''; msgEl.style.color = 'var(--accent-light)'; msgEl.textContent = 'Inscrit avec succès !'; }
    form.style.display = 'none';
  } catch(e) {
    if (msgEl) { msgEl.style.display = ''; msgEl.style.color = 'var(--primary)'; msgEl.textContent = 'Erreur, réessayez'; }
  }
}

/* ============ COMMENTS ============ */
async function handleCommentSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var container = form.closest('.comments-section');
  var articleId = container ? container.dataset.articleId : null;
  var author = form.querySelector('.comment-author')?.value;
  var email = form.querySelector('.comment-email')?.value;
  var content = form.querySelector('.comment-content')?.value;
  var errorEl = form.querySelector('.comment-error');
  var successEl = container ? container.querySelector('.comment-success') : null;
  if (!articleId || !author || !content) return;
  if (errorEl) errorEl.style.display = 'none';
  try {
    await API.post('/comments', { article_id: parseInt(articleId), author: author, email: email, content: content });
    form.reset();
    form.style.display = 'none';
    if (successEl) successEl.style.display = '';
    loadComments(parseInt(articleId));
  } catch(err) {
    if (errorEl) { errorEl.style.display = ''; errorEl.textContent = err.error || 'Erreur lors de l\'envoi'; }
  }
}

/* ============ CONTACT ============ */
async function handleContactSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var fd = new FormData(form);
  var data = {};
  fd.forEach(function(v, k) { data[k] = v; });
  var errorEl = form.querySelector('.contact-error');
  try {
    await API.post('/contact', data);
    form.style.display = 'none';
    var success = form.closest('.contact-form-wrapper').querySelector('.contact-success');
    if (success) success.style.display = '';
  } catch(err) {
    if (errorEl) { errorEl.style.display = ''; errorEl.textContent = 'Erreur lors de l\'envoi. Réessayez.'; }
  }
}

/* ============ LIGHTBOX ============ */
var lightboxKeyHandler = null;
function renderLightbox() {
  var container = document.getElementById('lightbox-container');
  if (!state.lightboxItem) {
    container.innerHTML = '';
    if (lightboxKeyHandler) {
      document.removeEventListener('keydown', lightboxKeyHandler);
      lightboxKeyHandler = null;
    }
    return;
  }
  var item = state.lightboxItem;
  var filtered = (state.galleryItems || []).filter(function(i) { return state.galleryCat === 'all' || i.category === state.galleryCat; });
  container.innerHTML = '<div class="lightbox" id="lightbox">'
    + '<button class="lightbox-close" id="lightbox-close"><i class="fas fa-xmark"></i></button>'
    + (filtered.length > 1
      ? '<button class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></button>'
        + '<button class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></button>'
      : '')
    + '<img src="' + escAttr(safeUrl(item.image, './images/placeholder.svg')) + '" alt="' + escAttr(item.title) + '">'
    + '<div class="lightbox-caption"><h3>' + esc(item.title) + '</h3>'
    + (item.description ? '<p>' + esc(item.description) + '</p>' : '')
    + '</div></div>';
  document.getElementById('lightbox-close').onclick = function() { state.lightboxItem = null; renderLightbox(); };
  var lb = document.getElementById('lightbox');
  if (lb) lb.onclick = function(e) { if (e.target === lb) { state.lightboxItem = null; renderLightbox(); } };
  document.querySelector('.lightbox-prev')?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (filtered.length) {
      state.lightboxIndex = (state.lightboxIndex - 1 + filtered.length) % filtered.length;
      state.lightboxItem = filtered[state.lightboxIndex];
      renderLightbox();
    }
  });
  document.querySelector('.lightbox-next')?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (filtered.length) {
      state.lightboxIndex = (state.lightboxIndex + 1) % filtered.length;
      state.lightboxItem = filtered[state.lightboxIndex];
      renderLightbox();
    }
  });
  if (lightboxKeyHandler) document.removeEventListener('keydown', lightboxKeyHandler);
  lightboxKeyHandler = function handleKey(e) {
    if (!state.lightboxItem) { document.removeEventListener('keydown', lightboxKeyHandler); lightboxKeyHandler = null; return; }
    if (e.key === 'Escape') { state.lightboxItem = null; renderLightbox(); }
    if (e.key === 'ArrowLeft') {
      state.lightboxIndex = (state.lightboxIndex - 1 + filtered.length) % filtered.length;
      state.lightboxItem = filtered[state.lightboxIndex];
      renderLightbox();
    }
    if (e.key === 'ArrowRight') {
      state.lightboxIndex = (state.lightboxIndex + 1) % filtered.length;
      state.lightboxItem = filtered[state.lightboxIndex];
      renderLightbox();
    }
  };
  document.addEventListener('keydown', lightboxKeyHandler);
}

/* Blog filters: rubriques first (navigation order), then other categories that have articles */
function sortCategories(categories) {
  var order = RUBRIQUES.map(function(r) { return r.slug; });
  return categories.filter(function(c) {
    return order.indexOf(c.slug) >= 0 || Number(c.article_count) > 0;
  }).sort(function(a, b) {
    var ia = order.indexOf(a.slug), ib = order.indexOf(b.slug);
    if (ia < 0) ia = order.length;
    if (ib < 0) ib = order.length;
    return ia - ib || String(a.name).localeCompare(String(b.name));
  });
}

/* ============ HOME ============ */
async function loadHome() {
  try {
    var results = await Promise.all([
      API.get('/articles?featured=1'),
      API.get('/articles?limit=10'),
      API.get('/lives?limit=3'),
      API.get('/podcasts?limit=4'),
      API.get('/articles?limit=4&sort=views'),
    ].concat(RUBRIQUES.map(function(r) { return API.get('/articles?category=' + r.slug + '&limit=4'); })));
    var latest = getData(results[1]);
    // "A la une": the article marked as featured, otherwise the most recent one
    var featured = getData(results[0]);
    if (!featured.length && latest.length) featured = [latest[0]];
    if (featured.length) {
      latest = latest.filter(function(a) { return a.id !== featured[0].id; });
    }
    latest = latest.slice(0, 9);
    var lives = getData(results[2]);
    var podcasts = getData(results[3]);
    var trending = getData(results[4]);
    // Ticker: every recent headline; hero carousel: the featured article + the next two; then the trio
    var tickerItems = featured.concat(latest);
    var heroSlides = featured.concat(latest.slice(0, 2));
    latest = latest.slice(2);
    var trio = latest.slice(0, 3);
    latest = latest.slice(3);
    var allSections = RUBRIQUES.map(function(r, i) {
      return { rubrique: r, articles: getData(results[5 + i]) };
    });
    // Hero shortcuts and the 4 panel cards: rubriques with articles first, in navigation order
    var heroTabs = ['economie', 'technologie', 'opportunites'].map(function(slug) {
      return RUBRIQUES.find(function(r) { return r.slug === slug; });
    });
    var panelRubriques = allSections.filter(function(s) { return s.articles.length; })
      .concat(allSections.filter(function(s) { return !s.articles.length; })).slice(0, 4);
    // Up to three rubrique sections, without the articles already shown above
    var shownIds = heroSlides.concat(trio).map(function(a) { return a.id; });
    var rubriqueSections = allSections.map(function(s) {
      return { rubrique: s.rubrique, articles: s.articles.filter(function(a) { return shownIds.indexOf(a.id) < 0; }) };
    }).filter(function(s) { return s.articles.length; }).slice(0, 3);

    var html = '';

    /* Ticker: latest headlines scrolling under the navigation */
    if (tickerItems.length) {
      var tickerList = tickerItems.map(function(a) {
        return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="hx-ticker-item">'
          + (a.category_name ? '<span class="hx-ticker-cat">' + esc(a.category_name) + '</span>' : '')
          + esc(a.title) + '</a>';
      }).join('');
      html += '<div class="hx-ticker" style="--hx-ticker-duration:' + (tickerItems.length * 9) + 's">'
        + '<div class="container hx-ticker-inner">'
        + '<span class="hx-ticker-label"><span class="hx-ticker-dot"></span> En ce moment</span>'
        + '<div class="hx-ticker-viewport"><div class="hx-ticker-track">'
        + '<div class="hx-ticker-group">' + tickerList + '</div>'
        + '<div class="hx-ticker-group" aria-hidden="true">' + tickerList + '</div>'
        + '</div></div></div></div>';
    }

    /* Hero: carousel of the top articles in a rounded image card, rubrique shortcuts at the bottom */
    if (heroSlides.length) {
      html += '<section class="hx-hero-wrap"><div class="container">'
        + '<div class="hx-hero" id="home-hero" aria-roledescription="carrousel" aria-label="À la une">'
        + '<div class="hx-slides">'
        + heroSlides.map(function(a, i) {
            var url = '/article/' + encodeURIComponent(a.slug || '');
            var tag = i === 0 ? 'h1' : 'h2';
            return '<article class="hx-slide' + (i === 0 ? ' is-active' : '') + '"' + (i === 0 ? '' : ' aria-hidden="true" inert') + ' aria-roledescription="diapositive" aria-label="' + (i + 1) + ' sur ' + heroSlides.length + '">'
              + '<img class="hx-hero-img" src="' + escAttr(safeUrl(a.image, './images/placeholder.svg')) + '" alt=""' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + '>'
              + '<div class="hx-hero-shade"></div>'
              + '<div class="hx-hero-body">'
              + '<div class="hx-pills"><span class="hx-pill hx-pill-glass"><i class="fas fa-bolt"></i> ' + (i === 0 ? 'À la une' : 'À lire aussi') + '</span>'
              + (a.category_name ? '<a href="' + blogUrl(a.category_slug) + '" class="hx-pill hx-pill-glass">' + esc(a.category_name) + '</a>' : '')
              + '</div>'
              + '<' + tag + ' class="hx-hero-title"><a href="' + url + '">' + esc(a.title) + '</a></' + tag + '>'
              + '<p class="hx-hero-excerpt">' + esc(excerpt(a.excerpt || a.content, 190)) + '</p>'
              + '<div class="hx-hero-meta"><span>' + formatDate(a.created_at) + '</span><span>' + readingTime(a.content) + ' min de lecture</span></div>'
              + '<a href="' + url + '" class="hx-cta"><span>Lire l\'article</span><span class="hx-cta-arrow"><i class="fas fa-arrow-right"></i></span></a>'
              + '</div></article>';
          }).join('')
        + '</div>'
        + (heroSlides.length > 1
          ? '<div class="hx-dots">' + heroSlides.map(function(a, i) {
              return '<button type="button" class="hx-dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Afficher l\'article ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '>'
                + '<span class="hx-dot-num">0' + (i + 1) + '</span><span class="hx-dot-track"><span class="hx-dot-bar"></span></span></button>';
            }).join('') + '</div>'
          : '')
        + '<nav class="hx-hero-tabs" aria-label="Rubriques à suivre">'
        + heroTabs.map(function(r, i) {
            return '<a href="' + blogUrl(r.slug) + '" class="hx-hero-tab' + (i === 0 ? ' is-first' : '') + '">'
              + '<span>' + esc(r.name) + '</span><i class="fas fa-arrow-right hx-arrow-ne"></i></a>';
          }).join('')
        + '</nav>'
        + '</div></div></section>';
    }

    /* Trio: the three latest articles, the middle one highlighted */
    if (trio.length) {
      html += '<section class="hx-trio-wrap"><div class="container"><div class="hx-trio">'
        + trio.map(function(a, i) { return heroTrioCard(a, i === 1); }).join('')
        + '</div></div></section>';
    }

    /* Rubriques panel */
    html += '<section class="hx-panel-wrap"><div class="container"><div class="hx-panel">'
      + '<span class="hx-pill">Nos rubriques</span>'
      + '<h2 class="hx-display">Le business en temps réel,<br>au cœur du Tchad</h2>'
      + '<div class="hx-rub-grid">'
      + panelRubriques.map(function(s, i) {
          // First real photo of the rubrique; otherwise a plain brand gradient
          var withPhoto = s.articles.find(function(a) { return a.image && a.image.indexOf('cover-success.svg') < 0; });
          var count = s.articles.length;
          return '<a href="' + blogUrl(s.rubrique.slug) + '" class="hx-rub-card' + (withPhoto ? '' : ' hx-rub-blank') + '">'
            + (withPhoto ? '<img src="' + escAttr(safeUrl(withPhoto.image, './images/placeholder.svg')) + '" alt="" loading="lazy">' : '')
            + '<span class="hx-rub-icon"><i class="fas ' + s.rubrique.icon + '"></i></span>'
            + '<span class="hx-rub-label"><strong>' + esc(s.rubrique.name) + '</strong>'
            + '<small>' + (count ? (count >= 4 ? '4+' : count) + ' article' + (count > 1 ? 's' : '') + ' récent' + (count > 1 ? 's' : '') : 'Bientôt disponible') + '</small></span>'
            + '</a>';
        }).join('')
      + '</div></div></div></section>';

    /* Content area: main + sidebar */
    html += '<section class="section home-content"><div class="container"><div class="home-layout">'
      + '<main class="home-main">';

    /* Latest grid */
    if (latest.length) {
      html += '<div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:var(--primary)"></span> Dernières actualités</h2>'
        + '<a href="/actualites" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="article-grid article-grid-wide">' + latest.map(function(a) { return ArticleCard(a); }).join('') + '</div></div>';
    }

    /* Rubriques */
    rubriqueSections.forEach(function(s) {
      html += '<div class="cat-section cat-section-featured">'
        + '<div class="cat-section-header"><h2><i class="fas ' + s.rubrique.icon + ' cat-icon"></i> ' + esc(s.rubrique.name) + '</h2>'
        + '<a href="' + blogUrl(s.rubrique.slug) + '" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + renderCategoryMix(s.articles, s.rubrique.slug)
        + '</div>';
    });

    html += '</main>';

    /* Sidebar */
    html += '<aside class="home-sidebar">';

    /* Trending */
    if (trending.length) {
      html += '<div class="sidebar-widget sidebar-trending">'
        + '<h3 class="sidebar-widget-title"><i class="fas fa-fire"></i> Tendances</h3>'
        + '<div class="sidebar-trending-list">'
        + trending.map(function(a, idx) {
            return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="sidebar-trending-item">'
              + '<span class="sidebar-trending-num">' + (idx + 1) + '</span>'
              + '<div class="sidebar-trending-info">'
              + '<h4>' + esc(a.title) + '</h4>'
              + '<span class="sidebar-trending-date">' + formatDate(a.created_at) + '</span>'
              + '</div></a>';
          }).join('')
        + '</div></div>';
    }

    /* Rubriques */
    html += '<div class="sidebar-widget sidebar-rubriques">'
      + '<h3 class="sidebar-widget-title"><i class="fas fa-layer-group"></i> Rubriques</h3>'
      + '<div class="sidebar-rubriques-list">'
      + RUBRIQUES.map(function(r) {
          return '<a href="' + blogUrl(r.slug) + '"><i class="fas ' + r.icon + '"></i>' + esc(r.name) + '</a>';
        }).join('')
      + '</div></div>';

    /* Lives sidebar */
    if (lives.length) {
      html += '<div class="sidebar-widget sidebar-lives">'
        + '<h3 class="sidebar-widget-title"><i class="fas fa-video"></i> Émissions récentes</h3>'
        + '<div class="sidebar-live-list">'
        + lives.map(function(l) {
            return '<a href="/lives" class="sidebar-live-item">'
              + '<div class="sidebar-live-thumb"><img src="' + esc(safeUrl(l.image, './images/placeholder.svg')) + '" alt="" loading="lazy">'
              + (l.is_live ? '<span class="sidebar-live-indicator"></span>' : '')
              + '</div>'
              + '<div class="sidebar-live-info">'
              + '<h4>' + esc(l.title) + '</h4>'
              + (l.is_live ? '<span class="live-badge-sm"><span class="live-dot"></span> EN DIRECT</span>' : '<span class="sidebar-live-date">' + formatDate(l.created_at) + '</span>')
              + '</div></a>';
          }).join('')
        + '</div></div>';
    }

    /* Podcasts sidebar */
    if (podcasts.length) {
      html += '<div class="sidebar-widget sidebar-podcasts">'
        + '<h3 class="sidebar-widget-title"><i class="fas fa-podcast"></i> Podcasts</h3>'
        + '<div class="sidebar-podcast-list">'
        + podcasts.map(function(p) {
            return '<a href="/podcasts" class="sidebar-podcast-item">'
              + '<img src="' + esc(safeUrl(p.image, './images/placeholder.svg')) + '" alt="" loading="lazy">'
              + '<div class="sidebar-podcast-info">'
              + '<h4>' + esc(p.title) + '</h4>'
              + (p.duration ? '<span class="sidebar-podcast-duration"><i class="fas fa-headphones"></i> ' + esc(p.duration) + '</span>' : '')
              + '</div></a>';
          }).join('')
        + '</div></div>';
    }

    html += '</aside></div></div></section>';

    /* CTA banner */
    html += '<section class="cta-banner"><div class="container"><div class="cta-content">'
      + '<h2>Suivez Success Media TV</h2>'
      + '<p>Restez connecté pour ne rien manquer</p>'
      + '<div class="cta-links">'
      + socialLinks('btn btn-outline', true)
      + '<a href="/a-propos" class="btn btn-primary"><i class="fas fa-envelope"></i> Nous contacter</a>'
      + '</div></div></div></section>';

    document.getElementById('page-home').innerHTML = html;
    initHeroSlider();
  } catch(e) {
    var el = document.getElementById('page-home');
    if (el) el.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}


/* Home trio card: light card with the image below, or the highlighted (accent) variant */
function heroTrioCard(a, accent) {
  var url = '/article/' + encodeURIComponent(a.slug || '');
  var img = '<div class="hx-card-img"><img src="' + escAttr(safeUrl(a.image, './images/placeholder.svg')) + '" alt="" loading="lazy"></div>';
  var head = '<div class="hx-card-head"><span class="hx-pill">' + esc(a.category_name || 'Actualité') + '</span>'
    + '<span class="hx-arrow-btn" aria-hidden="true"><i class="fas fa-arrow-right hx-arrow-ne"></i></span></div>';
  var title = '<h3 class="hx-card-title">' + esc(a.title) + '</h3>';
  return '<a href="' + url + '" class="hx-card' + (accent ? ' hx-card-accent' : '') + '">'
    + (accent ? img + head + title : head + title + img)
    + '</a>';
}

function renderCategoryMix(articles, categorySlug) {
  if (!articles || !articles.length) return '';
  var main = articles[0];
  var rest = articles.slice(1);
  var html = '<div class="cat-mix">'
    + '<div class="cat-mix-featured">'
    + '<a href="/article/' + encodeURIComponent(main.slug || '') + '" class="cat-mix-card">'
    + '<div class="cat-mix-img"><img src="' + esc(main.image || './images/placeholder.svg') + '" alt="' + esc(main.title) + '" loading="lazy"></div>'
    + '<div class="cat-mix-body">'
    + '<h3>' + esc(main.title) + '</h3>'
    + '<p>' + esc(excerpt(main.excerpt || main.content, 120)) + '</p>'
    + '<span class="cat-mix-date">' + formatDate(main.created_at) + '</span>'
    + '</div></a></div>'
    + '<div class="cat-mix-list">'
    + rest.map(function(a) {
        return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="cat-mix-item">'
          + '<div class="cat-mix-item-img"><img src="' + esc(a.image || './images/placeholder.svg') + '" alt="' + esc(a.title) + '" loading="lazy"></div>'
          + '<div class="cat-mix-item-body">'
          + '<h4>' + esc(a.title) + '</h4>'
          + '<span class="cat-mix-date">' + formatDate(a.created_at) + '</span>'
          + '</div></a>';
      }).join('')
    + '</div></div>';
  return html;
}

/* ============ HERO CAROUSEL ============ */
function renderHeroCarousel(articles) {
  if (!articles?.length) return '';
  var html = '<div class="hero-carousel">';
  articles.forEach(function(a, i) {
    html += '<div class="carousel-slide' + (i === 0 ? ' active' : '') + '">'
      + '<div class="carousel-bg"><img src="' + esc(a.image || './images/placeholder.svg') + '" alt=""><div class="carousel-overlay"></div></div>'
      + '<div class="carousel-content"><div class="container">'
      + (a.category_name ? '<span class="article-card-category">' + esc(a.category_name) + '</span>' : '')
      + '<h2>' + esc(a.title) + '</h2>'
      + '<p>' + esc(a.excerpt || (a.content || '').substring(0, 180)) + '</p>'
      + '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="btn btn-primary"><i class="fas fa-book-open" style="margin-right:6px"></i>Lire la suite</a>'
      + '</div></div></div>';
  });
  if (articles.length > 1) {
    html += '<button class="carousel-arrow carousel-prev" id="carousel-prev"><i class="fas fa-chevron-left"></i></button>'
      + '<button class="carousel-arrow carousel-next" id="carousel-next"><i class="fas fa-chevron-right"></i></button>'
      + '<div class="carousel-dots">'
      + articles.map(function(_, i) { return '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-carousel-index="' + i + '"></button>'; }).join('')
      + '</div>';
  }
  html += '</div>';
  if (articles.length > 1) setTimeout(function() { initCarousel(articles.length); }, 50);
  return html;
}

function initCarousel(len) {
  var current = 0;
  var timer;

  function goTo(index) {
    document.querySelectorAll('.carousel-slide').forEach(function(s, i) { s.classList.toggle('active', i === index); });
    document.querySelectorAll('.carousel-dot').forEach(function(d, i) { d.classList.toggle('active', i === index); });
    current = index;
  }

  var nextBtn = document.getElementById('carousel-next');
  var prevBtn = document.getElementById('carousel-prev');
  if (nextBtn) nextBtn.onclick = function() { goTo((current + 1) % len); };
  if (prevBtn) prevBtn.onclick = function() { goTo((current - 1 + len) % len); };
  document.querySelectorAll('.carousel-dot').forEach(function(dot) {
    dot.onclick = function() { goTo(parseInt(dot.dataset.carouselIndex)); };
  });
  timer = setInterval(function() { goTo((current + 1) % len); }, 6000);
  var carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.onmouseenter = function() { clearInterval(timer); };
    carousel.onmouseleave = function() { timer = setInterval(function() { goTo((current + 1) % len); }, 6000); };
  }
}

/* ============ LIVES ============ */
async function loadEmissions() {
  var container = document.querySelector('.emissions-content');
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  try {
    var res = await API.get('/programs');
    var d = res.data || res;
    var programs = getData(d);
    state.emissionsData = programs;
    renderEmissionsGrid(programs);
  } catch(e) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}

function renderEmissionsGrid(programs) {
  var container = document.querySelector('.emissions-content');
  if (!container) return;
  if (!programs || programs.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Aucune émission trouvée.</p></div>';
    return;
  }
  var html = '<div class="emissions-grid">';
  programs.forEach(function(p) {
    html += '<div class="emission-card fade-in" data-day="' + esc((p.day || '').toLowerCase()) + '" data-category="' + esc(p.category) + '">'
      + '<div class="emission-card-img"><img src="' + escAttr(safeUrl(p.image, './images/placeholder.svg')) + '" alt="' + esc(p.title) + '" loading="lazy" onerror="this.src=\'./images/placeholder.svg\'"></div>'
      + '<div class="emission-card-body">'
      + '<div class="emission-card-time"><i class="fas fa-clock"></i> ' + esc(p.day) + ' — ' + esc(p.time) + '</div>'
      + '<h3>' + esc(p.title) + '</h3>'
      + '<p>' + esc(p.description) + '</p>'
      + '<span class="emission-card-tag">' + esc(p.category) + '</span>'
      + '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
  bindEmissionsFilters();
}

function bindEmissionsFilters() {
  var filterBar = document.getElementById('emissions-filters');
  if (!filterBar) return;
  var btns = filterBar.querySelectorAll('.filter-btn');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBar.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      var cards = document.querySelectorAll('.emission-card');
      cards.forEach(function(c) {
        if (filter === 'all') { c.style.display = ''; return; }
        var day = c.getAttribute('data-day');
        c.style.display = day === filter ? '' : 'none';
      });
    });
  });
}

async function loadLives() {
  var container = document.querySelector('.lives-content');
  var featuredContainer = document.getElementById('live-featured');
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  if (featuredContainer) featuredContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  try {
    var [livesRes, currentRes] = await Promise.all([
      API.get('/lives?page=' + state.livesPage + '&per_page=12'),
      API.get('/lives/current')
    ]);
    var d = livesRes.data || livesRes;
    state.livesData = getData(d);
    state.livesTotal = d.total || 0;
    var currentLive = currentRes && currentRes.data ? currentRes.data : currentRes;
    renderFeaturedLive(currentLive);
    renderLivesList();
  } catch(e) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
    if (featuredContainer) featuredContainer.innerHTML = '';
  }
}

function renderFeaturedLive(live) {
  var container = document.getElementById('live-featured');
  if (!container) return;
  if (!live) {
    container.innerHTML = '';
    return;
  }
  var embedHtml = '';
  var url = live.embed_url || live.facebook_url || '';
  if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
    var m = url.match(/(?:v=|\/)([\w-]{11})/);
    if (m) embedHtml = '<iframe src="https://www.youtube.com/embed/' + m[1] + '?autoplay=1" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
  } else if (url.includes('facebook.com')) {
    embedHtml = '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(url) + '&show_text=false" scrolling="no" allow="encrypted-media;autoplay" allowfullscreen></iframe>';
  } else if (url) {
    embedHtml = '<video controls autoplay><source src="' + url + '" type="video/mp4"></video>';
  } else {
    embedHtml = '<div class="live-featured-placeholder"><i class="fas fa-tower-broadcast"></i><p>Aucun flux disponible pour le moment</p></div>';
  }
  container.innerHTML = '<div class="live-featured-banner fade-in">'
    + '<div class="live-featured-player">' + embedHtml + '</div>'
    + '<div class="live-featured-info">'
    + '<span class="live-badge"><span class="live-dot"></span> EN DIRECT</span>'
    + '<h2>' + esc(live.title) + '</h2>'
    + (live.description ? '<p>' + esc(live.description) + '</p>' : '')
    + '</div></div>';
}

function renderLivesList() {
  var container = document.querySelector('.lives-content');
  if (!container) return;
  var filtered = state.liveFilter === 'all'
    ? (state.livesData || [])
    : (state.livesData || []).filter(function(l) { return state.liveFilter === 'live' ? l.is_live : !l.is_live; });

  if (!filtered.length) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-video" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucune émission pour le moment.</p></div>';
    return;
  }
  container.innerHTML = '<div class="live-grid fade-in">' + filtered.map(function(l) { return LiveCard(l); }).join('') + '</div>'
    + Pagination(state.livesPage, state.livesTotal, 12);
  bindEvents();
}

/* ============ PODCASTS ============ */
async function loadPodcasts() {
  var container = document.querySelector('.podcasts-content');
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  try {
    var r = await API.get('/podcasts?page=' + state.podcastsPage + '&per_page=12');
    var d = r.data || r;
    state.podcastsData = getData(d);
    state.podcastsTotal = d.total || 0;
    renderPodcastsList();
  } catch(e) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}

function renderPodcastsList() {
  var container = document.querySelector('.podcasts-content');
  if (!container) return;
  var search = (state.podcastSearch || '').toLowerCase();
  var filtered = search
    ? (state.podcastsData || []).filter(function(p) { return (p.title || '').toLowerCase().includes(search) || (p.description || '').toLowerCase().includes(search); })
    : (state.podcastsData || []);

  if (!filtered.length) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-podcast" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>' + (search ? 'Aucun résultat.' : 'Aucun podcast pour le moment.') + '</p></div>';
    return;
  }
  container.innerHTML = '<div class="podcast-grid fade-in">' + filtered.map(function(p) { return PodcastCard(p); }).join('') + '</div>'
    + Pagination(state.podcastsPage, state.podcastsTotal, 12);
  bindEvents();
}

/* ============ BLOG ============ */
async function loadBlog() {
  var catFilter = state.searchParams.get('category');
  var page = parseInt(state.searchParams.get('page')) || 1;

  try {
    var results = await Promise.all([
      API.get('/articles?page=' + page + '&per_page=12' + (catFilter ? '&category=' + catFilter : '')),
      API.get('/categories'),
    ]);
    var r = results[0].data || results[0];
    var articles = getData(r);
    var total = r.total || 0;
    var categories = results[1].data || results[1] || [];

    var filterContainer = document.getElementById('blog-filters');
    if (filterContainer) {
      filterContainer.innerHTML = '<button class="filter-btn' + (!catFilter ? ' active' : '') + '" data-category=""><i class="fas fa-th-list"></i> Tous</button>'
        + sortCategories(Array.isArray(categories) ? categories : []).map(function(c) {
          return '<button class="filter-btn' + (catFilter === c.slug ? ' active' : '') + '" data-category="' + esc(c.slug) + '"><i class="fas fa-tag"></i> ' + esc(c.name) + '</button>';
        }).join('');
    }

    var container = document.querySelector('.blog-articles-content');
    if (!container) return;

    if (!articles.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-newspaper"></i>'
        + '<p>' + (catFilter ? 'Aucun article dans cette rubrique pour le moment.' : 'Aucun article pour le moment.') + '</p>'
        + (catFilter ? '<a href="/actualites" class="btn btn-outline">Voir toutes les actualités</a>' : '') + '</div>';
    } else {
      container.innerHTML = '<div class="article-grid fade-in">' + articles.map(function(a) { return ArticleCard(a); }).join('') + '</div>'
        + Pagination(page, total, 12);
    }

    if (articles.length) {
      var recentsContainer = document.querySelector('.sidebar-recents');
      var recentsList = document.querySelector('.sidebar-recents-list');
      if (recentsContainer && recentsList) {
        recentsContainer.style.display = '';
        recentsList.innerHTML = articles.slice(0, 5).map(function(a) {
          return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="sidebar-link"><i class="fas fa-file-lines" style="margin-right:8px;color:var(--text-muted);font-size:0.8rem"></i>' + esc(a.title) + '</a>';
        }).join('');
      }
    }
    bindEvents();
  } catch(e) {
    var el = document.querySelector('.blog-articles-content');
    if (el) el.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}

/* ============ ARTICLE ============ */
async function loadArticle() {
  var slug = state.params.slug;
  var container = document.getElementById('page-article');
  if (!container) {
    var mc = document.getElementById('main-content');
    if (mc) mc.innerHTML = '<div style="text-align:center;padding:60px"><i class="fas fa-exclamation-triangle" style="font-size:3rem;color:var(--text-muted);opacity:0.3"></i><h2>Erreur</h2><p style="color:var(--text-muted)">Impossible de charger l\'article</p></div>';
    return;
  }
  if (!slug) {
    container.innerHTML = '<div style="text-align:center;padding:60px"><h2>Article introuvable</h2><a href="/actualites" class="btn btn-primary" style="margin-top:20px">Retour au blog</a></div>';
    return;
  }

  try {
    var r = await API.get('/articles/' + slug);
    var article = r.data || r;
    if (!article || !article.title) { throw new Error('Article invalide'); }
    setArticleMeta(article);
    var related = [];
    if (article.category_slug) {
      try {
        var relRes = await API.get('/articles?category=' + encodeURIComponent(article.category_slug) + '&limit=3');
        var relData = getData(relRes);
        related = relData.filter(function(a) { return a.id !== article.id; }).slice(0, 3);
      } catch(e) {}
    }

    var date = formatDate(article.created_at);
    var rt = readingTime(article.content);

    var html = '<div class="article-page">'
      + '<nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a>'
      + (article.category_slug ? '<span aria-hidden="true">›</span><a href="' + blogUrl(article.category_slug) + '">' + esc(article.category_name || article.category_slug) + '</a>' : '')
      + '<span aria-hidden="true">›</span><span aria-current="page">' + esc(article.title) + '</span></nav>'
      + '<div class="article-header fade-in">'
      + (article.category_name ? '<a href="' + blogUrl(article.category_slug) + '" class="article-card-category">' + esc(article.category_name) + '</a>' : '')
      + '<h1>' + esc(article.title) + '</h1>'
      + '<div class="article-meta">'
      + '<span><i class="fas fa-user-pen" style="margin-right:6px"></i>' + esc(article.author) + '</span><span> - </span>'
      + '<span><i class="fas fa-calendar-alt" style="margin-right:6px"></i>' + date + '</span><span> - </span>'
      + '<span style="display:inline-flex;align-items:center;gap:6px"><i class="fas fa-clock" style="font-size:0.8rem"></i>' + rt + ' min de lecture</span>'
      + '</div></div>'
      + (article.image ? '<img src="' + esc(article.image) + '" alt="' + esc(article.title) + '" class="article-featured-image fade-in">' : '')
      + '<div class="article-content fade-in">' + (article.content || '').split('\n').map(function(p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>'
      + ShareButtons(article.title)
      + '<div style="text-align:center;margin:40px 0"><a href="/actualites" class="btn btn-outline"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Retour au blog</a></div>';

    if (related.length > 0) {
      html += '<div class="related-articles"><h3><i class="fas fa-link" style="margin-right:8px;color:var(--primary)"></i> Articles similaires</h3>'
        + '<div class="article-grid">' + related.map(function(a) {
          return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" class="article-card">'
            + '<img src="' + esc(a.image || './images/placeholder.svg') + '" alt="' + esc(a.title) + '" class="article-card-image" loading="lazy">'
            + '<div class="article-card-body"><h3 class="article-card-title">' + esc(a.title) + '</h3>'
            + '<div class="article-card-footer"><span>' + esc(a.author) + '</span><span>' + formatDateShort(a.created_at) + '</span></div></div></a>';
        }).join('') + '</div></div>';
    }

    html += CommentsSection(article.id) + '</div>';
    container.innerHTML = html;
    bindEvents();
    loadComments(article.id);
  } catch(e) {
    container.innerHTML = '<div style="text-align:center;padding:60px">'
      + '<i class="fas fa-file-circle-exclamation" style="font-size:3rem;margin-bottom:15px;color:var(--text-muted);opacity:0.3"></i>'
      + '<h2>Article non trouvé</h2>'
      + '<a href="/actualites" class="btn btn-primary" style="margin-top:20px"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Retour au blog</a></div>';
  }
}

/* ============ COMMENTS LOAD ============ */
async function loadComments(articleId) {
  var container = document.querySelector('.comments-section');
  if (!container) return;
  try {
    var r = await API.get('/comments/article/' + articleId);
    var comments = Array.isArray(r.data) ? r.data : (Array.isArray(r) ? r : []);
    var list = container.querySelector('.comments-list');
    var empty = container.querySelector('.comments-empty');
    var count = container.querySelector('.comments-count');
    if (count) count.textContent = '(' + comments.length + ')';

    if (comments.length > 0) {
      if (list) list.innerHTML = comments.map(function(c) {
        return '<div class="comment-item"><div class="comment-avatar"><i class="fas fa-user"></i></div>'
          + '<div class="comment-body"><div class="comment-meta"><strong>' + esc(c.author) + '</strong><span>' + formatDate(c.created_at) + '</span></div>'
          + '<p>' + esc(c.content) + '</p></div></div>';
      }).join('');
      if (empty) empty.style.display = 'none';
    } else {
      if (empty) empty.style.display = '';
    }
  } catch(e) {}
}

/* ============ GALLERY ============ */
async function loadGallery() {
  var content = document.querySelector('.gallery-content');
  if (!content) return;
  content.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  try {
    var results = await Promise.all([
      API.get('/gallery?page=' + state.galleryPage + '&per_page=20'),
      API.get('/gallery/categories'),
    ]);
    var d = results[0].data || results[0];
    state.galleryItems = getData(d);
    var total = d.total || 0;
    var categories = results[1].data || results[1] || [];

    var filterContainer = document.getElementById('gallery-filters');
    if (filterContainer) {
      filterContainer.innerHTML = '<button class="gallery-filter active" data-gallery-cat="all"><i class="fas fa-th-list"></i> Tous</button>'
        + (Array.isArray(categories) ? categories : []).map(function(c) {
          return '<button class="gallery-filter" data-gallery-cat="' + c + '">' + c.charAt(0).toUpperCase() + c.slice(1) + '</button>';
        }).join('');
    }
    renderGalleryItems();
  } catch(e) {
    content.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}

function renderGalleryItems() {
  var content = document.querySelector('.gallery-content');
  if (!content) return;
  var filtered = state.galleryCat === 'all'
    ? (state.galleryItems || [])
    : (state.galleryItems || []).filter(function(item) { return item.category === state.galleryCat; });

  if (!filtered.length) {
    content.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-images" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucune image pour le moment.</p></div>';
    return;
  }
  content.innerHTML = '<div class="gallery-grid fade-in">'
    + filtered.map(function(item) {
      return '<div class="gallery-item" data-gallery-id="' + item.id + '">'
        + '<img src="' + esc(item.image || './images/placeholder.svg') + '" alt="' + esc(item.title) + '" loading="lazy">'
        + '<div class="gallery-item-overlay"><h4>' + esc(item.title) + '</h4>'
        + (item.category ? '<span>' + esc(item.category) + '</span>' : '') + '</div></div>';
    }).join('')
    + '</div>';
  bindEvents();
}

/* ============ ADMIN LOGIN ============ */
function bindAdminLoginEvents() {
  var form = document.getElementById('login-form');
  if (!form) return;
  form.onsubmit = async function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    var errorEl = document.querySelector('.login-error');

    try {
      var res = await API.post('/auth/login', { username: username, password: password });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      state.user = res.user;
      navigate('/admin');
    } catch(err) {
      if (errorEl) { errorEl.style.display = ''; errorEl.textContent = err.error || 'Erreur de connexion'; }
    }
  };
}

/* ============ ADMIN ============ */
function bindAdminEvents() {
  document.querySelectorAll('.admin-nav-btn, [data-goto]').forEach(function(btn) {
    btn.onclick = function() { showAdminSection(btn.dataset.section || btn.dataset.goto); };
  });

  var logoutBtn = document.getElementById('admin-logout');
  if (logoutBtn) {
    logoutBtn.onclick = function() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      navigate('/admin/login');
    };
  }
  loadAdminSection();
}

function showAdminSection(section) {
  state.adminSection = section;
  document.querySelectorAll('.admin-nav-btn').forEach(function(b) {
    var isActive = b.dataset.section === section;
    b.classList.toggle('active', isActive);
    if (isActive) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  var item = ADMIN_NAV.find(function(n) { return n.id === section; });
  var titleEl = document.getElementById('admin-section-title');
  if (titleEl && item) titleEl.textContent = item.label;
  if (item) setPageMeta('Administration — ' + item.label);
  var panel = document.getElementById('admin-content');
  if (panel) panel.scrollTop = 0;
  loadAdminSection();
}

async function loadAdminSection() {
  var container = document.getElementById('admin-content');
  if (!container) return;

  switch (state.adminSection) {
    case 'dashboard': renderAdminDashboard(container); break;
    case 'articles': renderAdminArticles(container); break;
    case 'podcasts': renderAdminManager(container, 'podcasts', 'Podcast', [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'URL Image', type: 'image' },
      { key: 'audio_url', label: 'URL Audio', type: 'text' },
      { key: 'video_url', label: 'URL Video', type: 'text' },
    ]); break;
    case 'lives': renderAdminManager(container, 'lives', 'Live', [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'URL Image', type: 'image' },
      { key: 'facebook_url', label: 'URL Facebook', type: 'text' },
      { key: 'youtube_url', label: 'URL YouTube', type: 'text' },
      { key: 'embed_url', label: 'Lien embed', type: 'text' },
      { key: 'scheduled_for', label: 'Programme le', type: 'datetime' },
      { key: 'is_live', label: 'En direct', type: 'checkbox' },
    ]); break;
    case 'categories': renderAdminCategories(container); break;
    case 'gallery': renderAdminManager(container, 'gallery', 'Image', [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'image', label: 'URL Image', type: 'image', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'category', label: 'Categorie', type: 'text' },
    ]); break;
    case 'media': renderAdminMedia(container); break;
    case 'messages': renderAdminMessages(container); break;
  }
}

/* ============ ADMIN DASHBOARD ============ */
async function renderAdminDashboard(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var results = await Promise.all([
      API.get('/stats'),
      API.get('/articles?limit=5&sort=views'),
      API.get('/articles?limit=50&all=1'),
      API.get('/lives?per_page=50'),
    ]);
    var stats = (results[0] && results[0].data) || results[0] || {};
    var top = getData(results[1]);
    var allArticles = getData(results[2]);
    var lives = getData(results[3]);
    var drafts = allArticles.filter(function(a) { return Number(a.published) === 0; }).length;
    var total = Number(stats.articles) || allArticles.length;
    var messages = Number(stats.messages) || 0;
    var name = (state.user && (state.user.name || state.user.username)) || '';

    var badge = document.getElementById('adm-msg-badge');
    if (badge) { badge.hidden = !messages; badge.textContent = messages > 99 ? '99+' : String(messages); }

    var html = '<div class="adm-dash">'
      + '<div class="adm-dash-main">'

      /* Welcome banner */
      + '<section class="adm-hello">'
      + '<div class="adm-hello-text">'
      + '<h2>Bonjour ' + esc(name) + ' !</h2>'
      + '<p>' + plural(total, 'article', 'articles') + ' sur le site'
      + (drafts ? ', dont ' + plural(drafts, 'brouillon', 'brouillons') : '')
      + ', et ' + plural(messages, 'message reçu', 'messages reçus') + '. Le business en temps réel commence ici.</p>'
      + '<button type="button" class="adm-btn-dark" data-goto="articles"><i class="fas fa-pen"></i> Rédiger un article</button>'
      + '</div>'
      + '<div class="adm-hello-art" aria-hidden="true">'
      + '<span class="adm-art-screen"><img src="./logo-jaune.svg" alt=""></span>'
      + '<span class="adm-art-chip adm-art-chip-1"><i class="fas fa-newspaper"></i></span>'
      + '<span class="adm-art-chip adm-art-chip-2"><i class="fas fa-video"></i></span>'
      + '<span class="adm-art-chip adm-art-chip-3"><i class="fas fa-microphone"></i></span>'
      + '</div></section>'

      /* Top articles */
      + '<section class="adm-card">'
      + '<div class="adm-card-head"><h3>Top articles</h3><span class="adm-chip"><i class="fas fa-eye"></i> Par vues</span></div>'
      + (top.length
        ? '<div class="adm-top-list">' + top.map(function(a, i) {
            return '<a href="/article/' + encodeURIComponent(a.slug || '') + '" target="_blank" rel="noopener noreferrer" class="adm-top-row">'
              + '<span class="adm-rank">0' + (i + 1) + '</span>'
              + '<img src="' + escAttr(safeUrl(a.image, './images/placeholder.svg')) + '" alt="" loading="lazy">'
              + '<span class="adm-top-info"><strong>' + esc(a.title) + '</strong>'
              + '<small>' + formatDate(a.created_at) + (a.category_name ? ' · ' + esc(a.category_name) : '') + '</small></span>'
              + '<span class="adm-top-metrics">'
              + '<span title="Vues"><i class="fas fa-eye"></i> ' + compactNumber(a.views) + '</span>'
              + '<span title="Temps de lecture"><i class="fas fa-clock"></i> ' + readingTime(a.content) + ' min</span>'
              + '</span></a>';
          }).join('') + '</div>'
        : '<p class="adm-empty">Aucun article publié pour le moment.</p>')
      + '</section>'
      + '</div>'

      + '<div class="adm-dash-side">'
      /* Colored stat cards */
      + adminStat('adm-stat-orange', 'fa-newspaper', total - drafts, 'Articles publiés', 'articles')
      + adminStat('adm-stat-blue', 'fa-envelope', messages, 'Messages reçus', 'messages')
      + adminStat('adm-stat-teal', 'fa-paper-plane', Number(stats.subscribers) || 0, 'Abonnés newsletter', '')
      /* Small counters */
      + '<div class="adm-mini">'
      + [['lives', 'fa-video', stats.lives, 'Lives'], ['podcasts', 'fa-podcast', stats.podcasts, 'Podcasts'],
         ['gallery', 'fa-images', stats.gallery, 'Photos'], ['', 'fa-comments', stats.comments, 'Commentaires']].map(function(m) {
          var inner = '<i class="fas ' + m[1] + '"></i><strong>' + (Number(m[2]) || 0) + '</strong><small>' + m[3] + '</small>';
          return m[0] ? '<button type="button" data-goto="' + m[0] + '">' + inner + '</button>' : '<div>' + inner + '</div>';
        }).join('')
      + '</div>'
      /* Publication calendar */
      + '<section class="adm-card adm-cal">'
      + '<div class="adm-card-head"><h3>Calendrier</h3><span class="adm-chip" id="adm-cal-month"></span></div>'
      + '<div class="adm-cal-week">'
      + '<button type="button" class="adm-cal-nav" data-cal="-7" aria-label="Semaine précédente"><i class="fas fa-chevron-left"></i></button>'
      + '<div class="adm-cal-days" id="adm-cal-days"></div>'
      + '<button type="button" class="adm-cal-nav" data-cal="7" aria-label="Semaine suivante"><i class="fas fa-chevron-right"></i></button>'
      + '</div>'
      + '<div class="adm-cal-list" id="adm-cal-list"></div>'
      + '</section>'
      + '</div></div>';

    container.innerHTML = html;
    container.querySelectorAll('[data-goto]').forEach(function(btn) {
      btn.onclick = function() { showAdminSection(btn.dataset.goto); };
    });
    initAdminCalendar(allArticles, lives);
  } catch(e) {
    container.innerHTML = '<p class="adm-empty">Erreur de chargement du tableau de bord.</p>';
  }
}

function plural(n, one, many) {
  n = Number(n) || 0;
  return n + ' ' + (n > 1 ? many : one);
}

function compactNumber(n) {
  n = Number(n) || 0;
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}

function adminStat(cls, icon, value, label, section) {
  var inner = '<span class="adm-stat-icon"><i class="fas ' + icon + '"></i></span>'
    + '<span class="adm-stat-text"><strong>' + (Number(value) || 0) + '</strong><small>' + label + '</small></span>';
  return section
    ? '<button type="button" class="adm-stat ' + cls + '" data-goto="' + section + '">' + inner + '</button>'
    : '<div class="adm-stat ' + cls + '">' + inner + '</div>';
}

/* Week calendar of publications (articles by date, lives by scheduled date) */
function initAdminCalendar(articles, lives) {
  var daysEl = document.getElementById('adm-cal-days');
  var listEl = document.getElementById('adm-cal-list');
  var monthEl = document.getElementById('adm-cal-month');
  if (!daysEl || !listEl) return;

  function parse(s) {
    if (!s) return null;
    var d = new Date(String(s).replace(' ', 'T'));
    return isNaN(d) ? null : d;
  }
  function key(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

  var events = articles.map(function(a) {
    return { date: parse(a.created_at), title: a.title, type: Number(a.published) === 0 ? 'Brouillon' : 'Article' };
  }).concat(lives.filter(function(l) { return l.scheduled_for; }).map(function(l) {
    return { date: parse(l.scheduled_for), title: l.title, type: 'Live programmé' };
  })).filter(function(e) { return e.date; });

  var byDay = {};
  events.forEach(function(e) { (byDay[key(e.date)] = byDay[key(e.date)] || []).push(e); });

  // Start on today if something is planned, otherwise on the last publication
  var today = new Date();
  var selected = new Date(today);
  if (!byDay[key(today)]) {
    var past = events.filter(function(e) { return e.date <= today; }).sort(function(a, b) { return b.date - a.date; });
    if (past.length) selected = new Date(past[0].date);
  }

  var initials = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  function render() {
    var monday = new Date(selected);
    monday.setDate(selected.getDate() - ((selected.getDay() + 6) % 7));
    monthEl.textContent = selected.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    var days = '';
    for (var i = 0; i < 7; i++) {
      var d = new Date(monday);
      d.setDate(monday.getDate() + i);
      var cls = 'adm-cal-day' + (key(d) === key(selected) ? ' is-selected' : '') + (key(d) === key(today) ? ' is-today' : '') + (byDay[key(d)] ? ' has-events' : '');
      days += '<button type="button" class="' + cls + '" data-day="' + d.toISOString() + '" aria-pressed="' + (key(d) === key(selected)) + '">'
        + '<small>' + initials[i] + '</small><strong>' + d.getDate() + '</strong></button>';
    }
    daysEl.innerHTML = days;
    daysEl.querySelectorAll('.adm-cal-day').forEach(function(b) {
      b.onclick = function() { selected = new Date(b.dataset.day); render(); };
    });

    var items = (byDay[key(selected)] || []).slice().sort(function(a, b) { return a.date - b.date; });
    listEl.innerHTML = '<p class="adm-cal-date">' + selected.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) + '</p>'
      + (items.length
        ? items.map(function(e) {
            return '<div class="adm-cal-item"><time>' + e.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + '</time>'
              + '<div><strong>' + esc(e.title) + '</strong><small>' + e.type + '</small></div></div>';
          }).join('')
        : '<p class="adm-empty">Aucune publication ce jour.</p>');
  }

  document.querySelectorAll('.adm-cal-nav').forEach(function(b) {
    b.onclick = function() { selected.setDate(selected.getDate() + Number(b.dataset.cal)); render(); };
  });
  render();
}

/* ============ ADMIN ARTICLES ============ */
async function renderAdminArticles(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var results = await Promise.all([API.get('/articles?limit=100&all=1'), API.get('/categories')]);
    var articles = getData(results[0]);
    var categories = results[1].data || results[1] || [];
    container.innerHTML = buildAdminArticlesHTML(articles, categories);
    bindAdminArticles(container, articles, categories);
  } catch(e) {
    container.innerHTML = '<p style="color:var(--text-muted)">Erreur de chargement</p>';
  }
}

function buildAdminArticlesHTML(articles, categories) {
  return '<div>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">'
    + '<p style="color:var(--text-secondary);font-size:0.9rem"><i class="fas fa-newspaper" style="margin-right:6px"></i>' + articles.length + ' article(s)</p>'
    + '<div style="display:flex;gap:8px">'
    + '<button id="admin-export-csv" class="btn btn-outline" style="font-size:0.85rem"><i class="fas fa-download" style="margin-right:6px"></i>CSV</button>'
    + '<button id="admin-article-toggle-form" class="btn btn-primary"><i class="fas fa-plus" style="margin-right:6px"></i>Nouvel article</button></div></div>'
    + '<div id="admin-article-form" style="display:none;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:25px;margin-bottom:25px">'
    + '<h3 style="margin-bottom:20px;font-weight:700" id="admin-article-form-title"><i class="fas fa-plus-circle" style="margin-right:8px"></i>Nouvel article</h3>'
    + '<form id="admin-article-form-inner">'
    + '<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">'
    + '<div>'
    + '<div class="form-group"><label><i class="fas fa-heading" style="margin-right:6px"></i>Titre *</label><input id="art-title" required></div>'
    + '<div class="form-group"><label><i class="fas fa-link" style="margin-right:6px"></i>Slug (URL)</label><input id="art-slug" placeholder="titre-de-l-article"></div>'
    + '<div class="form-group"><label><i class="fas fa-paragraph" style="margin-right:6px"></i>Resume</label><textarea id="art-excerpt" rows="3"></textarea></div>'
    + '<div class="form-group"><label><i class="fas fa-file-lines" style="margin-right:6px"></i>Contenu *</label><textarea id="art-content" rows="10" style="font-family:monospace"></textarea></div></div>'
    + '<div>'
    + '<div class="form-group"><label><i class="fas fa-image" style="margin-right:6px"></i>Image de l\'article</label>' + imagePickerHTML('art-image', '') + '</div>'
    + '<div class="form-group"><label><i class="fas fa-tag" style="margin-right:6px"></i>Catégorie</label><select id="art-category"><option value="">-- Sans catégorie --</option>'
    + categories.map(function(c) { return '<option value="' + esc(c.slug) + '">' + esc(c.name) + '</option>'; }).join('') + '</select></div>'
    + '<div class="form-group"><label><i class="fas fa-user-pen" style="margin-right:6px"></i>Auteur</label><input id="art-author" value="Success Media TV"></div>'
    + '<div class="form-group"><label><i class="fas fa-calendar-clock" style="margin-right:6px"></i>Programmer</label><input type="datetime-local" id="art-scheduled"></div>'
    + '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">'
    + '<label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="art-featured"><span style="font-size:0.9rem"><i class="fas fa-star" style="margin-right:4px;color:var(--text-muted)"></i>À la une</span></label>'
    + '<label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="art-published" checked><span style="font-size:0.9rem"><i class="fas fa-globe" style="margin-right:4px"></i>Publié</span></label></div></div></div>'
    + '<div style="display:flex;gap:10px;margin-top:10px">'
    + '<button type="submit" class="btn btn-primary" id="art-submit-btn"><i class="fas fa-paper-plane" style="margin-right:6px"></i>Publier</button>'
    + '<button type="button" class="btn btn-outline" id="art-cancel-btn"><i class="fas fa-xmark" style="margin-right:6px"></i>Annuler</button></div></form></div>'
    + '<div id="admin-bulk-bar" class="bulk-bar" style="display:none"><span id="admin-bulk-count"></span>'
    + '<button class="bulk-btn" id="admin-bulk-publish" style="background:rgba(16,185,129,0.2);color:#10b981"><i class="fas fa-globe" style="margin-right:4px"></i>Publier</button>'
    + '<button class="bulk-btn" id="admin-bulk-delete" style="background:rgba(239,68,68,0.2);color:#ef4444"><i class="fas fa-trash-can" style="margin-right:4px"></i>Supprimer</button>'
    + '<button class="bulk-btn" id="admin-bulk-cancel" style="background:transparent;color:var(--text-muted);border:1px solid var(--border)">Annuler</button></div>'
    + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden"><div style="overflow-x:auto">'
    + '<table style="width:100%;border-collapse:collapse;min-width:700px"><thead><tr style="border-bottom:1px solid var(--border);text-align:left;font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">'
    + '<th style="padding:12px 16px;width:36px"><input type="checkbox" id="admin-select-all"></th>'
    + '<th style="padding:12px 16px">Titre</th><th style="padding:12px 16px">Catégorie</th><th style="padding:12px 16px">Statut</th>'
    + '<th style="padding:12px 16px">Date</th><th style="padding:12px 16px;text-align:right">Actions</th></tr></thead><tbody>'
    + articles.map(function(a, i) {
      var statusHtml = '';
      if (a.scheduled_for && new Date(a.scheduled_for) > new Date()) {
        statusHtml = '<span style="background:rgba(245,158,11,0.2);color:#f59e0b;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600"><i class="fas fa-clock" style="margin-right:4px"></i>Programmé</span>';
      } else if (a.featured) {
        statusHtml = '<span style="background:rgba(233,196,106,0.2);color:#e9c46a;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600"><i class="fas fa-star" style="margin-right:4px"></i>À la une</span>';
      } else {
        statusHtml = '<span style="background:rgba(69,123,157,0.2);color:var(--accent);padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600"><i class="fas fa-file" style="margin-right:4px"></i>Normal</span>';
      }
      return '<tr style="border-bottom:' + (i < articles.length - 1 ? '1px solid var(--border)' : 'none') + '">'
        + '<td style="padding:12px 16px"><input type="checkbox" class="admin-select-item" value="' + a.id + '"></td>'
        + '<td style="padding:12px 16px;font-weight:500">' + esc(a.title) + '</td>'
        + '<td style="padding:12px 16px;color:var(--text-secondary);font-size:0.85rem">' + (a.category_name || '') + '</td>'
        + '<td style="padding:12px 16px">' + statusHtml + '</td>'
        + '<td style="padding:12px 16px;color:var(--text-secondary);font-size:0.85rem"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>' + formatDateShort(a.created_at) + '</td>'
        + '<td style="padding:12px 16px;text-align:right">'
        + '<button class="admin-edit-btn" data-id="' + a.id + '" style="background:rgba(69,123,157,0.2);color:var(--accent);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem;margin-right:6px"><i class="fas fa-pen" style="margin-right:4px"></i></button>'
        + '<button class="admin-delete-btn" data-id="' + a.id + '" style="background:rgba(230,57,70,0.2);color:var(--primary);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem"><i class="fas fa-trash-can"></i></button>'
        + '</td></tr>';
    }).join('') + '</tbody></table></div></div></div>';
}

function bindAdminArticles(container, articles, categories) {
  var selected = new Set();
  var editing = null;
  var formContainer = document.getElementById('admin-article-form');
  var form = document.getElementById('admin-article-form-inner');

  function resetArticleForm() {
    ['title', 'slug', 'excerpt', 'content', 'image', 'author'].forEach(function(id) {
      var el = document.getElementById('art-' + id);
      if (el) el.value = '';
    });
    var cat = document.getElementById('art-category');
    if (cat) cat.value = '';
    var sched = document.getElementById('art-scheduled');
    if (sched) sched.value = '';
    var feat = document.getElementById('art-featured');
    if (feat) feat.checked = false;
    var pub = document.getElementById('art-published');
    if (pub) pub.checked = true;
    setImagePickerValue('art-image', '');
  }

  document.getElementById('admin-article-toggle-form').onclick = function() {
    if (formContainer.style.display === 'none') {
      formContainer.style.display = '';
      editing = null;
      resetArticleForm();
      document.getElementById('admin-article-form-title').innerHTML = '<i class="fas fa-plus-circle" style="margin-right:8px"></i>Nouvel article';
      document.getElementById('art-submit-btn').innerHTML = '<i class="fas fa-paper-plane" style="margin-right:6px"></i>Publier';
    } else {
      formContainer.style.display = 'none';
    }
  };

  document.getElementById('art-cancel-btn').onclick = function() { formContainer.style.display = 'none'; resetArticleForm(); };

  initImagePickers(formContainer);

  document.querySelectorAll('.admin-edit-btn').forEach(function(btn) {
    btn.onclick = function() {
      editing = articles.find(function(a) { return a.id == btn.dataset.id; });
      if (!editing) return;
      document.getElementById('art-title').value = editing.title || '';
      document.getElementById('art-slug').value = editing.slug || '';
      document.getElementById('art-excerpt').value = editing.excerpt || '';
      document.getElementById('art-content').value = editing.content || '';
      setImagePickerValue('art-image', editing.image || '');
      document.getElementById('art-category').value = editing.category_slug || '';
      document.getElementById('art-author').value = editing.author || 'Success Media TV';
      document.getElementById('art-scheduled').value = editing.scheduled_for ? editing.scheduled_for.slice(0, 16) : '';
      document.getElementById('art-featured').checked = !!editing.featured;
      document.getElementById('art-published').checked = editing.published !== 0;
      formContainer.style.display = '';
      document.getElementById('admin-article-form-title').innerHTML = '<i class="fas fa-pen" style="margin-right:8px"></i>Modifier article';
      document.getElementById('art-submit-btn').innerHTML = '<i class="fas fa-floppy-disk" style="margin-right:6px"></i>Mettre a jour';
    };
  });

  form.onsubmit = async function(e) {
    e.preventDefault();
    if (imagePickerBusy()) return showToast('Patientez, l\'image est en cours d\'envoi…', 'warning');
    var slug = slugify(document.getElementById('art-slug').value || document.getElementById('art-title').value);
    var payload = {
      title: document.getElementById('art-title').value,
      slug: slug,
      excerpt: document.getElementById('art-excerpt').value,
      content: document.getElementById('art-content').value,
      image: document.getElementById('art-image').value,
      category_slug: document.getElementById('art-category').value,
      author: document.getElementById('art-author').value || 'Success Media TV',
      featured: document.getElementById('art-featured').checked,
      published: document.getElementById('art-published').checked,
      scheduled_for: document.getElementById('art-scheduled').value || null,
    };
    try {
      if (editing) { await API.put('/articles/' + editing.id, payload); showToast('Article mis à jour'); }
      else { await API.post('/articles', payload); showToast('Article créé'); }
      formContainer.style.display = 'none';
      renderAdminArticles(container);
    } catch(err) { showToast(err.error || 'Erreur', 'error'); }
  };

  document.querySelectorAll('.admin-delete-btn').forEach(function(btn) {
    btn.onclick = async function() {
      if (!confirm('Supprimer cet article ?')) return;
      try { await API.delete('/articles/' + btn.dataset.id); showToast('Article supprimé'); renderAdminArticles(container); }
      catch(e) { showToast('Erreur', 'error'); }
    };
  });

  document.getElementById('admin-select-all').onchange = function() {
    document.querySelectorAll('.admin-select-item').forEach(function(cb) { cb.checked = this.checked; }.bind(this));
    updateBulkBar();
  };

  document.querySelectorAll('.admin-select-item').forEach(function(cb) {
    cb.onchange = updateBulkBar;
  });

  function updateBulkBar() {
    selected = new Set(Array.from(document.querySelectorAll('.admin-select-item:checked')).map(function(cb) { return parseInt(cb.value); }));
    var bar = document.getElementById('admin-bulk-bar');
    if (selected.size > 0) {
      bar.style.display = '';
      document.getElementById('admin-bulk-count').innerHTML = '<i class="fas fa-check-square" style="margin-right:6px"></i>' + selected.size + ' selectionne(s)';
    } else bar.style.display = 'none';
  }

  document.getElementById('admin-bulk-cancel').onclick = function() { document.querySelectorAll('.admin-select-item').forEach(function(cb) { cb.checked = false; }); updateBulkBar(); };
  document.getElementById('admin-bulk-publish').onclick = async function() {
    for (var id of selected) { await API.put('/articles/' + id, { published: true }); }
    showToast(selected.size + ' article(s) publies'); renderAdminArticles(container);
  };
  document.getElementById('admin-bulk-delete').onclick = async function() {
    if (!confirm('Supprimer ' + selected.size + ' article(s) ?')) return;
    for (var id of selected) { await API.delete('/articles/' + id); }
    showToast(selected.size + ' article(s) supprimes'); renderAdminArticles(container);
  };
  document.getElementById('admin-export-csv').onclick = function() {
    downloadAdminExport('/export/articles', 'articles.csv');
  };
}

/* ============ ADMIN MANAGER ============ */
function renderAdminManager(container, endpoint, title, fields) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  API.get('/' + endpoint + '?all=1').then(function(r) {
    var items = getData(r);
    var html = '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'
      + '<p style="color:var(--text-secondary);font-size:0.9rem"><i class="fas ' + (endpoint === 'podcasts' ? 'fa-podcast' : endpoint === 'lives' ? 'fa-video' : 'fa-images') + '" style="margin-right:6px"></i>' + items.length + ' element(s)</p>'
      + '<button id="admin-manager-toggle" class="btn btn-primary"><i class="fas fa-plus" style="margin-right:6px"></i>Ajouter ' + title + '</button></div>'
      + '<div id="admin-manager-form" style="display:none;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:25px;margin-bottom:25px">'
      + '<h3 style="margin-bottom:20px;font-weight:700" id="admin-manager-form-title"><i class="fas fa-plus-circle" style="margin-right:8px"></i>Ajouter ' + title + '</h3>'
      + '<form id="admin-manager-form-inner"></form></div>'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">'
      + (items.length === 0
        ? '<div style="padding:60px;text-align:center;color:var(--text-muted)"><i class="fas ' + (endpoint === 'podcasts' ? 'fa-podcast' : endpoint === 'lives' ? 'fa-video' : 'fa-images') + '" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucun élément.</p></div>'
        : '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:500px"><thead><tr style="border-bottom:1px solid var(--border);text-align:left;font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">'
          + '<th style="padding:12px 16px">Titre</th><th style="padding:12px 16px">Date</th><th style="padding:12px 16px;text-align:right">Actions</th></tr></thead><tbody>'
          + items.map(function(item, i) {
            return '<tr style="border-bottom:' + (i < items.length - 1 ? '1px solid var(--border)' : 'none') + '">'
              + '<td style="padding:12px 16px;font-weight:500">' + esc(item.title) + '</td>'
              + '<td style="padding:12px 16px;color:var(--text-secondary);font-size:0.85rem"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>' + formatDateShort(item.created_at) + '</td>'
              + '<td style="padding:12px 16px;text-align:right">'
              + '<button class="admin-mgr-edit" data-item=\'' + escAttr(JSON.stringify(item)) + '\' style="background:rgba(69,123,157,0.2);color:var(--accent);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem;margin-right:6px"><i class="fas fa-pen" style="margin-right:4px"></i></button>'
              + '<button class="admin-mgr-delete" data-id="' + item.id + '" data-endpoint="' + endpoint + '" style="background:rgba(230,57,70,0.2);color:var(--primary);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem"><i class="fas fa-trash-can"></i></button>'
              + '</td></tr>';
          }).join('') + '</tbody></table></div>')
      + '</div></div>';
    container.innerHTML = html;
    bindAdminManager(container, endpoint, title, fields, items);
  }).catch(function() { container.innerHTML = '<p style="color:var(--text-muted)">Erreur</p>'; });
}

function bindAdminManager(container, endpoint, title, fields, items) {
  var editing = null;
  var formContainer = document.getElementById('admin-manager-form');
  var form = document.getElementById('admin-manager-form-inner');

  function buildManagerForm(editData) {
    var html = '';
    var checkboxFields = fields.filter(function(f) { return f.type === 'checkbox'; });
    var otherFields = fields.filter(function(f) { return f.type !== 'checkbox'; });

    otherFields.forEach(function(f) {
      var val = editData ? (editData[f.key] || '') : '';
      html += '<div class="form-group"><label>' + f.label + '</label>';
      if (f.type === 'textarea') html += '<textarea id="mgr-' + f.key + '" rows="3"' + (f.required ? ' required' : '') + '>' + esc(val) + '</textarea>';
      else if (f.type === 'datetime') html += '<input type="datetime-local" id="mgr-' + f.key + '" value="' + (val ? val.slice(0, 16) : '') + '">';
      else if (f.type === 'image') html += imagePickerHTML('mgr-' + f.key, val, f.required);
      else html += '<input id="mgr-' + f.key + '" value="' + esc(val) + '"' + (f.required ? ' required' : '') + '>';
      html += '</div>';
    });

    checkboxFields.forEach(function(f) {
      var checked = editData && editData[f.key] ? 'checked' : '';
      html += '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="mgr-' + f.key + '" ' + checked + '><span style="font-size:0.9rem">' + f.label + '</span></label></div>';
    });

    html += '<div style="display:flex;gap:10px;margin-top:10px">'
      + '<button type="submit" class="btn btn-primary"><i class="fas ' + (editing ? 'fa-floppy-disk' : 'fa-plus') + '" style="margin-right:6px"></i>' + (editing ? 'Mettre à jour' : 'Ajouter') + '</button>'
      + '<button type="button" class="btn btn-outline" id="mgr-cancel"><i class="fas fa-xmark" style="margin-right:6px"></i>Annuler</button></div>';
    form.innerHTML = html;

    /* Bind cancel button */
    var cancelBtn = document.getElementById('mgr-cancel');
    if (cancelBtn) cancelBtn.onclick = function() { formContainer.style.display = 'none'; };

    initImagePickers(form);
  }

  document.getElementById('admin-manager-toggle').onclick = function() {
    if (formContainer.style.display === 'none') {
      editing = null;
      buildManagerForm(null);
      document.getElementById('admin-manager-form-title').innerHTML = '<i class="fas fa-plus-circle" style="margin-right:8px"></i>Ajouter ' + title;
      formContainer.style.display = '';
    } else formContainer.style.display = 'none';
  };

  form.onsubmit = async function(e) {
    e.preventDefault();
    if (imagePickerBusy()) return showToast('Patientez, l\'image est en cours d\'envoi…', 'warning');
    if (missingRequiredImage(form)) return showToast('Ajoutez une image avant d\'enregistrer.', 'warning');
    var payload = {};
    fields.forEach(function(f) {
      var el = document.getElementById('mgr-' + f.key);
      if (el) payload[f.key] = f.type === 'checkbox' ? el.checked : el.value;
    });
    try {
      if (editing) { await API.put('/' + endpoint + '/' + editing.id, payload); showToast(title + ' mis' + (title === 'Image' ? 'e' : '') + ' à jour'); }
      else { await API.post('/' + endpoint, payload); showToast(title + ' ajouté' + (title === 'Image' ? 'e' : '')); }
      formContainer.style.display = 'none';
      renderAdminManager(container, endpoint, title, fields);
    } catch(err) { showToast(err.error || 'Erreur', 'error'); }
  };

  document.querySelectorAll('.admin-mgr-edit').forEach(function(btn) {
    btn.onclick = function() {
      editing = JSON.parse(btn.dataset.item);
      buildManagerForm(editing);
      document.getElementById('admin-manager-form-title').innerHTML = '<i class="fas fa-pen" style="margin-right:8px"></i>Modifier ' + title;
      formContainer.style.display = '';
    };
  });

  document.querySelectorAll('.admin-mgr-delete').forEach(function(btn) {
    btn.onclick = async function() {
      if (!confirm('Supprimer ?')) return;
      try { await API.delete('/' + btn.dataset.endpoint + '/' + btn.dataset.id); showToast(title + ' supprimé' + (title === 'Image' ? 'e' : '')); renderAdminManager(container, endpoint, title, fields); }
      catch(e) { showToast('Erreur', 'error'); }
    };
  });
}

/* ============ ADMIN CATEGORIES ============ */
async function renderAdminCategories(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var r = await API.get('/categories');
    var categories = r.data || r || [];
    var html = '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'
      + '<p style="color:var(--text-secondary);font-size:0.9rem"><i class="fas fa-tags" style="margin-right:6px"></i>' + categories.length + ' categorie(s)</p></div>'
      + '<div class="category-manager"><input id="cat-new-name" placeholder="Nouvelle catégorie..." style="padding:8px 14px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:0.9rem;flex:1;max-width:300px">'
      + '<button id="cat-add-btn" class="btn btn-primary" style="padding:8px 18px;font-size:0.85rem"><i class="fas fa-plus" style="margin-right:4px"></i>Ajouter</button></div>'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">'
      + (categories.length === 0
        ? '<div style="padding:40px;text-align:center;color:var(--text-muted)"><p>Aucune catégorie</p></div>'
        : '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;padding:16px">'
          + categories.map(function(c) {
            return '<div class="category-chip" style="justify-content:space-between">'
              + '<span class="cat-name-' + c.id + '">' + esc(c.name) + '</span>'
              + '<input class="cat-edit-' + c.id + '" style="display:none;background:var(--bg-dark);border:1px solid var(--primary);border-radius:4px;padding:4px 8px;color:var(--text-primary);font-size:0.85rem;flex:1" value="' + esc(c.name) + '">'
              + '<div style="display:flex;gap:4px">'
              + '<button class="cat-edit-start" data-id="' + c.id + '"><i class="fas fa-pen"></i></button>'
              + '<button class="cat-edit-save" data-id="' + c.id + '" style="display:none;color:#10b981"><i class="fas fa-check"></i></button>'
              + '<button class="cat-edit-cancel" data-id="' + c.id + '" style="display:none;color:var(--text-muted)"><i class="fas fa-xmark"></i></button>'
              + '<button class="cat-delete" data-id="' + c.id + '" style="color:var(--primary)"><i class="fas fa-trash-can"></i></button></div></div>';
          }).join('') + '</div>')
      + '</div></div>';
    container.innerHTML = html;
    bindAdminCategories(container);
  } catch(e) { container.innerHTML = '<p style="color:var(--text-muted)">Erreur</p>'; }
}

function bindAdminCategories(container) {
  document.getElementById('cat-add-btn').onclick = async function() {
    var name = document.getElementById('cat-new-name').value.trim();
    if (!name) return;
    try { await API.post('/categories', { name: name }); showToast('Catégorie ajoutée'); renderAdminCategories(container); }
    catch(err) { showToast(err.error || 'Erreur', 'error'); }
  };
  document.getElementById('cat-new-name').onkeydown = function(e) { if (e.key === 'Enter') document.getElementById('cat-add-btn').click(); };

  document.querySelectorAll('.cat-edit-start').forEach(function(btn) {
    btn.onclick = function() {
      var id = btn.dataset.id;
      document.querySelector('.cat-name-' + id).style.display = 'none';
      document.querySelector('.cat-edit-' + id).style.display = '';
      btn.style.display = 'none';
      document.querySelector('.cat-edit-save[data-id="' + id + '"]').style.display = '';
      document.querySelector('.cat-edit-cancel[data-id="' + id + '"]').style.display = '';
      document.querySelector('.cat-delete[data-id="' + id + '"]').style.display = 'none';
      document.querySelector('.cat-edit-' + id).focus();
    };
  });

  document.querySelectorAll('.cat-edit-save').forEach(function(btn) {
    btn.onclick = async function() {
      var id = btn.dataset.id;
      var name = document.querySelector('.cat-edit-' + id).value.trim();
      if (!name) return;
      try { await API.put('/categories/' + id, { name: name }); showToast('Catégorie modifiee'); renderAdminCategories(container); }
      catch(err) { showToast(err.error || 'Erreur', 'error'); }
    };
  });

  document.querySelectorAll('.cat-edit-cancel').forEach(function(btn) {
    btn.onclick = function() {
      var id = btn.dataset.id;
      document.querySelector('.cat-name-' + id).style.display = '';
      document.querySelector('.cat-edit-' + id).style.display = 'none';
      document.querySelector('.cat-edit-start[data-id="' + id + '"]').style.display = '';
      btn.style.display = 'none';
      document.querySelector('.cat-edit-save[data-id="' + id + '"]').style.display = 'none';
      document.querySelector('.cat-delete[data-id="' + id + '"]').style.display = '';
    };
  });

  document.querySelectorAll('.cat-delete').forEach(function(btn) {
    btn.onclick = async function() {
      if (!confirm('Supprimer cette catégorie ?')) return;
      try { await API.delete('/categories/' + btn.dataset.id); showToast('Catégorie supprimée'); renderAdminCategories(container); }
      catch(err) { showToast('Erreur', 'error'); }
    };
  });
}

/* ============ ADMIN IMAGE PICKER ============ */
/* One image field, three ways to fill it: upload from the device, paste a link, or pick from the media library.
   The chosen URL is kept in a hidden input with the given id, so forms read it with getElementById(id).value. */
var IMAGE_UPLOAD_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
var IMAGE_UPLOAD_MAX = 10 * 1024 * 1024;
var IMAGE_MAX_WIDTH = 1600;

function isLocalImage(url) {
  return /^(\.\/|\/)?images\//.test(String(url || ''));
}

function imagePickerHTML(id, value, required) {
  var mode = value && !isLocalImage(value) ? 'url' : 'upload';
  function tab(m, icon, label) {
    return '<button type="button" class="img-picker-tab' + (m === mode ? ' is-active' : '') + '" data-mode="' + m + '" aria-pressed="' + (m === mode) + '">'
      + '<i class="fas ' + icon + '"></i> ' + label + '</button>';
  }
  return '<div class="img-picker" data-picker="' + id + '"' + (required ? ' data-required="1"' : '') + '>'
    + '<div class="img-picker-tabs">'
    + tab('upload', 'fa-upload', 'Depuis l\'appareil') + tab('url', 'fa-link', 'Par lien') + tab('library', 'fa-folder-open', 'Médiathèque')
    + '</div>'
    + '<div class="img-picker-pane" data-pane="upload"' + (mode === 'upload' ? '' : ' hidden') + '>'
    + '<label class="img-picker-drop"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden>'
    + '<i class="fas fa-cloud-arrow-up"></i><strong>Cliquez ou glissez une image ici</strong>'
    + '<small>JPG, PNG, WebP ou GIF — 10 Mo maximum. Les grandes photos sont optimisées automatiquement.</small></label>'
    + '</div>'
    + '<div class="img-picker-pane" data-pane="url"' + (mode === 'url' ? '' : ' hidden') + '>'
    + '<input type="url" class="img-picker-url" placeholder="https://exemple.com/photo.jpg" value="' + escAttr(mode === 'url' ? value : '') + '">'
    + '</div>'
    + '<div class="img-picker-pane" data-pane="library" hidden><div class="img-picker-library"></div></div>'
    + '<p class="img-picker-status" role="status"></p>'
    + '<div class="img-picker-preview"' + (value ? '' : ' hidden') + '>'
    + '<img src="' + escAttr(safeUrl(value, '')) + '" alt="Aperçu de l\'image">'
    + '<button type="button" class="img-picker-remove" title="Retirer l\'image" aria-label="Retirer l\'image"><i class="fas fa-xmark"></i></button>'
    + '</div>'
    + '<input type="hidden" id="' + id + '" value="' + escAttr(value || '') + '">'
    + '</div>';
}

function setImagePickerValue(id, url) {
  var picker = document.querySelector('.img-picker[data-picker="' + id + '"]');
  var hidden = document.getElementById(id);
  if (!picker || !hidden) return;
  url = url || '';
  hidden.value = url;
  var preview = picker.querySelector('.img-picker-preview');
  preview.hidden = !url;
  if (url) preview.querySelector('img').src = safeUrl(url, '');
  var urlInput = picker.querySelector('.img-picker-url');
  if (urlInput && document.activeElement !== urlInput) urlInput.value = url && !isLocalImage(url) ? url : '';
}

/* True while a picker is still uploading (forms wait before saving) */
function imagePickerBusy() {
  return !!document.querySelector('.img-picker.is-busy');
}

/* Required pickers that are still empty */
function missingRequiredImage(root) {
  return Array.prototype.some.call((root || document).querySelectorAll('.img-picker[data-required]'), function(p) {
    return !document.getElementById(p.dataset.picker).value;
  });
}

/* Large photos (phones…) are resized to 1600 px wide and saved as WebP before upload */
function optimizeImage(file) {
  if (file.type === 'image/gif' || !window.createImageBitmap) return Promise.resolve(file);
  return createImageBitmap(file).then(function(bitmap) {
    if (bitmap.width <= IMAGE_MAX_WIDTH && file.size <= 1.5 * 1024 * 1024) return file;
    var scale = Math.min(1, IMAGE_MAX_WIDTH / bitmap.width);
    var canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return new Promise(function(resolve) {
      canvas.toBlob(function(blob) {
        if (!blob || blob.size >= file.size) return resolve(file);
        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' }));
      }, 'image/webp', 0.85);
    });
  }).catch(function() { return file; });
}

function initImagePickers(root) {
  (root || document).querySelectorAll('.img-picker:not(.is-ready)').forEach(function(picker) {
    picker.classList.add('is-ready');
    var id = picker.dataset.picker;
    var status = picker.querySelector('.img-picker-status');
    var fileInput = picker.querySelector('input[type=file]');
    var drop = picker.querySelector('.img-picker-drop');
    var urlInput = picker.querySelector('.img-picker-url');
    var library = picker.querySelector('.img-picker-library');

    function say(text, isError) {
      status.textContent = text || '';
      status.classList.toggle('is-error', !!isError);
    }

    function showMode(mode) {
      picker.querySelectorAll('.img-picker-tab').forEach(function(t) {
        var active = t.dataset.mode === mode;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-pressed', String(active));
      });
      picker.querySelectorAll('.img-picker-pane').forEach(function(p) { p.hidden = p.dataset.pane !== mode; });
      say('');
      if (mode === 'library') loadLibrary();
      if (mode === 'url') urlInput.focus();
    }

    async function upload(file) {
      if (!file) return;
      if (IMAGE_UPLOAD_TYPES.indexOf(file.type) < 0) return say('Format non accepté : choisissez une image JPG, PNG, WebP ou GIF.', true);
      if (file.size > IMAGE_UPLOAD_MAX) return say('Image trop lourde (10 Mo maximum).', true);
      picker.classList.add('is-busy');
      say('Préparation de l\'image…');
      try {
        var ready = await optimizeImage(file);
        say('Envoi en cours…');
        var formData = new FormData();
        formData.append('file', ready);
        var res = await API.upload('/upload', formData);
        if (!res || !res.url) throw { error: 'Envoi impossible' };
        setImagePickerValue(id, res.url);
        say('Image envoyée et enregistrée dans la médiathèque (' + Math.round(ready.size / 1024) + ' Ko).');
      } catch (err) {
        say((err && err.error) || 'Envoi impossible, réessayez.', true);
      } finally {
        picker.classList.remove('is-busy');
        fileInput.value = '';
      }
    }

    async function loadLibrary() {
      library.innerHTML = '<p class="img-picker-empty">Chargement…</p>';
      try {
        var r = await API.get('/upload');
        var files = (r && Array.isArray(r.data) ? r.data : []).filter(function(f) { return safeUrl(f.url, ''); });
        if (!files.length) {
          library.innerHTML = '<p class="img-picker-empty">Aucune image dans la médiathèque pour l\'instant.</p>';
          return;
        }
        library.innerHTML = files.map(function(f) {
          return '<button type="button" class="img-picker-thumb" data-url="' + escAttr(f.url) + '" title="' + escAttr(f.original_name || f.filename) + '">'
            + '<img src="' + escAttr(safeUrl(f.url, '')) + '" alt="" loading="lazy"></button>';
        }).join('');
        library.querySelectorAll('.img-picker-thumb').forEach(function(b) {
          b.onclick = function() {
            setImagePickerValue(id, b.dataset.url);
            library.querySelectorAll('.img-picker-thumb').forEach(function(x) { x.classList.toggle('is-selected', x === b); });
            say('Image choisie dans la médiathèque.');
          };
        });
      } catch (e) {
        library.innerHTML = '<p class="img-picker-empty">Médiathèque indisponible.</p>';
      }
    }

    picker.querySelectorAll('.img-picker-tab').forEach(function(t) { t.onclick = function() { showMode(t.dataset.mode); }; });
    fileInput.onchange = function() { upload(fileInput.files[0]); };
    ['dragenter', 'dragover'].forEach(function(ev) {
      drop.addEventListener(ev, function(e) { e.preventDefault(); drop.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function(ev) {
      drop.addEventListener(ev, function(e) { e.preventDefault(); drop.classList.remove('is-over'); });
    });
    drop.addEventListener('drop', function(e) { upload(e.dataTransfer.files[0]); });
    urlInput.oninput = function() {
      var value = urlInput.value.trim();
      if (value && !/^https?:\/\//i.test(value)) return say('Le lien doit commencer par https://', true);
      say(value ? 'Pensez à vérifier que vous avez le droit d\'utiliser cette image.' : '');
      setImagePickerValue(id, value);
    };
    picker.querySelector('.img-picker-remove').onclick = function() { setImagePickerValue(id, ''); say(''); };
  });
}

/* ============ ADMIN MEDIA ============ */
async function renderAdminMedia(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var r = await API.get('/upload');
    var files = Array.isArray(r.data) ? r.data : [];
    function mediaUrl(file) {
      return safeUrl(file.url, '');
    }
    function absoluteMediaUrl(file) {
      var url = mediaUrl(file);
      return url && url.charAt(0) === '/' ? window.location.origin + url : url;
    }
    var html = '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'
      + '<p style="color:var(--text-secondary);font-size:0.9rem"><i class="fas fa-folder-open" style="margin-right:6px"></i>' + files.length + ' fichier(s)</p>'
      + '<button id="media-upload-btn" class="btn btn-primary"><i class="fas fa-upload" style="margin-right:6px"></i>Uploader</button>'
      + '<input type="file" id="media-file-input" multiple accept="image/*" style="display:none"></div>'
      + (files.length === 0
        ? '<div style="padding:60px;text-align:center;color:var(--text-muted)"><i class="fas fa-folder-open" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucun fichier.</p></div>'
        : '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px">'
          + files.map(function(f) {
            return '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden">'
              + '<div style="aspect-ratio:1;background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;overflow:hidden">'
              + '<img src="' + escAttr(mediaUrl(f)) + '" alt="' + escAttr(f.filename) + '" style="width:100%;height:100%;object-fit:cover"></div>'
              + '<div style="padding:10px"><div style="font-size:0.75rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:6px">' + esc(f.filename) + '</div>'
              + '<div style="display:flex;gap:4px">'
              + '<button class="media-copy-url" data-url="' + escAttr(absoluteMediaUrl(f)) + '" style="background:rgba(69,123,157,0.2);color:var(--accent);border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem;flex:1"><i class="fas fa-copy" style="margin-right:4px"></i>URL</button>'
              + '<button class="media-delete" data-filename="' + escAttr(f.filename) + '" style="background:rgba(230,57,70,0.2);color:var(--primary);border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem"><i class="fas fa-trash-can"></i></button></div></div></div>';
          }).join('') + '</div>')
      + '</div>';
    container.innerHTML = html;

    document.getElementById('media-upload-btn').onclick = function() { document.getElementById('media-file-input').click(); };
    document.getElementById('media-file-input').onchange = async function() {
      var files = this.files;
      if (!files.length) return;
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) formData.append('files', files[i]);
      var btn = document.getElementById('media-upload-btn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:6px"></i>Upload...';
      try { await API.upload('/upload/multiple', formData); renderAdminMedia(container); }
      catch(e) { alert('Erreur upload'); }
    };

    document.querySelectorAll('.media-copy-url').forEach(function(btn) {
      btn.onclick = function() { navigator.clipboard.writeText(btn.dataset.url); showToast('URL copiee !'); };
    });

    document.querySelectorAll('.media-delete').forEach(function(btn) {
      btn.onclick = async function() {
        if (!confirm('Supprimer ?')) return;
        try { await API.delete('/upload/' + btn.dataset.filename); renderAdminMedia(container); }
        catch(e) { showToast('Erreur', 'error'); }
      };
    });
  } catch(e) { container.innerHTML = '<p style="color:var(--text-muted)">Erreur</p>'; }
}

/* ============ ADMIN MESSAGES ============ */
async function renderAdminMessages(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var r = await API.get('/contact');
    var messages = Array.isArray(r.data) ? r.data : [];
    var html = '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'
      + '<p style="color:var(--text-secondary);font-size:0.9rem"><i class="fas fa-envelope" style="margin-right:6px"></i>' + messages.length + ' message(s)</p>'
      + '<div style="display:flex;gap:8px">'
      + '<button class="admin-export-msgs" data-type="messages" class="btn btn-outline" style="font-size:0.85rem"><i class="fas fa-download" style="margin-right:6px"></i>Messages CSV</button>'
      + '<button class="admin-export-msgs" data-type="newsletter" class="btn btn-outline" style="font-size:0.85rem"><i class="fas fa-envelope-open-text" style="margin-right:6px"></i>Abonnés CSV</button></div></div>'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">'
      + (messages.length === 0
        ? '<div style="padding:60px;text-align:center;color:var(--text-muted)"><i class="fas fa-envelope-open-text" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucun message recu.</p></div>'
        : messages.map(function(m, i) {
          return '<div style="padding:16px;border-bottom:' + (i < messages.length - 1 ? '1px solid var(--border)' : 'none') + '">'
            + '<div style="display:flex;justify-content:space-between;margin-bottom:6px">'
            + '<strong style="font-size:0.95rem"><i class="fas fa-user" style="margin-right:6px;color:var(--accent)"></i>' + esc(m.name) + '</strong>'
            + '<span style="font-size:0.8rem;color:var(--text-muted)"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>' + formatDateShort(m.created_at) + '</span></div>'
            + '<div style="font-size:0.85rem;color:var(--accent);margin-bottom:6px"><i class="fas fa-reply" style="margin-right:4px"></i>' + esc(m.email) + '</div>'
            + (m.subject ? '<div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px"><i class="fas fa-tag" style="margin-right:4px"></i><strong>Sujet :</strong> ' + esc(m.subject) + '</div>' : '')
            + '<div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.6">' + esc(m.message) + '</div></div>';
        }).join(''))
      + '</div></div>';
    container.innerHTML = html;

    document.querySelectorAll('.admin-export-msgs').forEach(function(btn) {
      btn.onclick = function() {
        downloadAdminExport('/export/' + btn.dataset.type, btn.dataset.type + '.csv');
      };
    });
  } catch(e) { container.innerHTML = '<p style="color:var(--text-muted)">Erreur</p>'; }
}

/* ============ RADIO PLAYER ============ */
async function loadRadioStream() {
  try {
    var r = await API.get('/radio/stream');
    var d = r && r.data ? r.data : r;
    if (d && d.stream_url) state.radioStreamUrl = d.stream_url;
    // The radio button only shows when a stream is configured
    document.body.classList.toggle('has-radio', !!state.radioStreamUrl);
  } catch(e) { /* silent fail */ }
}

function toggleRadio() {
  var bar = document.getElementById('radio-player-bar');
  if (!bar) return;
  var isOpen = bar.classList.toggle('open');
  state.radioPlaying = isOpen;
  if (isOpen) {
    loadRadioStream().then(function() {
      var audio = document.getElementById('radio-audio');
      var playBtn = document.getElementById('radio-play-btn');
      if (audio && state.radioStreamUrl) {
        audio.src = state.radioStreamUrl;
        audio.play().then(function() {
          if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
          var status = document.getElementById('radio-status');
          if (status) status.textContent = 'En direct';
        }).catch(function() {
          var status = document.getElementById('radio-status');
          if (status) status.textContent = 'Indisponible';
          state.radioPlaying = false;
        });
      } else {
        var status = document.getElementById('radio-status');
        if (status) status.textContent = 'Aucun flux';
      }
    });
  } else {
    var audio = document.getElementById('radio-audio');
    if (audio) { audio.pause(); audio.src = ''; }
    var playBtn = document.getElementById('radio-play-btn');
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    var status = document.getElementById('radio-status');
    if (status) status.textContent = 'Arrêtée';
  }
}

function bindRadioEvents() {
  var radioBtn = document.getElementById('radio-toggle-btn');
  if (radioBtn) radioBtn.onclick = function(e) { e.preventDefault(); toggleRadio(); };

  var playBtn = document.getElementById('radio-play-btn');
  if (playBtn) playBtn.onclick = function() {
    var audio = document.getElementById('radio-audio');
    if (!audio || !audio.src) return;
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      var status = document.getElementById('radio-status');
      if (status) status.textContent = 'En direct';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      var status = document.getElementById('radio-status');
      if (status) status.textContent = 'En pause';
    }
  };

  var closeBtn = document.getElementById('radio-close-btn');
  if (closeBtn) closeBtn.onclick = function() { toggleRadio(); };
}

/* ============ MOTION ============ */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Home hero carousel: the progress bar of the active dot drives the timing
   (its CSS animation pauses on hover/focus, and its end moves to the next slide) */
function initHeroSlider() {
  var hero = document.getElementById('home-hero');
  if (!hero) return;
  var slides = hero.querySelectorAll('.hx-slide');
  var dots = hero.querySelectorAll('.hx-dot');
  if (slides.length < 2) return;
  var index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function(s, k) {
      var active = k === index;
      s.classList.toggle('is-active', active);
      if (active) { s.removeAttribute('aria-hidden'); s.removeAttribute('inert'); }
      else { s.setAttribute('aria-hidden', 'true'); s.setAttribute('inert', ''); }
    });
    dots.forEach(function(d, k) {
      d.classList.remove('is-active');
      d.removeAttribute('aria-current');
      if (k === index) {
        void d.offsetWidth; // restart the progress animation
        d.classList.add('is-active');
        d.setAttribute('aria-current', 'true');
      }
    });
  }

  dots.forEach(function(d, k) {
    d.onclick = function() { show(k); };
    d.querySelector('.hx-dot-bar').addEventListener('animationend', function() {
      if (d.classList.contains('is-active')) show(index + 1);
    });
  });
  hero.addEventListener('mouseenter', function() { hero.classList.add('is-paused'); });
  hero.addEventListener('mouseleave', function() { hero.classList.remove('is-paused'); });
  hero.addEventListener('focusin', function() { hero.classList.add('is-paused'); });
  hero.addEventListener('focusout', function() { hero.classList.remove('is-paused'); });

  // Swipe on touch screens
  var startX = null;
  hero.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function(e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

/* Reveal on scroll: blocks fade up when they enter the viewport */
var REVEAL_SELECTOR = '.hx-card, .hx-panel, .hx-rub-card, .cat-section, .article-card, .sidebar-widget, .sidebar-card, .cta-banner, .live-card, .podcast-card, .gallery-item, .about-card, .page-header';
var revealObserver = null;

function initReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  function scan(root) {
    if (!root.querySelectorAll) return;
    var found = root.matches && root.matches(REVEAL_SELECTOR) ? [root] : [];
    found = found.concat(Array.prototype.slice.call(root.querySelectorAll(REVEAL_SELECTOR)));
    found.forEach(function(el) {
      if (el.classList.contains('reveal')) return;
      // Small stagger between siblings of the same kind
      var i = 0, prev = el.previousElementSibling;
      while (prev && i < 5) { if (prev.classList.contains('reveal')) i++; prev = prev.previousElementSibling; }
      el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  scan(document.body);
  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) { m.addedNodes.forEach(function(n) { if (n.nodeType === 1) scan(n); }); });
  }).observe(document.body, { childList: true, subtree: true });
}

/* Header gets a shadow once the page is scrolled */
function initHeaderShadow() {
  var onScroll = function() {
    var header = document.getElementById('main-header');
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initRouter();
  loadRadioStream();
  initReveal();
  initHeaderShadow();
});


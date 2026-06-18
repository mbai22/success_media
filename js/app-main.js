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
    + '<a href="#/" class="logo"><img src="./logo.png" alt="Success Media TV" style="height:40px;width:auto"></a>'
    + '<nav class="nav" id="main-nav">'
    + '<div class="nav-item"><a href="#/" class="nav-link" data-path="/">Accueil</a></div>'
    + '<div class="nav-item"><a href="#" class="nav-link dropdown-toggle" data-path="/blog">Actualites <i class="fas fa-chevron-down dropdown-arrow"></i></a>'
    + '<div class="mega-dropdown"><div class="mega-dropdown-grid">'
    + '<div class="mega-dropdown-col"><h4>Societe</h4><a href="#/blog?category=societe">Education</a><a href="#/blog?category=societe">Environnement</a><a href="#/blog?category=societe">Evenements</a><a href="#/blog?category=societe">Histoire</a><a href="#/blog?category=societe">Religions</a></div>'
    + '<div class="mega-dropdown-col"><h4>Culture</h4><a href="#/blog?category=culture">Diaspora</a><a href="#/blog?category=culture">Cinema</a><a href="#/blog?category=culture">Livres</a><h4 style="margin-top:16px">Sport</h4><a href="#/blog?category=sport">Football</a><a href="#/blog?category=sport">Basketball</a></div>'
    + '<div class="mega-dropdown-col"><h4>Politique</h4><a href="#/blog?category=politique">Nationale</a><a href="#/blog?category=politique">Internationale</a><h4 style="margin-top:16px">Economie</h4><a href="#/blog?category=economie">Finance</a><a href="#/blog?category=economie">Entreprenariat</a></div>'
    + '</div></div></div>'
    + '<div class="nav-item"><a href="#/lives" class="nav-link" data-path="/lives">Lives/Emissions</a></div>'
    + '<div class="nav-item"><a href="#/podcasts" class="nav-link" data-path="/podcasts">Podcasts</a></div>'
    + '<div class="nav-item"><a href="#/galerie" class="nav-link" data-path="/galerie">Galerie</a></div>'
    + '<div class="nav-item"><a href="#/a-propos" class="nav-link" data-path="/a-propos">A propos</a></div>'
    + '<div class="nav-actions">'
    + '<a href="#/lives" class="live-btn live-btn-tv"><span class="live-dot-sm"></span> Direct TV</a>'
    + '<a href="#/lives" class="live-btn live-btn-radio"><i class="fas fa-microphone" style="font-size:0.75rem"></i> Radio</a>'
    + '<button id="search-open-btn" class="nav-search-btn" title="Rechercher"><i class="fas fa-search"></i></button>'
    + '</div></nav>'
    + '<div class="nav-right-mobile">'
    + '<button class="nav-search-btn" id="search-open-btn-mobile" title="Rechercher"><i class="fas fa-search"></i></button>'
    + '<div class="hamburger-lines" id="hamburger-btn"><span class="line line1"></span><span class="line line2"></span><span class="line line3"></span></div></div></div>'
    + '<div class="mobile-overlay" id="mobile-overlay"></div>'
    + '<div class="mobile-menu" id="mobile-menu">'
    + '<div class="mobile-menu-header"><img src="./logo.png" alt="Success Media TV" class="mobile-menu-logo"><button class="mobile-menu-close" id="mobile-menu-close" aria-label="Fermer le menu"><i class="fas fa-times"></i></button></div>'
    + '<div class="mobile-menu-body"><div class="mobile-menu-links">'
    + '<a href="#/" class="nav-link-mobile" data-path="/"><i class="fas fa-home nav-icon"></i>Accueil</a>'
    + '<a href="#/blog" class="nav-link-mobile" data-path="/blog"><i class="fas fa-newspaper nav-icon"></i>Actualites</a>'
    + '<div class="mobile-menu-divider"></div>'
    + '<a href="#/blog?category=societe" class="nav-link-mobile"><i class="fas fa-users nav-icon"></i>Societe</a>'
    + '<a href="#/blog?category=culture" class="nav-link-mobile"><i class="fas fa-palette nav-icon"></i>Culture</a>'
    + '<a href="#/blog?category=politique" class="nav-link-mobile"><i class="fas fa-landmark nav-icon"></i>Politique</a>'
    + '<a href="#/blog?category=economie" class="nav-link-mobile"><i class="fas fa-chart-line nav-icon"></i>Economie</a>'
    + '<a href="#/blog?category=sport" class="nav-link-mobile"><i class="fas fa-medal nav-icon"></i>Sport</a>'
    + '<a href="#/blog?category=sante" class="nav-link-mobile"><i class="fas fa-heart-pulse nav-icon"></i>Sante</a>'
    + '<a href="#/blog?category=technologie" class="nav-link-mobile"><i class="fas fa-microchip nav-icon"></i>Technologie</a>'
    + '<div class="mobile-menu-divider"></div>'
    + '<a href="#/lives" class="nav-link-mobile" data-path="/lives"><i class="fas fa-video nav-icon"></i>Lives/Emissions</a>'
    + '<a href="#/podcasts" class="nav-link-mobile" data-path="/podcasts"><i class="fas fa-podcast nav-icon"></i>Podcasts</a>'
    + '<a href="#/galerie" class="nav-link-mobile" data-path="/galerie"><i class="fas fa-images nav-icon"></i>Galerie</a>'
    + '<a href="#/a-propos" class="nav-link-mobile" data-path="/a-propos"><i class="fas fa-info-circle nav-icon"></i>A propos</a>'
    + '<div class="mobile-menu-divider"></div>'
    + '<div class="mobile-menu-social"><a href="https://web.facebook.com/profile.php?id=100085107969362" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a><a href="#" class="social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a><a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a><a href="#" class="social-link" aria-label="TikTok"><i class="fab fa-tiktok"></i></a></div>'
    + '</div></div></div></header>'
    + '<main class="page-transition" id="main-content"></main>'
    + '<footer class="footer-enhanced" id="main-footer"><div class="container">'
    + '<div id="footer-newsletter"></div>'
    + '<div class="footer-grid">'
    + '<div class="footer-col footer-col-brand"><a href="#/" class="footer-logo"><img src="./logo.png" alt="Success Media TV"></a>'
    + '<p>Le Micro pour transformer. Success Media TV est un media tchadien base a Sarh, dedie a la production de contenus audiovisuels de qualite.</p>'
    + '<div class="footer-social">'
    + '<a href="https://web.facebook.com/profile.php?id=100085107969362" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>'
    + '<a href="#" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>'
    + '<a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>'
    + '<a href="#" class="social-link" title="TikTok"><i class="fab fa-tiktok"></i></a></div></div>'
    + '<div class="footer-col"><h4>Actualites</h4>'
    + '<a href="#/blog?category=societe">Societe</a><a href="#/blog?category=politique">Politique</a><a href="#/blog?category=economie">Economie</a><a href="#/blog?category=culture">Culture</a><a href="#/blog?category=sport">Sport</a><a href="#/blog?category=technologie">Technologie</a><a href="#/blog?category=sante">Sante</a></div>'
    + '<div class="footer-col"><h4>Media</h4>'
    + '<a href="#/lives">Lives & Emissions</a><a href="#/lives?filter=live">En Direct</a><a href="#/lives?filter=replay">Replays</a><a href="#/podcasts">Podcasts</a><a href="#/galerie">Galerie</a></div>'
    + '<div class="footer-col"><h4>Liens</h4>'
    + '<a href="#/a-propos">A propos</a><a href="#/a-propos">Contact</a><a href="#/blog">Actualites</a><a href="#/">Accueil</a></div>'
    + '<div class="footer-col"><h4>Contact</h4>'
    + '<span class="footer-contact-item"><i class="fas fa-phone"></i>+235 66 57 65 85</span>'
    + '<span class="footer-contact-item"><i class="fas fa-envelope"></i>ndgroupmedia89@gmail.com</span>'
    + '<span class="footer-contact-item"><i class="fas fa-location-dot"></i>Sarh, Tchad</span>'
    + '</div></div>'
    + '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + ' Success Media TV. Tous droits reserves.</span>'
    + '<span>Le business en temps reel</span>'
    + '<span>conception MBAIHORNOM Willifred</span></div></div></footer>'
    + '<div id="search-modal-container"></div>'
    + '<div id="video-modal-container"></div>'
    + '<div id="lightbox-container"></div>'
    + '<div id="toast-container" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:380px"></div></div>';

  document.getElementById('footer-newsletter').innerHTML = NewsletterForm();
  document.getElementById('search-modal-container').innerHTML = SearchModal();
  document.getElementById('video-modal-container').innerHTML = VideoPlayerModal(state.playingLive);
  const mainContent = document.getElementById('main-content');

  switch (state.route) {
    case 'home': mainContent.innerHTML = renderHome(); loadHome(); break;
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
  const pathMap = { home: '', lives: '/lives', podcasts: '/podcasts', blog: '/blog', article: '/article', gallery: '/galerie', about: '/a-propos' };
  const path = pathMap[state.route] || '';
  document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(function(a) {
    a.classList.toggle('active', a.dataset.path === path);
  });
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
        return '<a href="#/article/' + a.slug + '" class="trending-item">'
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
function bindEvents() {
  /* Mobile menu toggle */
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileOverlay = document.getElementById('mobile-overlay');
  function toggleMenu(open) {
    var isOpen = open !== undefined ? open : !state.menuOpen;
    state.menuOpen = isOpen;
    if (hamburgerBtn) hamburgerBtn.classList.toggle('open', isOpen);
    if (mobileMenu) mobileMenu.classList.toggle('open', isOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('open', isOpen);
  }
  if (hamburgerBtn) hamburgerBtn.onclick = function() { toggleMenu(); };
  if (mobileOverlay) mobileOverlay.onclick = function() { toggleMenu(false); };
  var mobileCloseBtn = document.getElementById('mobile-menu-close');
  if (mobileCloseBtn) mobileCloseBtn.onclick = function() { toggleMenu(false); };
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

  /* Poll */
  document.querySelectorAll('.poll-option').forEach(function(btn) {
    btn.onclick = function() {
      if (state.pollVoted) return;
      var id = parseInt(btn.dataset.pollId);
      var opt = POLL_DATA.options.find(function(o) { return o.id === id; });
      if (opt) opt.votes++;
      state.pollVoted = true;
      localStorage.setItem('pollVoted', 'true');
      var w = document.getElementById('poll-widget');
      if (w) w.innerHTML = '<h3><i class="fas fa-chart-bar" style="margin-right:8px;color:var(--primary)"></i> Sondage</h3>' + renderPoll();
      showToast('Vote enregistre !');
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
    btn.onclick = function(e) { e.preventDefault(); navigator.clipboard.writeText(window.location.href); showToast('Lien copie !'); };
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
      navigate(cat ? '/blog?category=' + cat : '/blog');
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
    params.set('page', page);
    navigate('/blog?' + params.toString());
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
        return '<a href="#/article/' + a.slug + '" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (a.image ? '<img src="' + a.image + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(a.title) + '</div><span class="search-result-meta">' + (a.category_name || 'Article') + '</span></div></a>';
      }).join('');
      html += '</div>';
    }
    if (data?.podcasts?.length) {
      html += '<div class="search-result-group"><h4><i class="fas fa-podcast"></i> Podcasts (' + data.podcasts.length + ')</h4>';
      html += data.podcasts.map(function(p) {
        return '<a href="#/podcasts" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (p.image ? '<img src="' + p.image + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(p.title) + '</div><span class="search-result-meta">Podcast</span></div></a>';
      }).join('');
      html += '</div>';
    }
    if (data?.lives?.length) {
      html += '<div class="search-result-group"><h4><i class="fas fa-video"></i> Emissions (' + data.lives.length + ')</h4>';
      html += data.lives.map(function(l) {
        return '<a href="#/lives" class="search-result-item" onclick="state.searchOpen=false;setTimeout(render,10)">'
          + (l.image ? '<img src="' + l.image + '" alt="">' : '')
          + '<div><div class="search-result-title">' + esc(l.title) + '</div><span class="search-result-meta">Emission</span></div></a>';
      }).join('');
      html += '</div>';
    }

    if (!html) {
      html = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:0.3"></i><p>Aucun resultat pour "' + query + '"</p></div>';
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
    if (msgEl) { msgEl.style.display = ''; msgEl.style.color = 'var(--accent-light)'; msgEl.textContent = 'Inscrit avec succes !'; }
    form.style.display = 'none';
  } catch(e) {
    if (msgEl) { msgEl.style.display = ''; msgEl.style.color = 'var(--primary)'; msgEl.textContent = 'Erreur, reessayez'; }
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
  } catch(err) {
    if (errorEl) { errorEl.style.display = ''; errorEl.textContent = 'Erreur lors de l\'envoi'; }
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
    if (errorEl) { errorEl.style.display = ''; errorEl.textContent = 'Erreur lors de l\'envoi. Reessayez.'; }
  }
}

/* ============ LIGHTBOX ============ */
var lightboxKeyHandler = null;
function renderLightbox() {
  var container = document.getElementById('lightbox-container');
  if (!state.lightboxItem) { container.innerHTML = ''; return; }
  var item = state.lightboxItem;
  var filtered = (state.galleryItems || []).filter(function(i) { return state.galleryCat === 'all' || i.category === state.galleryCat; });
  container.innerHTML = '<div class="lightbox" id="lightbox">'
    + '<button class="lightbox-close" id="lightbox-close"><i class="fas fa-xmark"></i></button>'
    + (filtered.length > 1
      ? '<button class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></button>'
        + '<button class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></button>'
      : '')
    + '<img src="' + esc(item.image || './images/placeholder.svg') + '" alt="' + esc(item.title) + '">'
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

/* ============ HOME ============ */
async function loadHome() {
  try {
    var results = await Promise.all([
      API.get('/articles?featured=1'),
      API.get('/articles?limit=3'),
      API.get('/articles?category=societe&limit=3'),
      API.get('/articles?category=culture&limit=3'),
      API.get('/articles?category=economie&limit=3'),
      API.get('/lives?limit=3'),
      API.get('/podcasts?limit=4'),
      API.get('/stats'),
      API.get('/lives/current'),
    ]);
    var featured = getData(results[0]);
    var latest = getData(results[1]);
    var societe = getData(results[2]);
    var culture = getData(results[3]);
    var economie = getData(results[4]);
    var lives = getData(results[5]);
    var podcasts = getData(results[6]);
    var stats = results[7] || {};
    var liveNow = results[8];

    var heroHtml = '';
    if (featured.length > 0) {
      heroHtml = '<section class="hero-carousel-wrapper"><div class="container">' + renderHeroCarousel(featured) + '</div></section>';
    } else {
      heroHtml = '<section class="hero-section">'
        + '<div class="hero-bg"><div class="hero-bg-shape hero-bg-shape-1"></div><div class="hero-bg-shape hero-bg-shape-2"></div></div>'
        + '<div class="container"><div class="hero-content-center">'
        + '<div class="hero-badge"><span class="live-dot"></span>' + (liveNow ? 'En direct' : 'Base a Sarh, Tchad') + '</div>'
        + '<h1>Le Micro <span class="text-accent">pour transformer</span></h1>'
        + '<p>Success Media TV, votre media tchadien. Lives, emissions, podcasts, motivation et opportunites pour tous.</p>'
        + '<div class="hero-actions">'
        + '<a href="#/lives" class="btn btn-primary btn-lg"><i class="fas fa-play"></i> Voir les lives</a>'
        + '<a href="#/podcasts" class="btn btn-outline btn-lg"><i class="fas fa-podcast"></i> Nos podcasts</a>'
        + '<a href="#/a-propos" class="btn btn-ghost"><i class="fas fa-info-circle"></i> En savoir plus</a>'
        + '</div></div></div></section>';
    }

    var statsHtml = '<section class="stats-section"><div class="container"><div class="stats-grid">'
      + '<div class="stat-card"><div class="stat-icon stat-icon-articles"><i class="fas fa-newspaper"></i></div><div class="stat-number">' + (stats.articles || 0) + '</div><div class="stat-label">Articles</div></div>'
      + '<div class="stat-card"><div class="stat-icon stat-icon-lives"><i class="fas fa-video"></i></div><div class="stat-number">' + (stats.lives || 0) + '</div><div class="stat-label">Emissions</div></div>'
      + '<div class="stat-card"><div class="stat-icon stat-icon-podcasts"><i class="fas fa-podcast"></i></div><div class="stat-number">' + (stats.podcasts || 0) + '</div><div class="stat-label">Podcasts</div></div>'
      + '<div class="stat-card"><div class="stat-icon stat-icon-gallery"><i class="fas fa-images"></i></div><div class="stat-number">' + (stats.gallery || 0) + '</div><div class="stat-label">Medias</div></div>'
      + '</div></div></section>';

    var html = heroHtml + statsHtml;

    /* Latest */
    if (latest.length) {
      html += '<section class="section"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:var(--primary)"></span> Dernieres actualites</h2>'
        + '<a href="#/blog" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="article-grid">' + latest.map(function(a) { return ArticleCard(a); }).join('') + '</div></div></div></section>';
    }

    /* Societe */
    if (societe.length) {
      html += '<section class="section section-alt-bg"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:#e63946"></span> Societe</h2>'
        + '<a href="#/blog?category=societe" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="article-grid">' + societe.map(function(a) { return ArticleCard(a); }).join('') + '</div></div></div></section>';
    }

    /* Culture */
    if (culture.length) {
      html += '<section class="section"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:#8b5cf6"></span> Culture</h2>'
        + '<a href="#/blog?category=culture" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="article-grid">' + culture.map(function(a) { return ArticleCard(a); }).join('') + '</div></div></div></section>';
    }

    /* Economie */
    if (economie.length) {
      html += '<section class="section section-alt-bg"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:#f59e0b"></span> Economie</h2>'
        + '<a href="#/blog?category=economie" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="article-grid">' + economie.map(function(a) { return ArticleCard(a); }).join('') + '</div></div></div></section>';
    }

    /* Lives */
    if (lives.length) {
      html += '<section class="section"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:var(--primary)"></span> Emissions & Lives</h2>'
        + '<a href="#/lives" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="live-grid">' + lives.map(function(l) { return LiveCard(l); }).join('') + '</div></div></div></section>';
    }

    /* Podcasts */
    if (podcasts.length) {
      html += '<section class="section section-alt-bg"><div class="container"><div class="cat-section">'
        + '<div class="cat-section-header"><h2><span class="cat-dot" style="background:#0ea5e9"></span> Podcasts</h2>'
        + '<a href="#/podcasts" class="voir-plus">Voir tout <i class="fas fa-arrow-right"></i></a></div>'
        + '<div class="podcast-grid">' + podcasts.map(function(p) { return PodcastCard(p); }).join('') + '</div></div></div></section>';
    }

    var ctaHtml = '<section class="cta-banner"><div class="container"><div class="cta-content">'
      + '<h2>Suivez Success Media TV</h2>'
      + '<p>Restez connecte pour ne rien manquer</p>'
      + '<div class="cta-links">'
      + '<a href="https://web.facebook.com/profile.php?id=100085107969362" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fab fa-facebook-f"></i> Facebook</a>'
      + '<a href="#" class="btn btn-outline"><i class="fab fa-youtube"></i> YouTube</a>'
      + '<a href="#/a-propos" class="btn btn-primary"><i class="fas fa-envelope"></i> Nous contacter</a>'
      + '</div></div></div></section>';

    document.getElementById('page-home').innerHTML = html + ctaHtml;
  } catch(e) {
    var el = document.getElementById('page-home');
    if (el) el.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
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
      + '<a href="#/article/' + a.slug + '" class="btn btn-primary"><i class="fas fa-book-open" style="margin-right:6px"></i>Lire la suite</a>'
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
async function loadLives() {
  var container = document.querySelector('.lives-content');
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  try {
    var r = await API.get('/lives?page=' + state.livesPage + '&per_page=12');
    var d = r.data || r;
    state.livesData = getData(d);
    state.livesTotal = d.total || 0;
    renderLivesList();
  } catch(e) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><p>Erreur de chargement</p></div>';
  }
}

function renderLivesList() {
  var container = document.querySelector('.lives-content');
  if (!container) return;
  var filtered = state.liveFilter === 'all'
    ? (state.livesData || [])
    : (state.livesData || []).filter(function(l) { return state.liveFilter === 'live' ? l.is_live : !l.is_live; });

  if (!filtered.length) {
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-video" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucune emission pour le moment.</p></div>';
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
    container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-podcast" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>' + (search ? 'Aucun resultat.' : 'Aucun podcast pour le moment.') + '</p></div>';
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
        + (Array.isArray(categories) ? categories : []).map(function(c) {
          return '<button class="filter-btn' + (catFilter === c.slug ? ' active' : '') + '" data-category="' + c.slug + '"><i class="fas fa-tag"></i> ' + c.name + '</button>';
        }).join('');
    }

    var container = document.querySelector('.blog-articles-content');
    if (!container) return;

    if (!articles.length) {
      container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)"><i class="fas fa-newspaper" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucun article pour le moment.</p></div>';
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
          return '<a href="#/article/' + a.slug + '" class="sidebar-link"><i class="fas fa-file-lines" style="margin-right:8px;color:var(--text-muted);font-size:0.8rem"></i>' + esc(a.title) + '</a>';
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
  if (!container) return;

  try {
    var r = await API.get('/articles/' + slug);
    var article = r.data || r;
    setPageMeta(article.title, article.excerpt || article.content ? article.content.substring(0, 160) : '');
    var related = [];
    if (article.category_id) {
      try {
        var relRes = await API.get('/articles?category=' + article.category_slug + '&limit=3');
        var relData = getData(relRes);
        related = relData.filter(function(a) { return a.id !== article.id; }).slice(0, 3);
      } catch(e) {}
    }

    var date = formatDate(article.created_at);
    var rt = readingTime(article.content);

    var html = '<div class="article-page">'
      + '<div class="article-header fade-in">'
      + (article.category_name ? '<a href="#/blog?category=' + article.category_slug + '" class="article-card-category">' + esc(article.category_name) + '</a>' : '')
      + '<h1>' + esc(article.title) + '</h1>'
      + '<div class="article-meta">'
      + '<span><i class="fas fa-user-pen" style="margin-right:6px"></i>' + esc(article.author) + '</span><span> - </span>'
      + '<span><i class="fas fa-calendar-alt" style="margin-right:6px"></i>' + date + '</span><span> - </span>'
      + '<span style="display:inline-flex;align-items:center;gap:6px"><i class="fas fa-clock" style="font-size:0.8rem"></i>' + rt + ' min de lecture</span>'
      + '</div></div>'
      + (article.image ? '<img src="' + esc(article.image) + '" alt="' + esc(article.title) + '" class="article-featured-image fade-in">' : '')
      + '<div class="article-content fade-in">' + (article.content || '').split('\n').map(function(p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>'
      + ShareButtons(article.title)
      + '<div style="text-align:center;margin:40px 0"><a href="#/blog" class="btn btn-outline"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Retour au blog</a></div>';

    if (related.length > 0) {
      html += '<div class="related-articles"><h3><i class="fas fa-link" style="margin-right:8px;color:var(--primary)"></i> Articles similaires</h3>'
        + '<div class="article-grid">' + related.map(function(a) {
          return '<a href="#/article/' + a.slug + '" class="article-card">'
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
      + '<h2>Article non trouve</h2>'
      + '<a href="#/blog" class="btn btn-primary" style="margin-top:20px"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Retour au blog</a></div>';
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
  document.querySelectorAll('.admin-nav-btn').forEach(function(btn) {
    btn.onclick = function() {
      state.adminSection = btn.dataset.section;
      document.querySelectorAll('.admin-nav-btn').forEach(function(b) {
        var isActive = b.dataset.section === state.adminSection;
        b.classList.toggle('active', isActive);
        b.style.background = isActive ? 'rgba(230,57,70,0.15)' : 'transparent';
        b.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)';
        b.style.fontWeight = isActive ? '600' : '400';
      });
      var titleEl = document.getElementById('admin-section-title');
      var span = btn.querySelector('span');
      if (titleEl && span) titleEl.textContent = span.textContent;
      loadAdminSection();
    };
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
    case 'lives': renderAdminManager(container, 'lives', 'Emission', [
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
    var results = await Promise.all([API.get('/stats'), API.get('/articles?limit=5')]);
    var stats = results[0].data || results[0];
    var recentArticles = getData(results[1]);

    var cards = [
      { label: 'Articles', value: stats.articles || 0, color: '#f6a122', icon: 'fa-newspaper' },
      { label: 'Podcasts', value: stats.podcasts || 0, color: '#457b9d', icon: 'fa-podcast' },
      { label: 'Emissions', value: stats.lives || 0, color: '#2a9d8f', icon: 'fa-video' },
      { label: 'Mediatheque', value: stats.gallery || 0, color: '#e9c46a', icon: 'fa-images' },
      { label: 'Messages', value: stats.messages || 0, color: '#8b5cf6', icon: 'fa-envelope' },
      { label: 'Abonnes', value: stats.subscribers || 0, color: '#06b6d4', icon: 'fa-envelope-open-text' },
    ];

    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:30px">'
      + cards.map(function(c) {
        return '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px">'
          + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">'
          + '<i class="fas ' + c.icon + '" style="font-size:1.5rem;color:' + c.color + '"></i>'
          + '<span style="font-size:1.8rem;font-weight:800;color:' + c.color + '">' + c.value + '</span></div>'
          + '<div style="font-size:0.9rem;color:var(--text-secondary)">' + c.label + '</div>'
          + '<div style="margin-top:12px;height:3px;border-radius:2px;background:var(--border);overflow:hidden">'
          + '<div style="width:' + Math.min(100, c.value * 10) + '%;height:100%;background:' + c.color + ';border-radius:2px"></div></div></div>';
      }).join('')
      + '</div>';

    if (stats.commentsPending > 0) {
      html += '<div style="background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:var(--radius);padding:12px 20px;margin-bottom:20px;display:flex;align-items:center;gap:12px">'
        + '<i class="fas fa-comment-dots" style="color:var(--primary);font-size:1.2rem"></i>'
        + '<span style="font-size:0.9rem"><strong>' + stats.commentsPending + '</strong> commentaire(s) en attente de moderation</span></div>';
    }

    html += '<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px">'
      + '<h3 style="font-size:1rem;font-weight:700;margin-bottom:15px"><i class="fas fa-clock" style="margin-right:8px;color:var(--accent)"></i>Derniers articles</h3>'
      + (recentArticles.length === 0
        ? '<p style="color:var(--text-muted);font-size:0.9rem">Aucun article publiÃ©</p>'
        : recentArticles.map(function(a, i) {
          return '<div style="display:flex;align-items:center;gap:12px;padding:10px 0;' + (i < recentArticles.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">'
            + '<div style="width:40px;height:40px;border-radius:var(--radius-sm);background:var(--bg-elevated);overflow:hidden;flex-shrink:0">'
            + (a.image ? '<img src="' + a.image + '" alt="" style="width:100%;height:100%;object-fit:cover">' : '') + '</div>'
            + '<div style="flex:1;min-width:0"><div style="font-size:0.9rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(a.title) + '</div>'
            + '<div style="font-size:0.75rem;color:var(--text-muted)"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>' + formatDateShort(a.created_at) + '</div></div></div>';
        }).join(''))
      + '</div>'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px">'
      + '<h3 style="font-size:1rem;font-weight:700;margin-bottom:15px"><i class="fas fa-chart-pie" style="margin-right:8px;color:var(--accent)"></i>Articles par categorie</h3>'
      + (stats.articlesByCategory?.length
        ? '<div style="display:flex;flex-direction:column;gap:8px">'
          + stats.articlesByCategory.map(function(cat) {
            var max = Math.max.apply(Math, stats.articlesByCategory.map(function(c) { return c.count; }));
            return '<div><div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:4px"><span>' + esc(cat.name) + '</span><span style="color:var(--text-muted)">' + cat.count + '</span></div>'
              + '<div style="height:4px;border-radius:2px;background:var(--border);overflow:hidden"><div style="width:' + Math.min(100, (cat.count / max) * 100) + '%;height:100%;background:var(--gradient-1);border-radius:2px"></div></div></div>';
          }).join('')
          + '</div>'
        : '<p style="color:var(--text-muted);font-size:0.9rem">Aucune donnee</p>')
      + '</div></div>';

    container.innerHTML = html;
  } catch(e) {
    container.innerHTML = '<p style="color:var(--text-muted)">Erreur de chargement</p>';
  }
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
    + '<div class="form-group"><label><i class="fas fa-image" style="margin-right:6px"></i>Image (URL)</label><input id="art-image" placeholder="https://..."><img id="art-image-preview" style="display:none;width:100%;margin-top:8px;border-radius:var(--radius-sm);max-height:120px;object-fit:cover"></div>'
    + '<div class="form-group"><label><i class="fas fa-tag" style="margin-right:6px"></i>Categorie</label><select id="art-category"><option value="">-- Sans categorie --</option>'
    + categories.map(function(c) { return '<option value="' + c.slug + '">' + c.name + '</option>'; }).join('') + '</select></div>'
    + '<div class="form-group"><label><i class="fas fa-user-pen" style="margin-right:6px"></i>Auteur</label><input id="art-author" value="Success Media TV"></div>'
    + '<div class="form-group"><label><i class="fas fa-calendar-clock" style="margin-right:6px"></i>Programmer</label><input type="datetime-local" id="art-scheduled"></div>'
    + '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">'
    + '<label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="art-featured"><span style="font-size:0.9rem"><i class="fas fa-star" style="margin-right:4px;color:var(--text-muted)"></i>A la une</span></label>'
    + '<label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="art-published" checked><span style="font-size:0.9rem"><i class="fas fa-globe" style="margin-right:4px"></i>Publie</span></label></div></div></div>'
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
    + '<th style="padding:12px 16px">Titre</th><th style="padding:12px 16px">Categorie</th><th style="padding:12px 16px">Statut</th>'
    + '<th style="padding:12px 16px">Date</th><th style="padding:12px 16px;text-align:right">Actions</th></tr></thead><tbody>'
    + articles.map(function(a, i) {
      var statusHtml = '';
      if (a.scheduled_for && new Date(a.scheduled_for) > new Date()) {
        statusHtml = '<span style="background:rgba(245,158,11,0.2);color:#f59e0b;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600"><i class="fas fa-clock" style="margin-right:4px"></i>Programme</span>';
      } else if (a.featured) {
        statusHtml = '<span style="background:rgba(233,196,106,0.2);color:#e9c46a;padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600"><i class="fas fa-star" style="margin-right:4px"></i>A la une</span>';
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
    var prev = document.getElementById('art-image-preview');
    if (prev) prev.style.display = 'none';
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

  document.getElementById('art-image').oninput = function() {
    var prev = document.getElementById('art-image-preview');
    if (this.value) { prev.src = this.value; prev.style.display = ''; }
    else prev.style.display = 'none';
  };

  document.querySelectorAll('.admin-edit-btn').forEach(function(btn) {
    btn.onclick = function() {
      editing = articles.find(function(a) { return a.id == btn.dataset.id; });
      if (!editing) return;
      document.getElementById('art-title').value = editing.title || '';
      document.getElementById('art-slug').value = editing.slug || '';
      document.getElementById('art-excerpt').value = editing.excerpt || '';
      document.getElementById('art-content').value = editing.content || '';
      document.getElementById('art-image').value = editing.image || '';
      document.getElementById('art-category').value = editing.category_slug || '';
      document.getElementById('art-author').value = editing.author || 'Success Media TV';
      document.getElementById('art-scheduled').value = editing.scheduled_for ? editing.scheduled_for.slice(0, 16) : '';
      document.getElementById('art-featured').checked = !!editing.featured;
      document.getElementById('art-published').checked = editing.published !== 0;
      var prev = document.getElementById('art-image-preview');
      if (editing.image) { prev.src = editing.image; prev.style.display = ''; }
      formContainer.style.display = '';
      document.getElementById('admin-article-form-title').innerHTML = '<i class="fas fa-pen" style="margin-right:8px"></i>Modifier article';
      document.getElementById('art-submit-btn').innerHTML = '<i class="fas fa-floppy-disk" style="margin-right:6px"></i>Mettre a jour';
    };
  });

  form.onsubmit = async function(e) {
    e.preventDefault();
    var slug = document.getElementById('art-slug').value || document.getElementById('art-title').value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
      if (editing) { await API.put('/articles/' + editing.id, payload); showToast('Article mis a jour'); }
      else { await API.post('/articles', payload); showToast('Article cree'); }
      formContainer.style.display = 'none';
      renderAdminArticles(container);
    } catch(err) { showToast(err.error || 'Erreur', 'error'); }
  };

  document.querySelectorAll('.admin-delete-btn').forEach(function(btn) {
    btn.onclick = async function() {
      if (!confirm('Supprimer cet article ?')) return;
      try { await API.delete('/articles/' + btn.dataset.id); showToast('Article supprime'); renderAdminArticles(container); }
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
    var token = localStorage.getItem('token');
    window.open('/api/export/articles?token=' + token, '_blank');
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
        ? '<div style="padding:60px;text-align:center;color:var(--text-muted)"><i class="fas ' + (endpoint === 'podcasts' ? 'fa-podcast' : endpoint === 'lives' ? 'fa-video' : 'fa-images') + '" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucun element.</p></div>'
        : '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:500px"><thead><tr style="border-bottom:1px solid var(--border);text-align:left;font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">'
          + '<th style="padding:12px 16px">Titre</th><th style="padding:12px 16px">Date</th><th style="padding:12px 16px;text-align:right">Actions</th></tr></thead><tbody>'
          + items.map(function(item, i) {
            return '<tr style="border-bottom:' + (i < items.length - 1 ? '1px solid var(--border)' : 'none') + '">'
              + '<td style="padding:12px 16px;font-weight:500">' + esc(item.title) + '</td>'
              + '<td style="padding:12px 16px;color:var(--text-secondary);font-size:0.85rem"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>' + formatDateShort(item.created_at) + '</td>'
              + '<td style="padding:12px 16px;text-align:right">'
              + '<button class="admin-mgr-edit" data-item=\'' + esc(JSON.stringify(item)) + '\' style="background:rgba(69,123,157,0.2);color:var(--accent);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem;margin-right:6px"><i class="fas fa-pen" style="margin-right:4px"></i></button>'
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
      else if (f.type === 'image') html += '<input id="mgr-' + f.key + '" value="' + esc(val) + '" placeholder="https://..."' + (f.required ? ' required' : '') + '><img id="mgr-' + f.key + '-preview" style="display:' + (val ? '' : 'none') + ';width:100%;margin-top:8px;border-radius:var(--radius-sm);max-height:100px;object-fit:cover" src="' + esc(val) + '">';
      else html += '<input id="mgr-' + f.key + '" value="' + esc(val) + '"' + (f.required ? ' required' : '') + '>';
      html += '</div>';
    });

    checkboxFields.forEach(function(f) {
      var checked = editData && editData[f.key] ? 'checked' : '';
      html += '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="mgr-' + f.key + '" ' + checked + '><span style="font-size:0.9rem">' + f.label + '</span></label></div>';
    });

    html += '<div style="display:flex;gap:10px;margin-top:10px">'
      + '<button type="submit" class="btn btn-primary"><i class="fas ' + (editing ? 'fa-floppy-disk' : 'fa-plus') + '" style="margin-right:6px"></i>' + (editing ? 'Mettre a jour' : 'Ajouter') + '</button>'
      + '<button type="button" class="btn btn-outline" id="mgr-cancel"><i class="fas fa-xmark" style="margin-right:6px"></i>Annuler</button></div>';
    form.innerHTML = html;

    /* Bind cancel button */
    var cancelBtn = document.getElementById('mgr-cancel');
    if (cancelBtn) cancelBtn.onclick = function() { formContainer.style.display = 'none'; };

    fields.filter(function(f) { return f.type === 'image'; }).forEach(function(f) {
      var input = document.getElementById('mgr-' + f.key);
      if (input) input.oninput = function() {
        var preview = document.getElementById('mgr-' + f.key + '-preview');
        if (preview) { preview.src = this.value; preview.style.display = this.value ? '' : 'none'; }
      };
    });
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
    var payload = {};
    fields.forEach(function(f) {
      var el = document.getElementById('mgr-' + f.key);
      if (el) payload[f.key] = f.type === 'checkbox' ? el.checked : el.value;
    });
    try {
      if (editing) { await API.put('/' + endpoint + '/' + editing.id, payload); showToast(title + ' mis a jour'); }
      else { await API.post('/' + endpoint, payload); showToast(title + ' ajoute'); }
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
      try { await API.delete('/' + btn.dataset.endpoint + '/' + btn.dataset.id); showToast(title + ' supprime'); renderAdminManager(container, endpoint, title, fields); }
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
      + '<div class="category-manager"><input id="cat-new-name" placeholder="Nouvelle categorie..." style="padding:8px 14px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:0.9rem;flex:1;max-width:300px">'
      + '<button id="cat-add-btn" class="btn btn-primary" style="padding:8px 18px;font-size:0.85rem"><i class="fas fa-plus" style="margin-right:4px"></i>Ajouter</button></div>'
      + '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">'
      + (categories.length === 0
        ? '<div style="padding:40px;text-align:center;color:var(--text-muted)"><p>Aucune categorie</p></div>'
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
    try { await API.post('/categories', { name: name }); showToast('Categorie ajoutee'); renderAdminCategories(container); }
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
      try { await API.put('/categories/' + id, { name: name }); showToast('Categorie modifiee'); renderAdminCategories(container); }
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
      if (!confirm('Supprimer cette categorie ?')) return;
      try { await API.delete('/categories/' + btn.dataset.id); showToast('Categorie supprimee'); renderAdminCategories(container); }
      catch(err) { showToast('Erreur', 'error'); }
    };
  });
}

/* ============ ADMIN MEDIA ============ */
async function renderAdminMedia(container) {
  container.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--primary)"></i></div>';
  try {
    var r = await API.get('/upload');
    var files = Array.isArray(r.data) ? r.data : [];
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
              + '<img src="http://localhost:5000' + f.url + '" alt="' + f.filename + '" style="width:100%;height:100%;object-fit:cover"></div>'
              + '<div style="padding:10px"><div style="font-size:0.75rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:6px">' + esc(f.filename) + '</div>'
              + '<div style="display:flex;gap:4px">'
              + '<button class="media-copy-url" data-url="' + f.url + '" style="background:rgba(69,123,157,0.2);color:var(--accent);border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem;flex:1"><i class="fas fa-copy" style="margin-right:4px"></i>URL</button>'
              + '<button class="media-delete" data-filename="' + f.filename + '" style="background:rgba(230,57,70,0.2);color:var(--primary);border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem"><i class="fas fa-trash-can"></i></button></div></div></div>';
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
      btn.onclick = function() { navigator.clipboard.writeText('http://localhost:5000' + btn.dataset.url); showToast('URL copiee !'); };
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
      + '<button class="admin-export-msgs" data-type="newsletter" class="btn btn-outline" style="font-size:0.85rem"><i class="fas fa-envelope-open-text" style="margin-right:6px"></i>Abonnes CSV</button></div></div>'
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
        var token = localStorage.getItem('token');
        window.open('/api/export/' + btn.dataset.type + '?token=' + token, '_blank');
      };
    });
  } catch(e) { container.innerHTML = '<p style="color:var(--text-muted)">Erreur</p>'; }
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initRouter();
});


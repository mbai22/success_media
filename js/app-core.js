/* ============ STATE ============ */
const state = {
  route: '', params: {}, searchParams: new URLSearchParams(),
  menuOpen: false, searchOpen: false, liveNow: false,
  theme: 'light',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  livesPage: 1, liveFilter: 'all', livesData: [], livesTotal: 0,
  podcastsPage: 1, podcastSearch: '', podcastsData: [], podcastsTotal: 0,
  galleryPage: 1, galleryCat: 'all', galleryItems: [], lightboxItem: null, lightboxIndex: -1,
  playingLive: null, adminSection: 'dashboard',
  radioPlaying: false, radioStreamUrl: '',
  pollVoted: localStorage.getItem('pollVoted') || false,
};

/* ============ THEME ============ */
function initTheme() {
  localStorage.removeItem('theme');
  document.documentElement.setAttribute('data-theme', 'light');
}

/* ============ TOAST ============ */
function showToast(message, type = 'success', duration = 4000) {
  const id = Date.now();
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.id = `toast-${id}`;
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle' };
  toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i> ${message}
    <button onclick="document.getElementById('toast-${id}').remove()" style="margin-left:auto;background:none;border:none;color:white;cursor:pointer;opacity:0.7;padding:0">
      <i class="fas fa-xmark"></i>
    </button>`;
  Object.assign(toast.style, {
    padding: '14px 20px', borderRadius: 'var(--radius-sm)',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b',
    color: 'white', fontSize: '0.9rem', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: 10,
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
    animation: 'slideInRight 0.3s ease',
  });
  container.appendChild(toast);
  setTimeout(() => {
    const t = document.getElementById(`toast-${id}`);
    if (t) t.remove();
  }, duration);
}

/* ============ HELPERS ============ */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

function readingTime(content) {
  const words = (content || '').split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

function excerpt(text, len) {
  if (!text) return '';
  return text.length > (len || 120) ? text.substring(0, (len || 120)) + '...' : text;
}

function getData(arr) {
  if (Array.isArray(arr)) return arr;
  if (arr && arr.data && Array.isArray(arr.data)) return arr.data;
  return [];
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function debounce(fn, ms) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), ms);
  };
}

/* ============ ROUTER ============ */
function parseHash() {
  let hash = window.location.hash.replace('#', '') || '/';
  if (!hash.startsWith('/')) hash = '/' + hash;
  const hashPath = hash.split('?')[0];
  const parts = hashPath.split('/').filter(Boolean);
  const params = {};
  let route = '';

  if (parts[0] === 'admin') {
    route = parts[1] === 'login' ? 'admin-login' : 'admin';
  } else if (parts[0] === 'article' && parts[1]) {
    route = 'article';
    params.slug = parts[1];
  } else if (parts[0] === 'lives') route = 'lives';
  else if (parts[0] === 'podcasts') route = 'podcasts';
  else if (parts[0] === 'blog') route = 'blog';
  else if (parts[0] === 'galerie') route = 'gallery';
  else if (parts[0] === 'a-propos') route = 'about';
  else route = 'home';

  state.route = route;
  state.params = params;
  state.searchParams = new URLSearchParams(hash.split('?')[1] || '');
}

function navigate(path) {
  window.location.hash = path;
}

function initRouter() {
  parseHash();
  render();
  window.addEventListener('hashchange', function() {
    state.menuOpen = false;
    parseHash();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============ SEO ============ */
function setPageMeta(title, description) {
  document.title = title + ' — Success Media TV';
  var desc = description || 'Success Media TV est un media tchadien base a Sarh, dedie a la production de contenus audiovisuels de qualite.';
  var el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement('meta');
    el.name = 'description';
    document.head.appendChild(el);
  }
  el.content = desc;
}

/* ============ COMPONENTS ============ */
function ArticleCard(article, featured) {
  if (featured) {
    return '<div class="featured-article">'
      + '<img src="' + esc(article.image || './images/placeholder.svg') + '" alt="' + esc(article.title) + '" class="featured-article-image" loading="lazy">'
      + '<div class="featured-article-body">'
      + (article.category_name ? '<span class="article-card-category">' + esc(article.category_name) + '</span>' : '')
      + '<h2>' + esc(article.title) + '</h2>'
      + '<p>' + esc(article.excerpt || (article.content || '').substring(0, 200)) + '</p>'
      + '<div class="article-card-footer"><span>' + esc(article.author) + '</span><span>' + formatDate(article.created_at) + '</span></div>'
      + '<a href="#/article/' + esc(article.slug) + '" class="btn btn-primary" style="margin-top:15px;align-self:flex-start">Lire la suite</a>'
      + '</div></div>';
  }
  return '<a href="#/article/' + esc(article.slug) + '" class="article-card">'
    + '<img src="' + esc(article.image || './images/placeholder.svg') + '" alt="' + esc(article.title) + '" class="article-card-image" loading="lazy">'
    + '<div class="article-card-body">'
    + (article.category_name ? '<span class="article-card-category">' + esc(article.category_name) + '</span>' : '')
    + '<h3 class="article-card-title">' + esc(article.title) + '</h3>'
    + '<p class="article-card-excerpt">' + esc(excerpt(article.excerpt || article.content, 120)) + '</p>'
    + '<div class="article-card-footer"><span>' + esc(article.author || '') + '</span><span>' + formatDate(article.created_at) + '</span></div>'
    + '</div></a>';
}

function LiveCard(live) {
  return '<div class="live-card" data-live=\'' + esc(JSON.stringify(live)) + '\'>'
    + '<div class="live-card-preview">'
    + '<img src="' + esc(live.image || './images/placeholder.svg') + '" alt="' + esc(live.title) + '" loading="lazy">'
    + '<div class="live-card-overlay"><span class="play-btn"><i class="fas fa-play"></i></span></div>'
    + (live.is_live
      ? '<span class="live-badge"><span class="live-dot"></span> EN DIRECT</span>'
      : '<span class="live-badge" style="background:var(--bg-card)">REPLAY</span>')
    + '</div>'
    + '<div style="padding:16px">'
    + '<h3>' + esc(live.title) + '</h3>'
    + (live.description ? '<p style="color:var(--text-secondary);font-size:0.85rem;margin-top:6px">' + esc(excerpt(live.description, 100)) + '</p>' : '')
    + '<div style="margin-top:10px;font-size:0.8rem;color:var(--text-muted)"><i class="fas fa-calendar-alt" style="margin-right:4px"></i> ' + formatDate(live.created_at) + '</div>'
    + '</div></div>';
}

function PodcastCard(podcast) {
  return '<div class="podcast-card">'
    + '<img src="' + esc(podcast.image || './images/placeholder.svg') + '" alt="' + esc(podcast.title) + '" class="podcast-card-image" loading="lazy">'
    + '<div class="podcast-card-body">'
    + '<h3>' + esc(podcast.title) + '</h3>'
    + (podcast.description ? '<p>' + esc(excerpt(podcast.description, 100)) + '</p>' : '')
    + '<div class="podcast-card-footer">'
    + ((podcast.audio_url || podcast.video_url)
      ? '<a href="' + esc(podcast.audio_url || podcast.video_url) + '" target="_blank" rel="noopener noreferrer" class="podcast-play-btn" title="Ecouter"><i class="fas fa-play"></i></a>'
      : '')
    + '<span style="font-size:0.8rem;color:var(--text-muted)">' + formatDate(podcast.created_at) + '</span>'
    + '</div></div></div>';
}

function Pagination(page, total, perPage) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return '';
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  if (start > 1) pages.push(1);
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('...');
  if (end < totalPages) pages.push(totalPages);

  return '<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:30px 0">'
    + '<button class="page-btn" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '><i class="fas fa-chevron-left"></i></button>'
    + pages.map(function(p) {
      return p === '...'
        ? '<span style="color:var(--text-muted);padding:0 4px">...</span>'
        : '<button class="page-btn' + (p === page ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }).join('')
    + '<button class="page-btn" data-page="' + (page + 1) + '"' + (page >= totalPages ? ' disabled' : '') + '><i class="fas fa-chevron-right"></i></button>'
    + '</div>';
}

function NewsletterForm(variant) {
  if (variant === 'sidebar') {
    return '<div class="sidebar-card">'
      + '<h3><i class="fas fa-envelope" style="margin-right:6px;color:var(--primary)"></i> Newsletter</h3>'
      + '<div class="newsletter-sidebar-form">'
      + '<form class="newsletter-form-inline" style="display:flex;flex-direction:column;gap:8px">'
      + '<input type="email" class="newsletter-email" placeholder="Votre email" required style="padding:10px 14px;border-radius:6px;border:1px solid var(--border);background:var(--bg-dark);color:var(--text-primary);font-size:0.85rem">'
      + '<button type="submit" class="btn btn-primary" style="padding:10px;font-size:0.85rem;justify-content:center">S\'abonner <i class="fas fa-paper-plane" style="margin-left:6px"></i></button>'
      + '</form><p class="newsletter-msg" style="font-size:0.85rem;display:none"></p></div></div>';
  }
  return '<div class="newsletter-section">'
    + '<div class="newsletter-content">'
    + '<h3><i class="fas fa-envelope-open-text" style="margin-right:8px;color:var(--primary)"></i> Restez informe</h3>'
    + '<p>Recevez les dernieres actualites de Success Media TV directement dans votre boite mail</p>'
    + '</div>'
    + '<div class="newsletter-footer-form">'
    + '<form class="newsletter-form-inline newsletter-form">'
    + '<input type="email" class="newsletter-email" placeholder="Votre adresse email" required>'
    + '<button type="submit" class="btn btn-primary">S\'abonner <i class="fas fa-paper-plane" style="margin-left:6px"></i></button>'
    + '</form><p class="newsletter-msg" style="font-size:0.85rem;margin-top:8px;display:none"></p></div></div>';
}

function Sidebar() {
  return '<aside class="sidebar">'
    + NewsletterForm('sidebar')
    + '<div class="sidebar-card poll-widget" id="poll-widget">'
    + '<h3><i class="fas fa-chart-bar" style="margin-right:8px;color:var(--primary)"></i> Sondage</h3>'
    + renderPoll()
    + '</div>'
    + '<div class="sidebar-card"><h3><i class="fas fa-fire" style="margin-right:8px;color:var(--primary)"></i> Tendances</h3><div class="trending-list" id="trending-list">'
    + '<div style="padding:10px;text-align:center;color:var(--text-muted);font-size:0.85rem"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>'
    + '</div></div>'
    + '<div class="sidebar-card"><h3><i class="fab fa-facebook" style="margin-right:8px;color:#1877f2"></i>Suivez-nous</h3>'
    + '<div class="social-links">'
    + '<a href="https://web.facebook.com/profile.php?id=100085107969362" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>'
    + '<a href="#" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>'
    + '<a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>'
    + '<a href="#" class="social-link" title="TikTok"><i class="fab fa-tiktok"></i></a>'
    + '</div></div>'
    + '<div class="sidebar-card"><h3><i class="fas fa-tags" style="margin-right:8px;color:var(--primary)"></i> Categories</h3><div class="sidebar-categories">'
    + ['Societe', 'Politique', 'Culture', 'Sport', 'Sante', 'Technologie'].map(function(cat) {
      return '<a href="#/blog?category=' + cat.toLowerCase() + '" class="sidebar-link"><i class="fas fa-chevron-right" style="margin-right:8px;font-size:0.7rem;color:var(--text-muted)"></i>' + cat + '</a>';
    }).join('')
    + '</div></div>'
    + '<div class="sidebar-card sidebar-recents" style="display:none"><h3><i class="fas fa-clock" style="margin-right:8px;color:var(--accent)"></i> Recents</h3><div class="sidebar-recents-list"></div></div>'
    + '<div class="sidebar-card"><h3><i class="fas fa-address-card" style="margin-right:8px;color:var(--accent)"></i> Contact</h3>'
    + '<div style="font-size:0.9rem;color:var(--text-secondary);line-height:2">'
    + '<div><i class="fas fa-phone" style="width:20px;margin-right:6px;color:var(--primary)"></i>+235 66 57 65 85</div>'
    + '<div><i class="fas fa-envelope" style="width:20px;margin-right:6px;color:var(--primary)"></i>ndgroupmedia89@gmail.com</div>'
    + '<div><i class="fas fa-location-dot" style="width:20px;margin-right:6px;color:var(--primary)"></i>Sarh, Tchad</div>'
    + '</div></div></aside>';
}

var POLL_DATA = {
  question: 'Que voudriez-vous voir plus souvent sur Success Media TV ?',
  options: [
    { id: 1, label: 'Plus de reportages et emissions', votes: 42 },
    { id: 2, label: 'Plus de podcasts et audio', votes: 28 },
    { id: 3, label: 'Plus d\'actualites sportives et culturelles', votes: 35 },
    { id: 4, label: 'Plus de contenus motivants', votes: 22 },
    { id: 5, label: 'Plus de directs et lives', votes: 31 },
  ],
  totalVotes: function() { return this.options.reduce(function(s, o) { return s + o.votes; }, 0); },
};

function renderPoll() {
  if (state.pollVoted) {
    var total = POLL_DATA.totalVotes();
    return '<div class="poll-results">'
      + '<p style="font-size:0.85rem;margin-bottom:10px;color:var(--text-secondary)"><i class="fas fa-check-circle" style="color:var(--primary);margin-right:6px"></i>Merci pour votre vote !</p>'
      + '<p style="font-size:0.75rem;color:var(--text-muted)">Total: ' + total + ' votes</p></div>';
  }
  return '<div class="poll-options">'
    + '<p style="font-size:0.85rem;margin-bottom:10px;color:var(--text-secondary)">' + POLL_DATA.question + '</p>'
    + POLL_DATA.options.map(function(o) {
      return '<button class="poll-option" data-poll-id="' + o.id + '">' + o.label + '</button>';
    }).join('')
    + '<p class="poll-total">' + POLL_DATA.totalVotes() + ' votes</p></div>';
}

function ShareButtons(title) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent((title || '') + ' - Success Media TV');
  return '<div class="share-buttons">'
    + '<span class="share-label"><i class="fas fa-share-alt" style="margin-right:6px"></i>Partager :</span>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
    + '<a href="https://wa.me/?text=' + shareText + '%20' + shareUrl + '" target="_blank" rel="noopener noreferrer" class="share-btn" style="background:#25d366" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>'
    + '<a href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '&quote=' + shareText + '" target="_blank" rel="noopener noreferrer" class="share-btn" style="background:#1877f2" title="Facebook"><i class="fab fa-facebook-f"></i></a>'
    + '<a href="https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl + '" target="_blank" rel="noopener noreferrer" class="share-btn" style="background:#000" title="Twitter/X"><i class="fab fa-x-twitter"></i></a>'
    + '<a href="https://t.me/share/url?url=' + shareUrl + '&text=' + shareText + '" target="_blank" rel="noopener noreferrer" class="share-btn" style="background:#0088cc" title="Telegram"><i class="fab fa-telegram-plane"></i></a>'
    + '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl + '" target="_blank" rel="noopener noreferrer" class="share-btn" style="background:#0a66c2" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>'
    + '<a href="#" class="share-btn share-copy-link" style="background:var(--accent)" title="Copier le lien"><i class="fas fa-link"></i></a>'
    + '</div></div>';
}

function SearchModal() {
  if (!state.searchOpen) return '';
  return '<div class="modal-overlay" id="search-overlay">'
    + '<div class="search-modal" id="search-modal">'
    + '<div class="search-modal-header">'
    + '<i class="fas fa-search" style="color:var(--text-muted)"></i>'
    + '<input type="text" id="search-input" placeholder="Rechercher articles, podcasts, emissions..." class="search-input" autofocus>'
    + '<button class="search-close-btn" id="search-close"><i class="fas fa-xmark"></i></button>'
    + '</div>'
    + '<div class="search-modal-body" id="search-results">'
    + '<div style="text-align:center;padding:30px;color:var(--text-muted)">'
    + '<i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:0.3"></i>'
    + '<p>Commencez a taper pour rechercher...</p>'
    + '</div></div></div></div>';
}

function CommentsSection(articleId) {
  return '<div class="comments-section" data-article-id="' + articleId + '">'
    + '<h3><i class="fas fa-comments" style="margin-right:8px;color:var(--primary)"></i> Commentaires <span class="comments-count">(0)</span></h3>'
    + '<div class="comments-loading" style="display:none"><div class="loading" style="padding:20px"><div class="spinner"></div></div></div>'
    + '<div class="comments-list"></div>'
    + '<p class="comments-empty" style="color:var(--text-muted);font-size:0.9rem;margin-bottom:20px;display:none">Soyez le premier a commenter !</p>'
    + '<div class="comment-form-wrapper">'
    + '<form class="comment-form">'
    + '<h4><i class="fas fa-pen" style="margin-right:6px"></i>Laisser un commentaire</h4>'
    + '<p class="comment-error" style="color:var(--primary);font-size:0.85rem;margin-bottom:10px;display:none"></p>'
    + '<div style="display:flex;gap:12px">'
    + '<div class="form-group" style="flex:1"><input type="text" class="comment-author" placeholder="Votre nom *" required></div>'
    + '<div class="form-group" style="flex:1"><input type="email" class="comment-email" placeholder="Votre email (optionnel)"></div>'
    + '</div>'
    + '<div class="form-group"><textarea class="comment-content" placeholder="Votre commentaire *" rows="4" required></textarea></div>'
    + '<button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane" style="margin-right:6px"></i>Publier</button>'
    + '</form>'
    + '<div class="comment-success" style="display:none;background:rgba(69,123,157,0.15);padding:16px;border-radius:8px;color:var(--accent-light);font-size:0.9rem">'
    + '<i class="fas fa-check-circle" style="margin-right:6px"></i>Votre commentaire a ete soumis pour moderation.</div></div></div>';
}

function VideoPlayerModal(live) {
  if (!live) return '';
  const url = live.embed_url || live.facebook_url || '';
  let embed = null;
  if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
    const m = url.match(/(?:v=|\/)([\w-]{11})/);
    if (m) embed = { type: 'youtube', id: m[1] };
  } else if (url.includes('facebook.com')) {
    embed = { type: 'facebook', url: url };
  } else if (url) {
    embed = { type: 'direct', url: url };
  }

  let videoHtml = '';
  if (!embed) {
    videoHtml = '<div style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-video" style="font-size:3rem;margin-bottom:15px;opacity:0.3"></i><p>Aucune video disponible</p></div>';
  } else if (embed.type === 'youtube') {
    videoHtml = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + embed.id + '?autoplay=1" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="border:none"></iframe>';
  } else if (embed.type === 'facebook') {
    videoHtml = '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(embed.url) + '&show_text=false&width=734" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" allow="encrypted-media;autoplay" allowfullscreen></iframe>';
  } else if (embed.type === 'direct') {
    videoHtml = '<video controls autoplay style="width:100%;height:100%;background:#000"><source src="' + embed.url + '" type="video/mp4"></video>';
  }

  return '<div class="modal-overlay" id="video-overlay">'
    + '<div class="video-player-modal" id="video-modal">'
    + '<button class="lightbox-close" id="video-close"><i class="fas fa-xmark"></i></button>'
    + '<div class="video-player-container">' + videoHtml + '</div>'
    + '<div class="video-player-info">'
    + '<h3>' + esc(live.title) + '</h3>'
    + (live.description ? '<p>' + esc(live.description) + '</p>' : '')
    + '</div></div></div>';
}


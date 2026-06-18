/* ============ DEMO DATA ============ */
var DEMO = {
  token: null,
  mode: false,

  articles: [
    { id: 1, slug: 'succes-jeunesse-tchadienne', title: 'Le succes au coeur de la jeunesse tchadienne', excerpt: 'Decouvrez comment la jeunesse tchadienne se mobilise pour construire un avenir meilleur a travers l\'entrepreneuriat et l\'innovation.', content: 'Le Tchad regorge de jeunes talents qui, malgre les defis, s\'investissent dans des projets innovants. De N\'Djamena a Sarh, des initiatives locales transforment le quotidien et creent des opportunites. Success Media TV met en lumiere ces parcours inspirants.\n\nChaque jour, des jeunes entrepreneurs lancent des startups, des artistes expriment leur creativite, et des leaders communautaires organisent des projets a impact social. Cette dynamique montre que la jeunesse tchadienne est prete a relever les defis du 21e siecle.\n\nRestez connectes a Success Media TV pour suivre ces histoires inspirantes et bien d\'autres.', author: 'Success Media', category_name: 'Societe', category_slug: 'societe', image: '', created_at: '2026-06-15T10:00:00Z', updated_at: '2026-06-15T10:00:00Z', views: 245 },
    { id: 2, slug: 'culture-sarh-tchad', title: 'La richesse culturelle de Sarh mise en lumiere', excerpt: 'La ville de Sarh, capitale du Moyen-Chari, est un veritable carrefour culturel au coeur du Tchad.', content: 'Sarh, troisieme ville du Tchad, est un melting-pot culturel ou se rencontrent plusieurs ethnies et traditions. Chaque annee, des festivals et evenements culturels animent la cite.\n\nLa musique, la danse et l\'artisanat local sont des trésors que Success Media TV s\'engage a promouvoir aupres d\'un large public.\n\nDecouvrez a travers nos reportages les richesses cachees de cette ville fascinante.', author: 'Success Media', category_name: 'Culture', category_slug: 'culture', image: '', created_at: '2026-06-10T08:30:00Z', updated_at: '2026-06-10T08:30:00Z', views: 189 },
    { id: 3, slug: 'innovation-technologique-tchad', title: 'L\'innovation technologique gagne le Tchad', excerpt: 'Les nouvelles technologies transforment progressivement le paysage economique et social du Tchad.', content: 'L\'essor du numerique au Tchad ouvre de nouvelles perspectives pour la jeunesse. Des centres de formation aux incubateurs de startups, l\'ecosysteme tech se developpe.\n\nLes applications mobiles, les solutions fintech et les plateformes educatives fleurissent, portees par une generation connectee et ambitieuse.\n\nSuccess Media TV vous propose un tour d\'horizon des innovations qui faconnent le Tchad de demain.', author: 'Success Media', category_name: 'Technologie', category_slug: 'technologie', image: '', created_at: '2026-06-05T14:00:00Z', updated_at: '2026-06-05T14:00:00Z', views: 312 },
    { id: 4, slug: 'sport-jeunesse-sarh', title: 'Le sport comme moteur d\'integration a Sarh', excerpt: 'Les initiatives sportives a Sarh offrent aux jeunes une voie d\'epanouissement et de reussite.', content: 'Le sport joue un role essentiel dans l\'integration sociale et le developpement personnel des jeunes a Sarh. Football, basketball, arts martiaux... les disciplines ne manquent pas.\n\nDes associations locales organisent des tournois et des programmes d\'encadrement qui permettent aux jeunes de s\'investir positivement dans leur communaute.\n\nSuccess Media TV met en avant ces initiatives qui font la difference.', author: 'Success Media', category_name: 'Sport', category_slug: 'sport', image: '', created_at: '2026-06-01T09:15:00Z', updated_at: '2026-06-01T09:15:00Z', views: 156 },
  ],

  lives: [
    { id: 1, title: 'Debat du soir — Les defis de l\'education au Tchad', description: 'Un debat interactif sur les defis et perspectives du systeme educatif tchadien.', embed_url: '', facebook_url: '', image: '', is_live: false, created_at: '2026-06-16T19:00:00Z' },
    { id: 2, title: 'Success Morning — Edition speciale', description: 'Votre emission matinale avec des invites speciaux et des sujets d\'actualite.', embed_url: '', facebook_url: '', image: '', is_live: false, created_at: '2026-06-14T08:00:00Z' },
    { id: 3, title: 'Interview exclusive — Portrait d\'un entrepreneur', description: 'Rencontre avec un jeune entrepreneur de Sarh qui a reussi dans l\'agroalimentaire.', embed_url: '', facebook_url: '', image: '', is_live: false, created_at: '2026-06-12T15:30:00Z' },
    { id: 4, title: 'Direct — Festival culturel de Sarh', description: 'Suivez en direct les temps forts du festival culturel annuel de Sarh.', embed_url: '', facebook_url: '', image: '', is_live: false, created_at: '2026-06-10T10:00:00Z' },
  ],

  podcasts: [
    { id: 1, title: 'Inspiration Tchad #1', description: 'Histoires de reussite et de motivation pour la jeunesse tchadienne.', image: '', audio_url: 'https://example.com/podcast1.mp3', video_url: '', created_at: '2026-06-12T10:00:00Z' },
    { id: 2, title: 'Culture & Tradition #3', description: 'Exploration des traditions et de la culture tchadienne.', image: '', audio_url: 'https://example.com/podcast2.mp3', video_url: '', created_at: '2026-06-08T14:00:00Z' },
    { id: 3, title: 'Entreprenariat Jeune #5', description: 'Conseils et temoignages pour les jeunes entrepreneurs.', image: '', audio_url: 'https://example.com/podcast3.mp3', video_url: '', created_at: '2026-06-05T09:00:00Z' },
  ],

  gallery: [
    { id: 1, title: 'Plateau Success Media TV', image: '', created_at: '2026-06-10T10:00:00Z' },
    { id: 2, title: 'Evenement culturel a Sarh', image: '', created_at: '2026-06-08T15:00:00Z' },
    { id: 3, title: 'Interview exclusive', image: '', created_at: '2026-06-05T11:00:00Z' },
    { id: 4, title: 'Equipe Success Media TV', image: '', created_at: '2026-06-01T09:00:00Z' },
    { id: 5, title: 'Festival de Sarh 2026', image: '', created_at: '2026-05-28T16:00:00Z' },
    { id: 6, title: 'Atelier de formation', image: '', created_at: '2026-05-25T10:00:00Z' },
  ],

  categories: [
    { id: 1, name: 'Societe', slug: 'societe', description: 'Actualites societales', article_count: 5 },
    { id: 2, name: 'Culture', slug: 'culture', description: 'Culture et patrimoine', article_count: 3 },
    { id: 3, name: 'Sport', slug: 'sport', description: 'Actualites sportives', article_count: 2 },
    { id: 4, name: 'Technologie', slug: 'technologie', description: 'Innovation et tech', article_count: 3 },
    { id: 5, name: 'Politique', slug: 'politique', description: 'Actualites politiques', article_count: 2 },
    { id: 6, name: 'Sante', slug: 'sante', description: 'Sante et bien-etre', article_count: 1 },
  ],

  comments: { 1: [
    { id: 1, article_id: 1, author: 'Jean', content: 'Excellent article ! Tres inspirant pour la jeunesse.', created_at: '2026-06-16T08:00:00Z' },
    { id: 2, article_id: 1, author: 'Marie', content: 'Merci pour ce contenu de qualite. Continuez ainsi !', created_at: '2026-06-16T10:30:00Z' },
  ]},

  getData: function(arr) {
    if (Array.isArray(arr)) return arr;
    if (arr && arr.data && Array.isArray(arr.data)) return arr.data;
    return [];
  },

  dbArticleId: 5,
  dbLiveId: 5,
  dbPodcastId: 4,
  dbCommentId: 3,
};

/* ============ API CLIENT ============ */
const API = {
  baseURL: '/api',

  async request(endpoint, options) {
    options = options || {};
    var token = localStorage.getItem('token');
    var headers = { 'Content-Type': 'application/json' };
    if (options.headers) Object.assign(headers, options.headers);
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (options.formData) delete headers['Content-Type'];

    try {
      var res = await fetch(this.baseURL + endpoint, {
        method: options.method || 'GET',
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : (options.formData || undefined),
      });
      if (!res.ok) {
        var err = await res.json().catch(function() { return { error: res.statusText }; });
        throw { status: res.status, ...err };
      }
      var text = await res.text();
      DEMO.mode = false;
      return text ? JSON.parse(text) : null;
    } catch (e) {
      return this._fallback(endpoint, options);
    }
  },

  _fallback: function(endpoint, options) {
    DEMO.mode = true;
    var method = (options.method || 'GET').toUpperCase();

    // Auth
    if (endpoint === '/auth/login' && method === 'POST') {
      var body = options.body || {};
      if (body.username === 'admin' && body.password === 'admin123') {
        return { token: 'demo-token-' + Date.now(), user: { id: 1, username: 'admin', name: 'Administrateur', role: 'admin' } };
      }
      throw { status: 401, error: 'Identifiants incorrects' };
    }

    // Stats
    if (endpoint === '/stats') {
      return {
        articles: DEMO.articles.length,
        lives: DEMO.lives.length,
        podcasts: DEMO.podcasts.length,
        gallery: DEMO.gallery.length,
        categories: DEMO.categories.length,
        comments: Object.values(DEMO.comments).reduce(function(s, c) { return s + c.length; }, 0),
        messages: 0,
      };
    }

    // Articles listing
    if (endpoint.startsWith('/articles') && method === 'GET') {
      var params = {};
      var idx = endpoint.indexOf('?');
      if (idx >= 0) {
        endpoint.slice(idx + 1).split('&').forEach(function(p) {
          var kv = p.split('=');
          params[kv[0]] = decodeURIComponent(kv[1] || '');
        });
      }
      var data = DEMO.articles.filter(function(a) {
        if (params.category && a.category_slug !== params.category) return false;
        return true;
      });
      if (params.featured === '1') {
        data = data.slice(0, 3);
      }
      if (params.sort === 'views') {
        data = data.slice().sort(function(a, b) { return (b.views || 0) - (a.views || 0); });
      }
      var limit = parseInt(params.limit);
      if (!isNaN(limit) && limit > 0) data = data.slice(0, limit);
      return { data: data, total: data.length, per_page: 10, current_page: 1 };
    }

    // Single article
    var m = endpoint.match(/^\/articles\/(.+)$/);
    if (m && method === 'GET') {
      var article = DEMO.articles.find(function(a) { return a.slug === m[1]; });
      if (article) return { data: article };
      throw { status: 404, error: 'Article non trouve' };
    }

    // Article create
    if (endpoint === '/articles' && method === 'POST') {
      var articleData = options.body || {};
      var newArticle = {
        id: DEMO.dbArticleId++,
        slug: articleData.title ? articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'article-' + (DEMO.dbArticleId - 1),
        title: articleData.title || 'Nouvel article',
        excerpt: articleData.excerpt || '',
        content: articleData.content || '',
        author: 'Administrateur',
        category_name: '',
        category_slug: articleData.category_slug || '',
        image: articleData.image || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      DEMO.articles.unshift(newArticle);
      return { data: newArticle };
    }

    // Article update
    var mUpdate = endpoint.match(/^\/articles\/(\d+)$/);
    if (mUpdate && method === 'PUT') {
      var id = parseInt(mUpdate[1]);
      var idx = DEMO.articles.findIndex(function(a) { return a.id === id; });
      if (idx >= 0) {
        var updateData = options.body || {};
        Object.assign(DEMO.articles[idx], updateData, { updated_at: new Date().toISOString() });
        return { data: DEMO.articles[idx] };
      }
      throw { status: 404, error: 'Article non trouve' };
    }

    // Article delete
    if (mUpdate && method === 'DELETE') {
      var idDel = parseInt(mUpdate[1]);
      DEMO.articles = DEMO.articles.filter(function(a) { return a.id !== idDel; });
      return { success: true };
    }

    // Lives
    if (endpoint.startsWith('/lives') && method === 'GET') {
      return { data: DEMO.lives, total: DEMO.lives.length, per_page: 10, current_page: 1 };
    }
    if (endpoint === '/lives' && method === 'POST') {
      var liveData = options.body || {};
      var newLive = {
        id: DEMO.dbLiveId++,
        title: liveData.title || 'Nouvelle emission',
        description: liveData.description || '',
        embed_url: liveData.embed_url || '',
        facebook_url: liveData.facebook_url || '',
        image: liveData.image || '',
        is_live: liveData.is_live || false,
        created_at: new Date().toISOString(),
      };
      DEMO.lives.unshift(newLive);
      return { data: newLive };
    }

    // Podcasts
    if (endpoint.startsWith('/podcasts') && method === 'GET') {
      return { data: DEMO.podcasts, total: DEMO.podcasts.length, per_page: 10, current_page: 1 };
    }
    if (endpoint === '/podcasts' && method === 'POST') {
      var podData = options.body || {};
      var newPod = {
        id: DEMO.dbPodcastId++,
        title: podData.title || 'Nouveau podcast',
        description: podData.description || '',
        image: podData.image || '',
        audio_url: podData.audio_url || '',
        video_url: podData.video_url || '',
        created_at: new Date().toISOString(),
      };
      DEMO.podcasts.unshift(newPod);
      return { data: newPod };
    }

    // Gallery
    if (endpoint === '/gallery' && method === 'GET') {
      return { data: DEMO.gallery, total: DEMO.gallery.length };
    }

    // Categories
    if (endpoint.startsWith('/categories') && method === 'GET') {
      return { data: DEMO.categories };
    }
    if (endpoint === '/categories' && method === 'POST') {
      var catData = options.body || {};
      var newCat = {
        id: DEMO.categories.length + 1,
        name: catData.name || 'Nouvelle categorie',
        slug: catData.slug || (catData.name || 'nouvelle-categorie').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: catData.description || '',
        article_count: 0,
      };
      DEMO.categories.push(newCat);
      return { data: newCat };
    }

    // Comments
    var cm = endpoint.match(/^\/comments\/article\/(\d+)$/);
    if (cm && method === 'GET') {
      return { data: DEMO.comments[parseInt(cm[1])] || [] };
    }
    if (endpoint === '/comments' && method === 'POST') {
      var commentData = options.body || {};
      var newComment = {
        id: DEMO.dbCommentId++,
        article_id: commentData.article_id,
        author: commentData.author || 'Anonyme',
        content: commentData.content || '',
        created_at: new Date().toISOString(),
      };
      if (!DEMO.comments[commentData.article_id]) DEMO.comments[commentData.article_id] = [];
      DEMO.comments[commentData.article_id].push(newComment);
      return { data: newComment };
    }

    // Contact
    if (endpoint === '/contact' && method === 'POST') {
      return { success: true, message: 'Message envoye avec succes' };
    }

    // Search
    if (endpoint.startsWith('/search')) {
      return {
        articles: DEMO.articles,
        lives: DEMO.lives,
        podcasts: DEMO.podcasts,
      };
    }

    // Export
    if (endpoint.startsWith('/export')) {
      return { success: true };
    }

    // Upload
    if (endpoint === '/upload' && method === 'POST') {
      return { url: './images/placeholder.svg', filename: 'placeholder.svg' };
    }

    // Newsletter
    if (endpoint === '/newsletter' && method === 'POST') {
      return { success: true, message: 'Inscription reussie' };
    }

    // Default
    return { data: [] };
  },

  get: function(endpoint) { return this.request(endpoint, { method: 'GET' }); },
  post: function(endpoint, body) { return this.request(endpoint, { method: 'POST', body: body }); },
  put: function(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: body }); },
  delete: function(endpoint) { return this.request(endpoint, { method: 'DELETE' }); },
  upload: function(endpoint, formData) { return this.request(endpoint, { method: 'POST', formData: formData }); },
};

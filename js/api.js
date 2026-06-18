/* ============ DEMO DATA ============ */
var DEMO = {
  token: null,
  mode: false,

  articles: [
    { id: 1, slug: 'tchad-forum-investissement-macao-2026', title: 'Le Tchad au 17e Forum international sur l\'investissement à Macao', excerpt: 'Une délégation tchadienne conduite par le ministre Amir Idriss Kourda a pris part au 17e Forum et Exposition internationale sur l\'investissement à Macao du 10 au 12 juin 2026.', content: 'Le Tchad a pris part au 17ᵉ Forum et Exposition internationale sur l\'investissement et la construction des infrastructures organisé à Macao du 10 au 12 juin 2026.\n\nConduite par le ministre Amir Idriss Kourda, la délégation tchadienne a échangé avec des investisseurs et experts internationaux sur les enjeux du développement des infrastructures de transport, du financement des projets structurants et des innovations technologiques du secteur.\n\nUne participation qui s\'inscrit dans la dynamique de modernisation et de désenclavement du pays. Success Media TV vous propose un décryptage de cette participation stratégique pour le Tchad.', author: 'Success Media', category_name: 'Politique', category_slug: 'politique', image: './images/article-1.jpg', created_at: '2026-06-12T10:00:00Z', updated_at: '2026-06-12T10:00:00Z', views: 312 },
    { id: 2, slug: 'ia-intelligence-artificielle-vox-pop', title: 'L\'intelligence artificielle peut-elle remplacer l\'être humain ?', excerpt: 'L\'IA progresse à grande vitesse et transforme notre façon de travailler, d\'apprendre et de communiquer. Donnez votre avis.', content: '𝗩𝗢𝗫 𝗣𝗢𝗣 : L\'intelligence artificielle progresse à grande vitesse et transforme déjà notre façon de travailler, d\'apprendre et de communiquer.\n\nMais peut-elle réellement remplacer l\'être humain ? C\'est la question que Success Media TV pose à ses lecteurs.\n\nL\'IA est-elle une opportunité, une menace ou un outil complémentaire au service de l\'homme ? Les avis sont partagés. Entre craintes et espoirs, le débat est ouvert.\n\nDonnez-nous votre avis en commentaire : l\'IA est-elle une opportunité, une menace ou un outil complémentaire au service de l\'homme ?', author: 'Success Media', category_name: 'Technologie', category_slug: 'technologie', image: './images/article-2.jpg', created_at: '2026-06-12T08:00:00Z', updated_at: '2026-06-12T08:00:00Z', views: 245 },
    { id: 3, slug: 'forum-affaires-france-tchad-268-projets', title: 'Forum d\'affaires France–Tchad : 268 projets pour séduire les investisseurs', excerpt: 'À trois mois du Forum d\'affaires France–Tchad de Paris, le gouvernement tchadien présente un portefeuille de 268 projets.', content: 'À trois mois du Forum d\'affaires France–Tchad de Paris, le gouvernement tchadien intensifie sa mobilisation auprès du patronat français.\n\nLe ministre des Finances, Tahir Hamid Nguilin, doit présenter un portefeuille de 268 projets représentant près de 30 milliards de dollars d\'investissements à mobiliser d\'ici à 2030.\n\nCette initiative vise à attirer davantage de capitaux dans des secteurs stratégiques tels que les infrastructures, l\'énergie, l\'agriculture, l\'industrie et le numérique, afin d\'accélérer la transformation économique du pays.', author: 'Success Media', category_name: 'Economie', category_slug: 'economie', image: './images/article-3.jpg', created_at: '2026-06-11T14:00:00Z', updated_at: '2026-06-11T14:00:00Z', views: 189 },
    { id: 4, slug: 'bcc-banque-commerciale-chari-reouverture', title: 'La BCC rouvre son siège après rénovation', excerpt: 'La Banque Commerciale du Chari annonce la réouverture officielle de son siège à N\'Djamena après d\'importants travaux de rénovation.', content: 'La Banque Commerciale du Chari (BCC) a annoncé la réouverture officielle de son siège à N\'Djamena, prévue le samedi 13 juin 2026, à l\'issue d\'importants travaux de rénovation.\n\nSelon la banque, cette modernisation vise à offrir un meilleur accueil aux clients, davantage de confort et une expérience bancaire adaptée aux exigences actuelles du secteur financier.\n\nÀ travers cette réhabilitation, la BCC réaffirme sa volonté de renforcer la qualité de ses services et de placer la satisfaction de sa clientèle au cœur de ses priorités.\n\nLa cérémonie de réouverture permettra au public de découvrir un cadre entièrement rénové, conçu pour répondre aux attentes d\'une clientèle en quête de proximité, d\'efficacité et de modernité.', author: 'Success Media', category_name: 'Economie', category_slug: 'economie', image: './images/article-4.jpg', created_at: '2026-06-10T09:00:00Z', updated_at: '2026-06-10T09:00:00Z', views: 156 },
    { id: 5, slug: 'centrale-thermique-farcha-tchad', title: 'Le Tchad renforce ses capacités électriques avec une centrale de 40 MW', excerpt: 'Le Premier ministre Allah Maye Halina a lancé les travaux de construction d\'une centrale thermique de 40 MW à Farcha, à N\'Djamena.', content: 'Le Premier ministre Allah Maye Halina et son homologue algérien ont lancé ce 8 juin 2026 les travaux de construction d\'une centrale thermique de 40 MW à Farcha, à N\'Djamena.\n\nFinancé avec l\'appui de l\'Algérie, ce projet stratégique vise à améliorer l\'accès à l\'électricité, soutenir le développement économique et créer des emplois.\n\nLes autorités tchadiennes saluent une coopération concrète qui contribue au renforcement de la souveraineté énergétique du pays.', author: 'Success Media', category_name: 'Societe', category_slug: 'societe', image: './images/article-1.jpg', created_at: '2026-06-08T16:00:00Z', updated_at: '2026-06-08T16:00:00Z', views: 278 },
    { id: 6, slug: 'semaine-culturelle-inter-etablissements-sarh', title: 'Sarh : la jeunesse scolaire à l\'honneur lors de la Semaine culturelle inter-établissements', excerpt: 'La première édition de la Semaine culturelle inter-établissements à Sarh réunit une vingtaine d\'établissements autour de la culture, l\'excellence et le numérique.', content: 'À Sarh, la première édition de la Semaine culturelle inter-établissements a été officiellement lancée au Palais des Arts et de la Culture Ngarta Tombalbaye.\n\nL\'événement, qui se déroule du 18 au 26 avril 2026, réunit une vingtaine d\'établissements autour du thème : « Culture, Excellence et Numérique : la jeunesse scolaire au cœur de l\'évolution ».\n\nLa cérémonie d\'ouverture a enregistré la présence de plusieurs autorités locales, responsables éducatifs et un public scolaire fortement mobilisé.\n\nCette semaine culturelle se positionne comme un espace d\'expression, de compétition saine et de valorisation du potentiel scolaire dans la ville de Sarh.', author: 'Success Media', category_name: 'Culture', category_slug: 'culture', image: './images/article-2.jpg', created_at: '2026-04-19T10:00:00Z', updated_at: '2026-04-19T10:00:00Z', views: 201 },
    { id: 7, slug: 'formation-journalisme-jeunes-sarh', title: 'Des jeunes de Sarh s\'initient au journalisme', excerpt: 'L\'Organisation des jeunes bâtisseurs tchadiens a organisé une session de formation aux fondamentaux du journalisme à Sarh.', content: 'Du 25 au 29 mars 2026, l\'Organisation des jeunes bâtisseurs tchadiens (OJBT) a organisé une session de formation baptisée « Un pas en journalisme », au Palais des arts et de la culture Ngarta Tombalbaye de Sarh.\n\nCette initiative était destinée aux jeunes de la ville de Sarh désireux de découvrir les fondamentaux du journalisme et de la communication.\n\nPendant cinq jours, les participants ont bénéficié de l\'encadrement de professionnels des médias, notamment des journalistes du Quotidien Le Progrès et de RFI.\n\nCette formation visait à développer des compétences pratiques et à préparer une relève capable de répondre aux défis du paysage médiatique.', author: 'Success Media', category_name: 'Societe', category_slug: 'societe', image: './images/article-3.jpg', created_at: '2026-03-31T15:00:00Z', updated_at: '2026-03-31T15:00:00Z', views: 167 },
  ],

  lives: [
    { id: 1, title: 'Success Media TV — Direct', description: 'Suivez Success Media TV en direct depuis Sarh. Debat, interviews et actualites en continu.', embed_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', facebook_url: '', image: './images/live-1.jpg', is_live: true, created_at: '2026-06-17T08:00:00Z' },
    { id: 2, title: 'Debat du soir — Les defis de l\'education au Tchad', description: 'Un debat interactif sur les defis et perspectives du systeme educatif tchadien.', embed_url: '', facebook_url: '', image: './images/live-2.jpg', is_live: false, created_at: '2026-06-16T19:00:00Z' },
    { id: 3, title: 'Success Morning — Edition speciale', description: 'Votre emission matinale avec des invites speciaux et des sujets d\'actualite.', embed_url: '', facebook_url: '', image: './images/live-3.jpg', is_live: false, created_at: '2026-06-14T08:00:00Z' },
    { id: 4, title: 'Interview exclusive — Portrait d\'un entrepreneur', description: 'Rencontre avec un jeune entrepreneur de Sarh qui a reussi dans l\'agroalimentaire.', embed_url: '', facebook_url: '', image: './images/live-4.jpg', is_live: false, created_at: '2026-06-12T15:30:00Z' },
    { id: 5, title: 'Direct — Festival culturel de Sarh', description: 'Suivez en direct les temps forts du festival culturel annuel de Sarh.', embed_url: '', facebook_url: '', image: './images/live-1.jpg', is_live: false, created_at: '2026-06-10T10:00:00Z' },
  ],

  podcasts: [
    { id: 1, title: 'Inspiration Tchad #1', description: 'Histoires de reussite et de motivation pour la jeunesse tchadienne.', image: './images/podcast-1.jpg', audio_url: 'https://example.com/podcast1.mp3', video_url: '', created_at: '2026-06-12T10:00:00Z' },
    { id: 2, title: 'Culture & Tradition #3', description: 'Exploration des traditions et de la culture tchadienne.', image: './images/podcast-2.jpg', audio_url: 'https://example.com/podcast2.mp3', video_url: '', created_at: '2026-06-08T14:00:00Z' },
    { id: 3, title: 'Entreprenariat Jeune #5', description: 'Conseils et temoignages pour les jeunes entrepreneurs.', image: './images/podcast-3.jpg', audio_url: 'https://example.com/podcast3.mp3', video_url: '', created_at: '2026-06-05T09:00:00Z' },
  ],

  gallery: [
    { id: 1, title: 'Plateau Success Media TV', image: './images/gallery-1.jpg', created_at: '2026-06-10T10:00:00Z', category: 'plateau' },
    { id: 2, title: 'Evenement culturel a Sarh', image: './images/gallery-2.jpg', created_at: '2026-06-08T15:00:00Z', category: 'evenement' },
    { id: 3, title: 'Interview exclusive', image: './images/gallery-3.jpg', created_at: '2026-06-05T11:00:00Z', category: 'interview' },
    { id: 4, title: 'Equipe Success Media TV', image: './images/gallery-4.jpg', created_at: '2026-06-01T09:00:00Z', category: 'equipe' },
    { id: 5, title: 'Festival de Sarh 2026', image: './images/gallery-5.jpg', created_at: '2026-05-28T16:00:00Z', category: 'evenement' },
    { id: 6, title: 'Atelier de formation', image: './images/gallery-6.jpg', created_at: '2026-05-25T10:00:00Z', category: 'formation' },
  ],

  categories: [
    { id: 1, name: 'Societe', slug: 'societe', description: 'Actualites societales', article_count: 2 },
    { id: 2, name: 'Culture', slug: 'culture', description: 'Culture et patrimoine', article_count: 1 },
    { id: 3, name: 'Sport', slug: 'sport', description: 'Actualites sportives', article_count: 0 },
    { id: 4, name: 'Technologie', slug: 'technologie', description: 'Innovation et tech', article_count: 1 },
    { id: 5, name: 'Politique', slug: 'politique', description: 'Actualites politiques', article_count: 1 },
    { id: 6, name: 'Economie', slug: 'economie', description: 'Economie et finance', article_count: 2 },
    { id: 7, name: 'Sante', slug: 'sante', description: 'Sante et bien-etre', article_count: 0 },
  ],

  radio_url: 'https://example.com/success-radio.mp3',

  comments: { 1: [
    { id: 1, article_id: 1, author: 'Jean', content: 'Excellent article ! Tres inspirant pour la jeunesse.', created_at: '2026-06-16T08:00:00Z' },
    { id: 2, article_id: 1, author: 'Marie', content: 'Merci pour ce contenu de qualite. Continuez ainsi !', created_at: '2026-06-16T10:30:00Z' },
  ]},

  getData: function(arr) {
    if (Array.isArray(arr)) return arr;
    if (arr && arr.data && Array.isArray(arr.data)) return arr.data;
    return [];
  },

  dbArticleId: 8,
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
      var cat = DEMO.categories.find(function(c) { return c.slug === (articleData.category_slug || ''); });
      var newArticle = {
        id: DEMO.dbArticleId++,
        slug: articleData.title ? articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'article-' + (DEMO.dbArticleId - 1),
        title: articleData.title || 'Nouvel article',
        excerpt: articleData.excerpt || '',
        content: articleData.content || '',
        author: 'Administrateur',
        category_name: cat ? cat.name : '',
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
      if (endpoint === '/lives/current') {
        var currentLive = DEMO.lives.find(function(l) { return l.is_live; });
        return currentLive || null;
      }
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
    var mLive = endpoint.match(/^\/lives\/(\d+)$/);
    if (mLive && method === 'PUT') {
      var liveIdx = DEMO.lives.findIndex(function(l) { return l.id == mLive[1]; });
      if (liveIdx >= 0) { Object.assign(DEMO.lives[liveIdx], options.body || {}, { updated_at: new Date().toISOString() }); return { data: DEMO.lives[liveIdx] }; }
      throw { status: 404, error: 'Non trouve' };
    }
    if (mLive && method === 'DELETE') {
      DEMO.lives = DEMO.lives.filter(function(l) { return l.id != mLive[1]; });
      return { success: true };
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
    var mPod = endpoint.match(/^\/podcasts\/(\d+)$/);
    if (mPod && method === 'PUT') {
      var podIdx = DEMO.podcasts.findIndex(function(p) { return p.id == mPod[1]; });
      if (podIdx >= 0) { Object.assign(DEMO.podcasts[podIdx], options.body || {}, { updated_at: new Date().toISOString() }); return { data: DEMO.podcasts[podIdx] }; }
      throw { status: 404, error: 'Non trouve' };
    }
    if (mPod && method === 'DELETE') {
      DEMO.podcasts = DEMO.podcasts.filter(function(p) { return p.id != mPod[1]; });
      return { success: true };
    }

    // Gallery
    if (endpoint === '/gallery' && method === 'GET') {
      return { data: DEMO.gallery, total: DEMO.gallery.length };
    }
    if (endpoint === '/gallery/categories' && method === 'GET') {
      var cats = [];
      DEMO.gallery.forEach(function(g) {
        if (g.category && cats.indexOf(g.category) < 0) cats.push(g.category);
      });
      return { data: cats };
    }
    if (endpoint === '/gallery' && method === 'POST') {
      var galData = options.body || {};
      var newGal = { id: DEMO.gallery.length + 1, title: galData.title || 'Nouvelle image', image: galData.image || '', category: galData.category || '', created_at: new Date().toISOString() };
      DEMO.gallery.push(newGal);
      return { data: newGal };
    }
    var mGal = endpoint.match(/^\/gallery\/(\d+)$/);
    if (mGal && method === 'PUT') {
      var galIdx = DEMO.gallery.findIndex(function(g) { return g.id == mGal[1]; });
      if (galIdx >= 0) { Object.assign(DEMO.gallery[galIdx], options.body || {}, { updated_at: new Date().toISOString() }); return { data: DEMO.gallery[galIdx] }; }
      throw { status: 404, error: 'Non trouve' };
    }
    if (mGal && method === 'DELETE') {
      DEMO.gallery = DEMO.gallery.filter(function(g) { return g.id != mGal[1]; });
      return { success: true };
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
    var mCat = endpoint.match(/^\/categories\/(\d+)$/);
    if (mCat && method === 'PUT') {
      var catIdx = DEMO.categories.findIndex(function(c) { return c.id == mCat[1]; });
      if (catIdx >= 0) { Object.assign(DEMO.categories[catIdx], options.body || {}); return { data: DEMO.categories[catIdx] }; }
      throw { status: 404, error: 'Non trouve' };
    }
    if (mCat && method === 'DELETE') {
      DEMO.categories = DEMO.categories.filter(function(c) { return c.id != mCat[1]; });
      return { success: true };
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
    if (endpoint === '/contact' && method === 'GET') {
      return { data: [] };
    }
    if (endpoint === '/contact' && method === 'POST') {
      return { success: true, message: 'Message envoye avec succes' };
    }

    // Search
    if (endpoint.startsWith('/search')) {
      var q = '';
      var idx = endpoint.indexOf('?');
      if (idx >= 0) {
        endpoint.slice(idx + 1).split('&').forEach(function(p) {
          var kv = p.split('=');
          if (kv[0] === 'q') q = decodeURIComponent(kv[1] || '').toLowerCase();
        });
      }
      function matchQuery(item) {
        if (!q) return true;
        return (item.title && item.title.toLowerCase().includes(q))
          || (item.excerpt && item.excerpt.toLowerCase().includes(q))
          || (item.content && item.content.toLowerCase().includes(q))
          || (item.description && item.description.toLowerCase().includes(q));
      }
      return {
        articles: DEMO.articles.filter(matchQuery),
        lives: DEMO.lives.filter(matchQuery),
        podcasts: DEMO.podcasts.filter(matchQuery),
      };
    }

    // Export
    if (endpoint.startsWith('/export')) {
      return { success: true };
    }

    // Upload
    if (endpoint === '/upload' && method === 'GET') {
      return { data: [] };
    }
    if (endpoint === '/upload' && method === 'POST') {
      return { url: './images/placeholder.svg', filename: 'placeholder.svg' };
    }
    if (endpoint === '/upload/multiple' && method === 'POST') {
      return { success: true, count: 1 };
    }
    if (endpoint.match(/^\/upload\//) && method === 'DELETE') {
      return { success: true };
    }

    // Newsletter
    if (endpoint === '/newsletter' && method === 'POST') {
      return { success: true, message: 'Inscription reussie' };
    }

    // Radio stream
    if (endpoint === '/radio/stream') {
      return { data: { stream_url: DEMO.radio_url, title: 'Success Media Radio' } };
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

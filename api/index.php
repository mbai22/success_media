<?php
// ============================================================
// Success Media TV — API REST (PHP + SQLite)
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ---------- Configuration ----------
define('DB_PATH', __DIR__ . '/data/success.db');
define('UPLOAD_DIR', __DIR__ . '/../images/');
// URL of the radio stream (empty: the radio button is hidden)
define('RADIO_STREAM_URL', '');

// ---------- Database ----------
function db(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;
    $dir = dirname(DB_PATH);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $pdo = new PDO('sqlite:' . DB_PATH, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA journal_mode=WAL');
    $pdo->exec('PRAGMA foreign_keys=ON');
    initDb($pdo);
    return $pdo;
}

function initDb(PDO $pdo): void {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL DEFAULT '',
            role TEXT NOT NULL DEFAULT 'admin',
            token TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            excerpt TEXT DEFAULT '',
            content TEXT DEFAULT '',
            author TEXT DEFAULT 'Success Media TV',
            category_slug TEXT DEFAULT '',
            image TEXT DEFAULT '',
            featured INTEGER DEFAULT 0,
            published INTEGER DEFAULT 1,
            views INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS lives (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            embed_url TEXT DEFAULT '',
            facebook_url TEXT DEFAULT '',
            image TEXT DEFAULT '',
            is_live INTEGER DEFAULT 0,
            scheduled_for DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS podcasts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            image TEXT DEFAULT '',
            audio_url TEXT DEFAULT '',
            video_url TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            image TEXT NOT NULL,
            description TEXT DEFAULT '',
            category TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            article_id INTEGER NOT NULL,
            author TEXT DEFAULT 'Anonyme',
            email TEXT DEFAULT '',
            content TEXT NOT NULL,
            approved INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT DEFAULT '',
            message TEXT NOT NULL,
            read_at DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS newsletters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            original_name TEXT DEFAULT '',
            url TEXT NOT NULL,
            size INTEGER DEFAULT 0,
            type TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            day TEXT NOT NULL,
            time TEXT NOT NULL,
            category TEXT DEFAULT '',
            image TEXT DEFAULT ''
        );
    ");
}

// ---------- Seed ----------
// Rubriques of the main navigation (slug => [name, description])
const RUBRIQUES = [
    'economie' => ['Économie', 'Économie nationale et régionale'],
    'finance' => ['Finance', 'Banque, marchés et finances publiques'],
    'business' => ['Business', 'Entreprises, marchés et affaires'],
    'entrepreneuriat' => ['Entrepreneuriat', 'Création d\'entreprise et parcours d\'entrepreneurs'],
    'technologie' => ['Tech & Innovation', 'Technologies, numérique et innovation'],
    'leadership' => ['Leadership', 'Management, gouvernance et leaders'],
    'analyses' => ['Analyses', 'Décryptages et analyses de fond'],
    'opportunites' => ['Opportunités', 'Appels d\'offres, bourses, emplois et financements'],
];

// Versioned migrations (PRAGMA user_version): each step runs once per database
function migrate(PDO $pdo): void {
    $version = (int)$pdo->query('PRAGMA user_version')->fetchColumn();
    if ($version < 1) {
        // Seed only a brand-new database, never again after content was deleted
        $hasData = $pdo->query("SELECT (SELECT COUNT(*) FROM users) + (SELECT COUNT(*) FROM articles)")->fetchColumn();
        if (!$hasData) seedData($pdo);
    }
    if ($version < 2) {
        $insert = $pdo->prepare("INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)");
        $rename = $pdo->prepare("UPDATE categories SET name = ?, description = ? WHERE slug = ?");
        foreach (RUBRIQUES as $slug => [$name, $description]) {
            $insert->execute([$name, $slug, $description]);
            $rename->execute([$name, $description, $slug]);
        }
        // Accents of the original categories
        $pdo->exec("UPDATE categories SET name = 'Société', description = 'Actualités sociétales' WHERE slug = 'societe'");
        $pdo->exec("UPDATE categories SET name = 'Santé', description = 'Santé et bien-être' WHERE slug = 'sante'");
        $pdo->exec("UPDATE categories SET description = 'Actualités politiques' WHERE slug = 'politique'");
        $pdo->exec("UPDATE categories SET description = 'Actualités sportives' WHERE slug = 'sport'");
    }
    if ($version < 3) {
        // Remove the generic demo content (exact seeded rows only, never content added from the admin)
        $fakeSlugs = ['campagne-agricole-sud-tchad-coton-2026', 'tournoi-football-sarh-espoirs-2026', 'campagne-vaccination-enfants-moyen-chari',
            'forage-eau-potable-sarh-projet', 'numerisation-ecoles-sarh-pilote', 'rencontre-gouverneur-societe-civile-sarh', 'festival-lutte-traditionnelle-sarh-2026'];
        $in = implode(',', array_fill(0, count($fakeSlugs), '?'));
        $pdo->prepare("DELETE FROM comments WHERE article_id IN (SELECT id FROM articles WHERE slug IN ($in))")->execute($fakeSlugs);
        $pdo->prepare("DELETE FROM articles WHERE slug IN ($in)")->execute($fakeSlugs);
        $demoImages = "('./images/live-1.jpg', './images/live-2.jpg', './images/live-3.jpg', './images/live-4.jpg', './images/podcast-1.jpg', './images/podcast-2.jpg', './images/podcast-3.jpg', './images/gallery-1.jpg', './images/gallery-2.jpg', './images/gallery-3.jpg', './images/gallery-4.jpg', './images/gallery-5.jpg', './images/gallery-6.jpg')";
        $pdo->exec("DELETE FROM lives WHERE image IN $demoImages AND (embed_url = '' OR embed_url LIKE '%dQw4w9WgXcQ%')");
        $pdo->exec("DELETE FROM podcasts WHERE audio_url LIKE 'https://example.com/%'");
        $pdo->exec("DELETE FROM gallery WHERE image IN $demoImages");
        $pdo->exec("DELETE FROM programs WHERE image IN $demoImages");
        // Stock photos on real articles: neutral cover until the real photo is uploaded
        $pdo->exec("UPDATE articles SET image = './images/cover-success.svg' WHERE image IN ('./images/article-1.jpg', './images/article-2.jpg', './images/article-3.jpg', './images/article-4.jpg', './images/tchad-camel.jpg', './images/tchad-aerial.jpg', './images/tchad-airport.jpg')");
    }
    if ($version < 4) {
        // Real photo of the Semaine culturelle (only if the article still has the neutral cover)
        $pdo->exec("UPDATE articles SET image = './images/semaine-culturelle-sarh.webp' WHERE slug = 'semaine-culturelle-inter-etablissements-sarh' AND image IN ('./images/cover-success.svg', './images/tchad-camel.jpg')");
    }
    if ($version < 5) {
        // Real photo of the BCC headquarters (only if the article still has the neutral cover)
        $pdo->exec("UPDATE articles SET image = './images/bcc-siege-ndjamena.webp' WHERE slug = 'bcc-banque-commerciale-chari-reouverture' AND image IN ('./images/cover-success.svg', './images/article-4.jpg')");
    }
    $pdo->exec('PRAGMA user_version = 5');
}

function seedData(PDO $pdo): void {
    // Admin user: password from SMTV_ADMIN_PASSWORD, or random and written next to the database
    $adminPassword = getenv('SMTV_ADMIN_PASSWORD') ?: bin2hex(random_bytes(9));
    if (!getenv('SMTV_ADMIN_PASSWORD')) {
        file_put_contents(dirname(DB_PATH) . '/admin-password.txt', "admin / $adminPassword
");
    }
    $pdo->prepare("INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('admin', ?, 'Administrateur', 'admin')")
        ->execute([password_hash($adminPassword, PASSWORD_DEFAULT)]);

    // Categories
    $cats = [
        ['name' => 'Societe', 'slug' => 'societe', 'description' => 'Actualites societales'],
        ['name' => 'Culture', 'slug' => 'culture', 'description' => 'Culture et patrimoine'],
        ['name' => 'Sport', 'slug' => 'sport', 'description' => 'Actualites sportives'],
        ['name' => 'Technologie', 'slug' => 'technologie', 'description' => 'Innovation et tech'],
        ['name' => 'Politique', 'slug' => 'politique', 'description' => 'Actualites politiques'],
        ['name' => 'Economie', 'slug' => 'economie', 'description' => 'Economie et finance'],
        ['name' => 'Sante', 'slug' => 'sante', 'description' => 'Sante et bien-etre'],
    ];
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)");
    foreach ($cats as $c) $stmt->execute([$c['name'], $c['slug'], $c['description']]);

    // Articles
    $articles = [
        ['tchad-forum-investissement-macao-2026', 'Le Tchad au 17e Forum international sur l\'investissement à Macao', 'Une délégation tchadienne conduite par le ministre Amir Idriss Kourda a pris part au 17e Forum et Exposition internationale sur l\'investissement à Macao du 10 au 12 juin 2026.', "Le Tchad a pris part au 17ᵉ Forum et Exposition internationale sur l'investissement et la construction des infrastructures organisé à Macao du 10 au 12 juin 2026.\n\nConduite par le ministre Amir Idriss Kourda, la délégation tchadienne a échangé avec des investisseurs et experts internationaux sur les enjeux du développement des infrastructures de transport, du financement des projets structurants et des innovations technologiques du secteur.\n\nUne participation qui s'inscrit dans la dynamique de modernisation et de désenclavement du pays. Success Media TV vous propose un décryptage de cette participation stratégique pour le Tchad.", 'Politique', 'politique', './images/Forum-17.png', '2026-06-12T10:00:00Z', 312, '2026-06-12T10:00:00Z'],
        ['ia-intelligence-artificielle-vox-pop', 'L\'intelligence artificielle peut-elle remplacer l\'être humain ?', 'L\'IA progresse à grande vitesse et transforme notre façon de travailler, d\'apprendre et de communiquer. Donnez votre avis.', "𝗩𝗢𝗫 𝗣𝗢𝗣 : L'intelligence artificielle progresse à grande vitesse et transforme déjà notre façon de travailler, d'apprendre et de communiquer.\n\nMais peut-elle réellement remplacer l'être humain ? C'est la question que Success Media TV pose à ses lecteurs.\n\nL'IA est-elle une opportunité, une menace ou un outil complémentaire au service de l'homme ? Les avis sont partagés. Entre craintes et espoirs, le débat est ouvert.\n\nDonnez-nous votre avis en commentaire : l'IA est-elle une opportunité, une menace ou un outil complémentaire au service de l'homme ?", 'Technologie', 'technologie', './images/intelligence-humain.png', '2026-06-12T08:00:00Z', 245, '2026-06-12T08:00:00Z'],
        ['forum-affaires-france-tchad-268-projets', 'Forum d\'affaires France–Tchad : 268 projets pour séduire les investisseurs', 'À trois mois du Forum d\'affaires France–Tchad de Paris, le gouvernement tchadien présente un portefeuille de 268 projets.', "À trois mois du Forum d'affaires France–Tchad de Paris, le gouvernement tchadien intensifie sa mobilisation auprès du patronat français.\n\nLe ministre des Finances, Tahir Hamid Nguilin, doit présenter un portefeuille de 268 projets représentant près de 30 milliards de dollars d'investissements à mobiliser d'ici à 2030.\n\nCette initiative vise à attirer davantage de capitaux dans des secteurs stratégiques tels que les infrastructures, l'énergie, l'agriculture, l'industrie et le numérique, afin d'accélérer la transformation économique du pays.", 'Economie', 'economie', './images/forum-Tchad-France.png', '2026-06-11T14:00:00Z', 189, '2026-06-11T14:00:00Z'],
        ['bcc-banque-commerciale-chari-reouverture', 'La BCC rouvre son siège après rénovation', 'La Banque Commerciale du Chari annonce la réouverture officielle de son siège à N\'Djamena après d\'importants travaux de rénovation.', "La Banque Commerciale du Chari (BCC) a annoncé la réouverture officielle de son siège à N'Djamena, prévue le samedi 13 juin 2026, à l'issue d'importants travaux de rénovation.\n\nSelon la banque, cette modernisation vise à offrir un meilleur accueil aux clients, davantage de confort et une expérience bancaire adaptée aux exigences actuelles du secteur financier.\n\nÀ travers cette réhabilitation, la BCC réaffirme sa volonté de renforcer la qualité de ses services et de placer la satisfaction de sa clientèle au cœur de ses priorités.\n\nLa cérémonie de réouverture permettra au public de découvrir un cadre entièrement rénové, conçu pour répondre aux attentes d'une clientèle en quête de proximité, d'efficacité et de modernité.", 'Economie', 'economie', './images/bcc-siege-ndjamena.webp', '2026-06-10T09:00:00Z', 156, '2026-06-10T09:00:00Z'],
        ['centrale-thermique-farcha-tchad', 'Le Tchad renforce ses capacités électriques avec une centrale de 40 MW', 'Le Premier ministre Allah Maye Halina a lancé les travaux de construction d\'une centrale thermique de 40 MW à Farcha, à N\'Djamena.', "Le Premier ministre Allah Maye Halina et son homologue algérien ont lancé ce 8 juin 2026 les travaux de construction d'une centrale thermique de 40 MW à Farcha, à N'Djamena.\n\nFinancé avec l'appui de l'Algérie, ce projet stratégique vise à améliorer l'accès à l'électricité, soutenir le développement économique et créer des emplois.\n\nLes autorités tchadiennes saluent une coopération concrète qui contribue au renforcement de la souveraineté énergétique du pays.", 'Societe', 'societe', './images/cover-success.svg', '2026-06-08T16:00:00Z', 278, '2026-06-08T16:00:00Z'],
        ['semaine-culturelle-inter-etablissements-sarh', 'Sarh : la jeunesse scolaire à l\'honneur lors de la Semaine culturelle inter-établissements', 'La première édition de la Semaine culturelle inter-établissements à Sarh réunit une vingtaine d\'établissements autour de la culture, l\'excellence et le numérique.', "À Sarh, la première édition de la Semaine culturelle inter-établissements a été officiellement lancée au Palais des Arts et de la Culture Ngarta Tombalbaye.\n\nL'événement, qui se déroule du 18 au 26 avril 2026, réunit une vingtaine d'établissements autour du thème : « Culture, Excellence et Numérique : la jeunesse scolaire au cœur de l'évolution ».\n\nLa cérémonie d'ouverture a enregistré la présence de plusieurs autorités locales, responsables éducatifs et un public scolaire fortement mobilisé.\n\nCette semaine culturelle se positionne comme un espace d'expression, de compétition saine et de valorisation du potentiel scolaire dans la ville de Sarh.", 'Culture', 'culture', './images/semaine-culturelle-sarh.webp', '2026-04-19T10:00:00Z', 201, '2026-04-19T10:00:00Z'],
        ['formation-journalisme-jeunes-sarh', 'Des jeunes de Sarh s\'initient au journalisme', 'L\'Organisation des jeunes bâtisseurs tchadiens a organisé une session de formation aux fondamentaux du journalisme à Sarh.', "Du 25 au 29 mars 2026, l'Organisation des jeunes bâtisseurs tchadiens (OJBT) a organisé une session de formation baptisée « Un pas en journalisme », au Palais des arts et de la culture Ngarta Tombalbaye de Sarh.\n\nCette initiative était destinée aux jeunes de la ville de Sarh désireux de découvrir les fondamentaux du journalisme et de la communication.\n\nPendant cinq jours, les participants ont bénéficié de l'encadrement de professionnels des médias, notamment des journalistes du Quotidien Le Progrès et de RFI.\n\nCette formation visait à développer des compétences pratiques et à préparer une relève capable de répondre aux défis du paysage médiatique.", 'Societe', 'societe', './images/cover-success.svg', '2026-03-31T15:00:00Z', 167, '2026-03-31T15:00:00Z'],
    ];
    $stmt = $pdo->prepare("INSERT INTO articles (slug, title, excerpt, content, author, category_slug, image, created_at, views, updated_at) VALUES (?, ?, ?, ?, 'Success Media', ?, ?, ?, ?, ?)");
    foreach ($articles as $a) $stmt->execute([$a[0], $a[1], $a[2], $a[3], $a[5], $a[6], $a[7], $a[8], $a[9]]);

}

// ---------- Helpers ----------
const UPLOAD_TYPES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
const UPLOAD_MAX_SIZE = 10 * 1024 * 1024;

// Validates an uploaded image and stores it under a server-chosen name; returns that name or null
function storeUpload(string $tmp, int $size): ?string {
    if (!is_uploaded_file($tmp) || $size <= 0 || $size > UPLOAD_MAX_SIZE) return null;
    // Real content type, not the client-provided name or MIME
    $type = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);
    if (!isset(UPLOAD_TYPES[$type]) || @getimagesize($tmp) === false) return null;
    $name = bin2hex(random_bytes(12)) . '.' . UPLOAD_TYPES[$type];
    return move_uploaded_file($tmp, UPLOAD_DIR . $name) ? $name : null;
}

function json(mixed $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getJsonBody(): array {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    // Fallback for form data
    if (empty($body)) $body = $_POST;
    return $body;
}

function getTokenUser(PDO $pdo): ?array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(.+)/', $header, $m)) {
        $stmt = $pdo->prepare("SELECT id, username, name, role FROM users WHERE token = ?");
        $stmt->execute([$m[1]]);
        return $stmt->fetch() ?: null;
    }
    return null;
}

function requireAuth(PDO $pdo): array {
    $user = getTokenUser($pdo);
    if (!$user) json(['error' => 'Non autorise'], 401);
    return $user;
}

// Articles with the name of their category
const ARTICLE_SELECT = "SELECT a.*, c.name AS category_name FROM articles a LEFT JOIN categories c ON c.slug = a.category_slug";

function getPageParams(): array {
    $page = max(1, intval($_GET['page'] ?? 1));
    $perPage = min(50, max(1, intval($_GET['per_page'] ?? 10)));
    $offset = ($page - 1) * $perPage;
    return [$page, $perPage, $offset];
}

// ---------- Router ----------
try {
    $pdo = db();
    migrate($pdo);

    $method = $_SERVER['REQUEST_METHOD'];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    // Normalize: strip /api prefix if present
    $uri = preg_replace('#^/api#', '', $uri);
    $uri = rtrim($uri, '/') ?: '/';
    $input = getJsonBody();

    // ----- AUTH -----
    if ($uri === '/auth/login' && $method === 'POST') {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$input['username'] ?? '']);
        $user = $stmt->fetch();
        if (!$user || !password_verify($input['password'] ?? '', $user['password'])) {
            json(['error' => 'Identifiants incorrects'], 401);
        }
        $token = bin2hex(random_bytes(32));
        $pdo->prepare("UPDATE users SET token = ? WHERE id = ?")->execute([$token, $user['id']]);
        json(['token' => $token, 'user' => ['id' => $user['id'], 'username' => $user['username'], 'name' => $user['name'], 'role' => $user['role']]]);
    }

    // ----- STATS -----
    if ($uri === '/stats' && $method === 'GET') {
        requireAuth($pdo);
        json([
            'articles' => $pdo->query("SELECT COUNT(*) FROM articles")->fetchColumn(),
            'lives' => $pdo->query("SELECT COUNT(*) FROM lives")->fetchColumn(),
            'podcasts' => $pdo->query("SELECT COUNT(*) FROM podcasts")->fetchColumn(),
            'gallery' => $pdo->query("SELECT COUNT(*) FROM gallery")->fetchColumn(),
            'categories' => $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn(),
            'comments' => $pdo->query("SELECT COUNT(*) FROM comments")->fetchColumn(),
            'messages' => $pdo->query("SELECT COUNT(*) FROM contacts")->fetchColumn(),
            'subscribers' => $pdo->query("SELECT COUNT(*) FROM newsletters")->fetchColumn(),
            'media' => $pdo->query("SELECT COUNT(*) FROM media")->fetchColumn(),
            'commentsPending' => $pdo->query("SELECT COUNT(*) FROM comments WHERE approved = 0")->fetchColumn(),
            'articlesByCategory' => $pdo->query("SELECT c.name, COUNT(a.id) as count FROM categories c LEFT JOIN articles a ON c.slug = a.category_slug GROUP BY c.id ORDER BY count DESC")->fetchAll(),
        ]);
    }

    // ----- ARTICLES -----
    if (preg_match('#^/articles/(\d+)$#', $uri, $m) && $method === 'PUT') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("UPDATE articles SET title=?, slug=?, excerpt=?, content=?, category_slug=?, image=?, author=?, featured=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->execute([
            $input['title'] ?? '',
            $input['slug'] ?? '',
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['category_slug'] ?? '',
            $input['image'] ?? '',
            $input['author'] ?? 'Success Media TV',
            intval($input['featured'] ?? 0),
            intval($input['published'] ?? 1),
            $m[1]
        ]);
        $stmt = $pdo->prepare(ARTICLE_SELECT . " WHERE a.id = ?");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetch()]);
    }

    if (preg_match('#^/articles/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $pdo->prepare("DELETE FROM articles WHERE id = ?")->execute([$m[1]]);
        json(['success' => true]);
    }

    if (preg_match('#^/articles/(.+)$#', $uri, $m) && $method === 'GET') {
        $slug = $m[1];
        if ($slug === 'current' || is_numeric($slug)) {
            json(['error' => 'Not found'], 404);
        }
        $stmt = $pdo->prepare(ARTICLE_SELECT . " WHERE a.slug = ?");
        $stmt->execute([$slug]);
        $article = $stmt->fetch();
        if (!$article || (!$article['published'] && !getTokenUser($pdo))) json(['error' => 'Article non trouve'], 404);
        $pdo->prepare("UPDATE articles SET views = views + 1 WHERE id = ?")->execute([$article['id']]);
        $article['views']++;
        json(['data' => $article]);
    }

    if ($uri === '/articles' && $method === 'GET') {
        $where = [];
        $params = [];
        if (!empty($_GET['category'])) {
            $where[] = "category_slug = ?";
            $params[] = $_GET['category'];
        }
        if (!empty($_GET['featured'])) {
            $where[] = "featured = 1";
        }
        if (empty($_GET['all']) || !getTokenUser($pdo)) {
            $where[] = "published = 1";
        }
        $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';
        $orderClause = 'a.created_at DESC';
        if (($_GET['sort'] ?? '') === 'views') $orderClause = 'a.views DESC';

        $limit = intval($_GET['limit'] ?? 0);
        if ($limit > 0) {
            $stmt = $pdo->prepare(ARTICLE_SELECT . " $whereClause ORDER BY $orderClause LIMIT $limit");
            $stmt->execute($params);
            $rows = $stmt->fetchAll();
            json(['data' => $rows, 'total' => count($rows)]);
        }

        [$page, $perPage, $offset] = getPageParams();
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM articles $whereClause");
        $countStmt->execute($params);
        $total = $countStmt->fetchColumn();

        $stmt = $pdo->prepare(ARTICLE_SELECT . " $whereClause ORDER BY $orderClause LIMIT $perPage OFFSET $offset");
        $stmt->execute($params);
        json(['data' => $stmt->fetchAll(), 'total' => $total, 'per_page' => $perPage, 'current_page' => $page]);
    }

    if ($uri === '/articles' && $method === 'POST') {
        requireAuth($pdo);
        $slug = $input['slug'] ?? '';
        if (empty($slug)) {
            $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower(trim($input['title'] ?? '')));
            $slug = trim($slug, '-');
        }
        $stmt = $pdo->prepare("INSERT INTO articles (slug, title, excerpt, content, author, category_slug, image, featured, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $slug,
            $input['title'] ?? '',
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['author'] ?? 'Success Media TV',
            $input['category_slug'] ?? '',
            $input['image'] ?? '',
            intval($input['featured'] ?? 0),
            intval($input['published'] ?? 1),
        ]);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare(ARTICLE_SELECT . " WHERE a.id = ?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- CATEGORIES -----
    if (preg_match('#^/categories/(\d+)$#', $uri, $m) && $method === 'PUT') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("UPDATE categories SET name=?, slug=?, description=? WHERE id=?");
        $stmt->execute([$input['name'] ?? '', $input['slug'] ?? '', $input['description'] ?? '', $m[1]]);
        $stmt = $pdo->prepare("SELECT * FROM categories WHERE id=?");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetch()]);
    }
    if (preg_match('#^/categories/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $pdo->prepare("DELETE FROM categories WHERE id=?")->execute([$m[1]]);
        json(['success' => true]);
    }
    if ($uri === '/categories' && $method === 'GET') {
        $rows = $pdo->query("SELECT c.*, (SELECT COUNT(*) FROM articles WHERE category_slug = c.slug) as article_count FROM categories c ORDER BY c.name")->fetchAll();
        json(['data' => $rows]);
    }
    if ($uri === '/categories' && $method === 'POST') {
        requireAuth($pdo);
        $slug = $input['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/', '-', $input['name'] ?? '')), '-');
        $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)");
        $stmt->execute([$input['name'] ?? '', $slug, $input['description'] ?? '']);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM categories WHERE id=?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- LIVES -----
    if (preg_match('#^/lives/(\d+)$#', $uri, $m) && $method === 'PUT') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("UPDATE lives SET title=?, description=?, embed_url=?, facebook_url=?, image=?, is_live=?, scheduled_for=?, updated_at=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->execute([
            $input['title'] ?? '', $input['description'] ?? '', $input['embed_url'] ?? '',
            $input['facebook_url'] ?? '', $input['image'] ?? '', intval($input['is_live'] ?? 0),
            $input['scheduled_for'] ?? null, $m[1]
        ]);
        $stmt = $pdo->prepare("SELECT * FROM lives WHERE id=?");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetch()]);
    }
    if (preg_match('#^/lives/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $pdo->prepare("DELETE FROM lives WHERE id=?")->execute([$m[1]]);
        json(['success' => true]);
    }
    if ($uri === '/lives/current' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM lives WHERE is_live = 1 ORDER BY created_at DESC LIMIT 1");
        $live = $stmt->fetch();
        json($live ?: null);
    }
    if ($uri === '/lives' && $method === 'GET') {
        [$page, $perPage, $offset] = getPageParams();
        $total = $pdo->query("SELECT COUNT(*) FROM lives")->fetchColumn();
        $rows = $pdo->query("SELECT * FROM lives ORDER BY created_at DESC LIMIT $perPage OFFSET $offset")->fetchAll();
        json(['data' => $rows, 'total' => $total, 'per_page' => $perPage, 'current_page' => $page]);
    }
    if ($uri === '/lives' && $method === 'POST') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("INSERT INTO lives (title, description, embed_url, facebook_url, image, is_live, scheduled_for) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['title'] ?? '', $input['description'] ?? '', $input['embed_url'] ?? '',
            $input['facebook_url'] ?? '', $input['image'] ?? '', intval($input['is_live'] ?? 0),
            $input['scheduled_for'] ?? null
        ]);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM lives WHERE id=?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- PODCASTS -----
    if (preg_match('#^/podcasts/(\d+)$#', $uri, $m) && $method === 'PUT') {
        requireAuth($pdo);
        $pdo->prepare("UPDATE podcasts SET title=?, description=?, image=?, audio_url=?, video_url=?, updated_at=CURRENT_TIMESTAMP WHERE id=?")
            ->execute([$input['title'] ?? '', $input['description'] ?? '', $input['image'] ?? '', $input['audio_url'] ?? '', $input['video_url'] ?? '', $m[1]]);
        $stmt = $pdo->prepare("SELECT * FROM podcasts WHERE id=?");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetch()]);
    }
    if (preg_match('#^/podcasts/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $pdo->prepare("DELETE FROM podcasts WHERE id=?")->execute([$m[1]]);
        json(['success' => true]);
    }
    if ($uri === '/podcasts' && $method === 'GET') {
        [$page, $perPage, $offset] = getPageParams();
        $total = $pdo->query("SELECT COUNT(*) FROM podcasts")->fetchColumn();
        $rows = $pdo->query("SELECT * FROM podcasts ORDER BY created_at DESC LIMIT $perPage OFFSET $offset")->fetchAll();
        json(['data' => $rows, 'total' => $total, 'per_page' => $perPage, 'current_page' => $page]);
    }
    if ($uri === '/podcasts' && $method === 'POST') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("INSERT INTO podcasts (title, description, image, audio_url, video_url) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$input['title'] ?? '', $input['description'] ?? '', $input['image'] ?? '', $input['audio_url'] ?? '', $input['video_url'] ?? '']);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM podcasts WHERE id=?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- GALLERY -----
    if (preg_match('#^/gallery/(\d+)$#', $uri, $m) && $method === 'PUT') {
        requireAuth($pdo);
        $pdo->prepare("UPDATE gallery SET title=?, image=?, description=?, category=? WHERE id=?")
            ->execute([$input['title'] ?? '', $input['image'] ?? '', $input['description'] ?? '', $input['category'] ?? '', $m[1]]);
        $stmt = $pdo->prepare("SELECT * FROM gallery WHERE id=?");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetch()]);
    }
    if (preg_match('#^/gallery/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $pdo->prepare("DELETE FROM gallery WHERE id=?")->execute([$m[1]]);
        json(['success' => true]);
    }
    if ($uri === '/gallery/categories' && $method === 'GET') {
        $rows = $pdo->query("SELECT DISTINCT category FROM gallery WHERE category != '' ORDER BY category")->fetchAll(PDO::FETCH_COLUMN);
        json(['data' => $rows]);
    }
    if ($uri === '/gallery' && $method === 'GET') {
        [$page, $perPage, $offset] = getPageParams();
        $total = $pdo->query("SELECT COUNT(*) FROM gallery")->fetchColumn();
        $rows = $pdo->query("SELECT * FROM gallery ORDER BY created_at DESC LIMIT $perPage OFFSET $offset")->fetchAll();
        json(['data' => $rows, 'total' => $total, 'per_page' => $perPage, 'current_page' => $page]);
    }
    if ($uri === '/gallery' && $method === 'POST') {
        requireAuth($pdo);
        $stmt = $pdo->prepare("INSERT INTO gallery (title, image, description, category) VALUES (?, ?, ?, ?)");
        $stmt->execute([$input['title'] ?? '', $input['image'] ?? '', $input['description'] ?? '', $input['category'] ?? '']);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM gallery WHERE id=?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- COMMENTS -----
    if (preg_match('#^/comments/article/(\d+)$#', $uri, $m) && $method === 'GET') {
        $stmt = $pdo->prepare("SELECT * FROM comments WHERE article_id = ? AND approved = 1 ORDER BY created_at DESC");
        $stmt->execute([$m[1]]);
        json(['data' => $stmt->fetchAll()]);
    }
    if ($uri === '/comments' && $method === 'POST') {
        $stmt = $pdo->prepare("INSERT INTO comments (article_id, author, email, content) VALUES (?, ?, ?, ?)");
        $stmt->execute([intval($input['article_id'] ?? 0), $input['author'] ?? 'Anonyme', $input['email'] ?? '', $input['content'] ?? '']);
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM comments WHERE id=?");
        $stmt->execute([$id]);
        json(['data' => $stmt->fetch()], 201);
    }

    // ----- CONTACT -----
    if ($uri === '/contact' && $method === 'GET') {
        requireAuth($pdo);
        $rows = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC")->fetchAll();
        json(['data' => $rows]);
    }
    if ($uri === '/contact' && $method === 'POST') {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$input['name'] ?? '', $input['email'] ?? '', $input['subject'] ?? '', $input['message'] ?? '']);
        json(['success' => true, 'message' => 'Message envoye avec succes']);
    }

    // ----- NEWSLETTER -----
    if ($uri === '/newsletter' && $method === 'POST') {
        $stmt = $pdo->prepare("INSERT OR IGNORE INTO newsletters (email) VALUES (?)");
        $stmt->execute([$input['email'] ?? '']);
        json(['success' => true, 'message' => 'Inscription reussie']);
    }

    // ----- SEARCH -----
    if (str_starts_with($uri, '/search') && $method === 'GET') {
        $q = strtolower($_GET['q'] ?? '');
        $results = ['articles' => [], 'lives' => [], 'podcasts' => []];
        if ($q) {
            $like = '%' . $q . '%';
            $stmt = $pdo->prepare(ARTICLE_SELECT . " WHERE (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?) AND a.published = 1 ORDER BY a.created_at DESC LIMIT 10");
            $stmt->execute([$like, $like, $like]);
            $results['articles'] = $stmt->fetchAll();

            $stmt = $pdo->prepare("SELECT * FROM lives WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT 10");
            $stmt->execute([$like, $like]);
            $results['lives'] = $stmt->fetchAll();

            $stmt = $pdo->prepare("SELECT * FROM podcasts WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT 10");
            $stmt->execute([$like, $like]);
            $results['podcasts'] = $stmt->fetchAll();
        }
        json($results);
    }

    // ----- UPLOAD -----
    if ($uri === '/upload/multiple' && $method === 'POST') {
        requireAuth($pdo);
        $count = 0;
        if (!empty($_FILES['files'])) {
            foreach ($_FILES['files']['tmp_name'] as $i => $tmp) {
                if ($tmp && ($name = storeUpload($tmp, (int)$_FILES['files']['size'][$i]))) {
                    $url = './images/' . $name;
                    $pdo->prepare("INSERT INTO media (filename, original_name, url, size, type) VALUES (?, ?, ?, ?, ?)")
                        ->execute([$name, $_FILES['files']['name'][$i], $url, $_FILES['files']['size'][$i], $_FILES['files']['type'][$i]]);
                    $count++;
                }
            }
        }
        json(['success' => true, 'count' => $count]);
    }
    if ($uri === '/upload' && $method === 'GET') {
        requireAuth($pdo);
        $rows = $pdo->query("SELECT * FROM media ORDER BY created_at DESC")->fetchAll();
        json(['data' => $rows]);
    }
    if ($uri === '/upload' && $method === 'POST') {
        requireAuth($pdo);
        if (!empty($_FILES['file'])) {
            $name = storeUpload($_FILES['file']['tmp_name'], (int)$_FILES['file']['size']);
            if (!$name) json(['error' => 'Fichier refuse : image JPG, PNG, WebP ou GIF de 10 Mo maximum'], 400);
            $url = './images/' . $name;
            $pdo->prepare("INSERT INTO media (filename, original_name, url, size, type) VALUES (?, ?, ?, ?, ?)")
                ->execute([$name, $_FILES['file']['name'], $url, $_FILES['file']['size'], $_FILES['file']['type']]);
            json(['url' => $url, 'filename' => $name]);
        }
        json(['error' => 'Aucun fichier'], 400);
    }
    if (preg_match('#^/upload/(.+)$#', $uri, $m) && $method === 'DELETE') {
        requireAuth($pdo);
        $filename = basename($m[1]);
        // Only files registered as uploaded media can be deleted
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM media WHERE filename = ?");
        $stmt->execute([$filename]);
        if (!$stmt->fetchColumn()) json(['error' => 'Fichier non trouve'], 404);
        $filepath = UPLOAD_DIR . $filename;
        if (is_file($filepath)) unlink($filepath);
        $pdo->prepare("DELETE FROM media WHERE filename = ?")->execute([$filename]);
        json(['success' => true]);
    }

    // ----- PROGRAMS -----
    if ($uri === '/programs' && $method === 'GET') {
        $rows = $pdo->query("SELECT * FROM programs ORDER BY id")->fetchAll();
        json(['data' => $rows]);
    }

    // ----- RADIO -----
    if ($uri === '/radio/stream' && $method === 'GET') {
        json(['data' => ['stream_url' => RADIO_STREAM_URL, 'title' => 'Success Media Radio']]);
    }

    // ----- EXPORT -----
    if (str_starts_with($uri, '/export') && $method === 'GET') {
        requireAuth($pdo);
        json(['success' => true, 'message' => 'Export en cours de developpement']);
    }

    // ----- 404 Fallback -----
    json(['error' => 'Endpoint non trouve'], 404);

} catch (Throwable $e) {
    // Details go to the server log only, never to the client
    error_log('[SMTV API] ' . $e);
    json(['error' => 'Erreur serveur'], 500);
}

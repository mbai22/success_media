<?php
// ============================================================
// Success Media TV — front controller (SEO)
// Serves the SPA shell (index.html) with, for each URL:
// title, description, canonical, Open Graph / Twitter tags,
// JSON-LD structured data and a crawlable HTML version of the content.
// ============================================================

const SITE_URL = 'https://successmedia-tv.com';
const SITE_NAME = 'Success Media TV';
const SITE_TAGLINE = 'Le business en temps réel';
const DEFAULT_DESCRIPTION = 'Success Media TV, média tchadien basé à Sarh : actualité économique, finance, business, entrepreneuriat, tech, leadership et opportunités au Tchad.';
const DEFAULT_IMAGE = '/icon-512.png';
const SOCIAL_PROFILES = [
    'https://www.facebook.com/profile.php?id=100085107969362',
    'https://www.youtube.com/@successmediatv-w4b',
    'https://www.linkedin.com/company/successmediatv/',
];
// Rubriques of the navigation (same order as RUBRIQUES in js/app-core.js)
const RUBRIQUE_SLUGS = ['economie', 'finance', 'business', 'entrepreneuriat', 'technologie', 'leadership', 'analyses', 'opportunites'];

function h(?string $s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function absoluteUrl(?string $path): string {
    $path = (string)$path;
    if (preg_match('#^https?://#i', $path)) return $path;
    return SITE_URL . '/' . ltrim(preg_replace('#^\./#', '', $path), '/');
}

function shorten(string $text, int $max = 158): string {
    $text = trim(preg_replace('/\s+/u', ' ', $text));
    if (mb_strlen($text) <= $max) return $text;
    $cut = mb_substr($text, 0, $max - 1);
    $space = mb_strrpos($cut, ' ');
    return rtrim($space > 80 ? mb_substr($cut, 0, $space) : $cut, " ,;:.") . '…';
}

function isoDate(?string $date): ?string {
    if (!$date) return null;
    $ts = strtotime($date);
    return $ts ? date('c', $ts) : null;
}

function frenchDate(?string $date): string {
    $ts = $date ? strtotime($date) : false;
    if (!$ts) return '';
    $months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return date('j', $ts) . ' ' . $months[(int)date('n', $ts) - 1] . ' ' . date('Y', $ts);
}

function db(): ?PDO {
    static $pdo = false;
    if ($pdo !== false) return $pdo;
    $path = __DIR__ . '/api/data/success.db';
    try {
        $pdo = is_file($path) ? new PDO('sqlite:' . $path, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]) : null;
    } catch (Throwable $e) {
        $pdo = null;
    }
    return $pdo;
}

function query(string $sql, array $params = []): array {
    $pdo = db();
    if (!$pdo) return [];
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    } catch (Throwable $e) {
        return [];
    }
}

const ARTICLE_SQL = "SELECT a.*, c.name AS category_name FROM articles a LEFT JOIN categories c ON c.slug = a.category_slug";

function articleList(array $articles): string {
    if (!$articles) return '<p>Aucun article pour le moment.</p>';
    $html = '<ul>';
    foreach ($articles as $a) {
        $html .= '<li><a href="/article/' . rawurlencode($a['slug']) . '">' . h($a['title']) . '</a>'
            . ($a['created_at'] ? ' <time datetime="' . h(isoDate($a['created_at'])) . '">' . h(frenchDate($a['created_at'])) . '</time>' : '')
            . ($a['excerpt'] ? '<p>' . h($a['excerpt']) . '</p>' : '') . '</li>';
    }
    return $html . '</ul>';
}

function rubriquesNav(): string {
    $names = [];
    foreach (query("SELECT slug, name FROM categories") as $c) $names[$c['slug']] = $c['name'];
    $html = '<nav aria-label="Rubriques"><ul><li><a href="/">Accueil</a></li>';
    foreach (RUBRIQUE_SLUGS as $slug) {
        $html .= '<li><a href="/rubrique/' . $slug . '">' . h($names[$slug] ?? ucfirst($slug)) . '</a></li>';
    }
    return $html . '<li><a href="/actualites">Toutes les actualités</a></li><li><a href="/lives">Lives</a></li>'
        . '<li><a href="/podcasts">Podcasts</a></li><li><a href="/a-propos">À propos</a></li></ul></nav>';
}

function breadcrumbLd(array $items): array {
    $list = [];
    foreach ($items as $i => [$name, $path]) {
        $list[] = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $name, 'item' => SITE_URL . $path];
    }
    return ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $list];
}

// ---------- Route ----------
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
$path = '/' . trim($path, '/');
$page = max(1, (int)($_GET['page'] ?? 1));

$status = 200;
$robots = 'index, follow, max-image-preview:large';
$title = SITE_NAME . ' — ' . SITE_TAGLINE . ' au Tchad';
$description = DEFAULT_DESCRIPTION;
$canonical = '/';
$image = DEFAULT_IMAGE;
$ogType = 'website';
$extraMeta = '';
$ld = [];
$body = '';

$publisher = [
    '@type' => 'NewsMediaOrganization',
    '@id' => SITE_URL . '/#organisation',
    'name' => SITE_NAME,
    'url' => SITE_URL . '/',
    'logo' => ['@type' => 'ImageObject', 'url' => SITE_URL . '/icon-512.png', 'width' => 512, 'height' => 512],
    'sameAs' => SOCIAL_PROFILES,
    'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Sarh', 'addressCountry' => 'TD'],
    'email' => 'ndgroupmedia89@gmail.com',
    'telephone' => '+235 66 57 65 85',
];

if ($path === '/') {
    $ld[] = ['@context' => 'https://schema.org'] + $publisher;
    $ld[] = ['@context' => 'https://schema.org', '@type' => 'WebSite', '@id' => SITE_URL . '/#site', 'name' => SITE_NAME,
        'url' => SITE_URL . '/', 'inLanguage' => 'fr', 'publisher' => ['@id' => SITE_URL . '/#organisation']];
    $latest = query(ARTICLE_SQL . " WHERE a.published = 1 ORDER BY a.created_at DESC LIMIT 12");
    if ($latest && $latest[0]['image']) $image = $latest[0]['image'];
    $body = '<h1>' . h(SITE_NAME) . ' — ' . h(SITE_TAGLINE) . '</h1><p>' . h(DEFAULT_DESCRIPTION) . '</p>'
        . '<h2>Dernières actualités</h2>' . articleList($latest);

} elseif (preg_match('#^/article/([^/]+)$#', $path, $m)) {
    $rows = query(ARTICLE_SQL . " WHERE a.slug = ? AND a.published = 1", [$m[1]]);
    if ($rows) {
        $a = $rows[0];
        $canonical = '/article/' . rawurlencode($a['slug']);
        $title = $a['title'] . ' | ' . SITE_NAME;
        $description = shorten($a['excerpt'] ?: $a['content']);
        $image = $a['image'] ?: DEFAULT_IMAGE;
        $ogType = 'article';
        $published = isoDate($a['created_at']);
        $modified = isoDate($a['updated_at']) ?: $published;
        $extraMeta .= '<meta property="article:published_time" content="' . h($published) . '">'
            . '<meta property="article:modified_time" content="' . h($modified) . '">'
            . ($a['category_name'] ? '<meta property="article:section" content="' . h($a['category_name']) . '">' : '');
        $ld[] = [
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'mainEntityOfPage' => SITE_URL . $canonical,
            'headline' => mb_substr($a['title'], 0, 110),
            'description' => $description,
            'image' => [absoluteUrl($image)],
            'datePublished' => $published,
            'dateModified' => $modified,
            'articleSection' => $a['category_name'] ?: null,
            'inLanguage' => 'fr',
            'author' => ['@type' => 'Organization', 'name' => $a['author'] ?: SITE_NAME, 'url' => SITE_URL . '/'],
            'publisher' => $publisher,
        ];
        $crumbs = [['Accueil', '/']];
        if ($a['category_slug']) $crumbs[] = [$a['category_name'] ?: $a['category_slug'], '/rubrique/' . rawurlencode($a['category_slug'])];
        $crumbs[] = [$a['title'], $canonical];
        $ld[] = breadcrumbLd($crumbs);
        $paragraphs = '';
        foreach (preg_split('/\R+/u', (string)$a['content']) as $p) {
            if (trim($p) !== '') $paragraphs .= '<p>' . h(trim($p)) . '</p>';
        }
        $related = $a['category_slug']
            ? query(ARTICLE_SQL . " WHERE a.published = 1 AND a.category_slug = ? AND a.id != ? ORDER BY a.created_at DESC LIMIT 4", [$a['category_slug'], $a['id']])
            : [];
        $body = '<article><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a>'
            . ($a['category_slug'] ? ' › <a href="/rubrique/' . rawurlencode($a['category_slug']) . '">' . h($a['category_name'] ?: $a['category_slug']) . '</a>' : '')
            . '</nav><h1>' . h($a['title']) . '</h1>'
            . '<p><time datetime="' . h($published) . '">' . h(frenchDate($a['created_at'])) . '</time> · ' . h($a['author'] ?: SITE_NAME) . '</p>'
            . ($a['image'] ? '<img src="' . h(absoluteUrl($a['image'])) . '" alt="' . h($a['title']) . '">' : '')
            . $paragraphs . '</article>'
            . ($related ? '<h2>Dans la même rubrique</h2>' . articleList($related) : '');
    } else {
        $status = 404;
    }

} elseif (preg_match('#^/rubrique/([^/]+)$#', $path, $m) || $path === '/actualites' || $path === '/blog') {
    $slug = $m[1] ?? '';
    $category = $slug ? (query("SELECT * FROM categories WHERE slug = ?", [$slug])[0] ?? null) : null;
    if ($slug && !$category) {
        $status = 404;
    } else {
        $perPage = 12;
        $where = $slug ? "WHERE a.published = 1 AND a.category_slug = ?" : "WHERE a.published = 1";
        $params = $slug ? [$slug] : [];
        $articles = query(ARTICLE_SQL . " $where ORDER BY a.created_at DESC LIMIT $perPage OFFSET " . (($page - 1) * $perPage), $params);
        $name = $category ? $category['name'] : 'Toutes les actualités';
        $canonical = ($slug ? '/rubrique/' . rawurlencode($slug) : '/actualites') . ($page > 1 ? '?page=' . $page : '');
        $title = ($category ? $name . ' — Actualités et analyses' : 'Toutes les actualités') . ($page > 1 ? ' (page ' . $page . ')' : '') . ' | ' . SITE_NAME;
        $description = $category
            ? shorten($name . ' : ' . ($category['description'] ?: 'les dernières actualités') . '. Suivez la rubrique ' . $name . ' de Success Media TV, le business en temps réel au Tchad.')
            : 'Toute l’actualité économique et business du Tchad par Success Media TV : économie, finance, entrepreneuriat, tech, leadership et opportunités.';
        if ($articles && $articles[0]['image']) $image = $articles[0]['image'];
        if ($page > 1 && !$articles) $status = 404;
        // An empty rubrique is not indexed until its first article (avoids "thin content")
        if (!$articles) $robots = 'noindex, follow';
        $ld[] = breadcrumbLd($category ? [['Accueil', '/'], [$name, '/rubrique/' . rawurlencode($slug)]] : [['Accueil', '/'], ['Actualités', '/actualites']]);
        $ld[] = ['@context' => 'https://schema.org', '@type' => 'CollectionPage', 'name' => $name, 'url' => SITE_URL . $canonical, 'inLanguage' => 'fr',
            'isPartOf' => ['@id' => SITE_URL . '/#site']];
        $body = '<h1>' . h($name) . '</h1><p>' . h($description) . '</p>' . articleList($articles);
    }

} else {
    $pages = [
        '/lives' => ['Lives et replays', 'Regardez Success Media TV en direct et retrouvez nos émissions en replay : débats, interviews et actualité économique depuis Sarh, Tchad.'],
        '/podcasts' => ['Podcasts', 'Écoutez les podcasts de Success Media TV : entrepreneuriat, leadership, économie et parcours inspirants au Tchad.'],
        '/galerie' => ['Galerie', 'Photos et vidéos de Success Media TV : plateaux, tournages, interviews et événements au Tchad.'],
        '/a-propos' => ['À propos et contact', 'Success Media TV est un média tchadien basé à Sarh, entité du groupe ND Media-w4b. Contactez la rédaction : +235 66 57 65 85, ndgroupmedia89@gmail.com.'],
        '/emissions' => ['Grille des émissions', 'La grille des émissions de Success Media TV.'],
    ];
    if (isset($pages[$path])) {
        [$name, $description] = $pages[$path];
        $title = $name . ' | ' . SITE_NAME;
        $canonical = $path;
        $ld[] = breadcrumbLd([['Accueil', '/'], [$name, $path]]);
        if ($path === '/a-propos') $ld[] = ['@context' => 'https://schema.org', '@type' => 'AboutPage', 'url' => SITE_URL . $path, 'about' => $publisher];
        $body = '<h1>' . h($name) . '</h1><p>' . h($description) . '</p>';
    } elseif (str_starts_with($path, '/admin')) {
        $title = 'Administration | ' . SITE_NAME;
        $robots = 'noindex, nofollow';
        $canonical = null;
    } else {
        $status = 404;
    }
}

if ($status === 404) {
    $title = 'Page introuvable | ' . SITE_NAME;
    $description = DEFAULT_DESCRIPTION;
    $robots = 'noindex, follow';
    $canonical = null;
    $ld = [];
    $body = '<h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée.</p>';
}

// ---------- Render ----------
$template = file_get_contents(__DIR__ . '/index.html');
$imageUrl = absoluteUrl($image);
$head = '<meta name="robots" content="' . h($robots) . '">'
    . ($canonical !== null ? '<link rel="canonical" href="' . h(SITE_URL . $canonical) . '">' : '')
    . '<meta property="og:site_name" content="' . h(SITE_NAME) . '">'
    . '<meta property="og:locale" content="fr_FR">'
    . '<meta property="og:type" content="' . h($ogType) . '">'
    . '<meta property="og:title" content="' . h($title) . '">'
    . '<meta property="og:description" content="' . h($description) . '">'
    . ($canonical !== null ? '<meta property="og:url" content="' . h(SITE_URL . $canonical) . '">' : '')
    . '<meta property="og:image" content="' . h($imageUrl) . '">'
    . '<meta property="og:image:alt" content="' . h($title) . '">'
    . '<meta name="twitter:card" content="summary_large_image">'
    . '<meta name="twitter:title" content="' . h($title) . '">'
    . '<meta name="twitter:description" content="' . h($description) . '">'
    . '<meta name="twitter:image" content="' . h($imageUrl) . '">'
    . $extraMeta;
foreach ($ld as $data) {
    $data = array_filter($data, fn($v) => $v !== null);
    $head .= '<script type="application/ld+json">' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) . '</script>';
}

$html = preg_replace('#<title>.*?</title>#s', '<title>' . h($title) . '</title>', $template, 1);
$html = preg_replace('#<meta name="description" content="[^"]*"\s*/?>#', '<meta name="description" content="' . h($description) . '" />', $html, 1);
$html = str_replace('<!--SEO_HEAD-->', $head, $html);
// Crawlable version of the page; hidden as soon as JavaScript runs (the app renders the same content)
$html = str_replace('<!--SEO_BODY-->', '<div class="seo-prerender">' . rubriquesNav() . '<main>' . $body . '</main></div>', $html);

http_response_code($status);
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
echo $html;

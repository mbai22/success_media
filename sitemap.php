<?php
// Sitemap served on /sitemap.xml (see .htaccess and router.php)
header('Content-Type: application/xml; charset=utf-8');
$baseUrl = 'https://successmedia-tv.com';
$rubriques = ['economie', 'finance', 'business', 'entrepreneuriat', 'technologie', 'leadership', 'analyses', 'opportunites'];

$urls = [
    ['loc' => '/'],
    ['loc' => '/actualites'],
];
foreach ($rubriques as $slug) $urls[] = ['loc' => '/rubrique/' . $slug];
foreach (['/lives', '/podcasts', '/galerie', '/a-propos'] as $page) $urls[] = ['loc' => $page];

// Published articles, with their date and photo
try {
    $dbPath = __DIR__ . '/api/data/success.db';
    if (is_file($dbPath)) {
        $pdo = new PDO('sqlite:' . $dbPath, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $latest = null;
        $byRubrique = [];
        $stmt = $pdo->query("SELECT slug, title, image, category_slug, created_at, updated_at FROM articles WHERE published = 1 ORDER BY created_at DESC");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lastmod = $row['updated_at'] ?: $row['created_at'];
            $urls[] = [
                'loc' => '/article/' . rawurlencode($row['slug']),
                'lastmod' => $lastmod,
                'image' => $row['image'],
                'title' => $row['title'],
            ];
            $latest = max($latest ?? $lastmod, $lastmod);
            if ($row['category_slug']) $byRubrique[$row['category_slug']] = max($byRubrique[$row['category_slug']] ?? $lastmod, $lastmod);
        }
        // Lists change when an article is published
        foreach ($urls as &$u) {
            if ($u['loc'] === '/' || $u['loc'] === '/actualites') $u['lastmod'] = $latest;
            if (preg_match('#^/rubrique/(.+)$#', $u['loc'], $m) && isset($byRubrique[$m[1]])) $u['lastmod'] = $byRubrique[$m[1]];
        }
        unset($u);
        $urls = array_values(array_filter($urls, fn($u) => !preg_match('#^/rubrique/(.+)$#', $u['loc'], $m) || isset($byRubrique[$m[1]])));
    }
} catch (Throwable $e) {}

$x = fn($s) => htmlspecialchars((string)$s, ENT_XML1 | ENT_QUOTES, 'UTF-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
foreach ($urls as $u) {
    echo '<url><loc>' . $x($baseUrl . $u['loc']) . '</loc>';
    if (!empty($u['lastmod']) && ($ts = strtotime($u['lastmod']))) echo '<lastmod>' . date('Y-m-d', $ts) . '</lastmod>';
    if (!empty($u['image'])) {
        $img = preg_match('#^https?://#', $u['image']) ? $u['image'] : $baseUrl . '/' . ltrim(preg_replace('#^\./#', '', $u['image']), '/');
        echo '<image:image><image:loc>' . $x($img) . '</image:loc></image:image>';
    }
    echo "</url>\n";
}
echo '</urlset>';

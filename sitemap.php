<?php
header('Content-Type: application/xml; charset=utf-8');
$baseUrl = 'https://successmedia-tv.com';

// Static pages
$pages = [
  ['loc' => '/', 'priority' => '1.0'],
  ['loc' => '/#/blog', 'priority' => '0.9'],
  ['loc' => '/#/lives', 'priority' => '0.8'],
  ['loc' => '/#/podcasts', 'priority' => '0.7'],
  ['loc' => '/#/emissions', 'priority' => '0.7'],
  ['loc' => '/#/galerie', 'priority' => '0.6'],
  ['loc' => '/#/a-propos', 'priority' => '0.5'],
];

// Try to load articles from database
try {
  $dbPath = __DIR__ . '/api/data/success.db';
  if (file_exists($dbPath)) {
    $pdo = new PDO('sqlite:' . $dbPath, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $stmt = $pdo->query("SELECT slug, created_at FROM articles ORDER BY created_at DESC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $pages[] = ['loc' => '/#/article/' . $row['slug'], 'priority' => '0.6', 'lastmod' => $row['created_at']];
    }
  }
} catch (Exception $e) {}

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
foreach ($pages as $p) {
  echo '<url>';
  echo '<loc>' . $baseUrl . htmlspecialchars($p['loc'], ENT_XML1, 'UTF-8') . '</loc>';
  echo '<priority>' . $p['priority'] . '</priority>';
  if (isset($p['lastmod'])) echo '<lastmod>' . date('Y-m-d', strtotime($p['lastmod'])) . '</lastmod>';
  echo '<changefreq>daily</changefreq>';
  echo '</url>';
}  
echo '</urlset>';

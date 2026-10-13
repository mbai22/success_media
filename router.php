<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (file_exists(__DIR__ . $uri) && $uri !== '/') {
    return false;
}
if (preg_match('#^/api/#', $uri)) {
    require __DIR__ . '/api/index.php';
    return true;
}
if ($uri === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    return true;
}
return false;

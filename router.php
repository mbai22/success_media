<?php
// Router for PHP's built-in server (development): php -S localhost:8000 router.php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($uri !== '/' && is_file(__DIR__ . $uri) && !preg_match('#^/api/data/#', $uri)) {
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
// Every page of the site: SEO tags + application
require __DIR__ . '/index.php';
return true;

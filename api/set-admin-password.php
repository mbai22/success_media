<?php
// Usage (ligne de commande uniquement) : php api/set-admin-password.php <nouveau-mot-de-passe> [utilisateur]
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
if ($argc < 2 || strlen($argv[1]) < 10) {
    fwrite(STDERR, "Usage : php api/set-admin-password.php <mot-de-passe (10 caracteres min.)> [utilisateur]\n");
    exit(1);
}
$username = $argv[2] ?? 'admin';
$pdo = new PDO('sqlite:' . __DIR__ . '/data/success.db', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
// Also revokes the current session token
$stmt = $pdo->prepare("UPDATE users SET password = ?, token = NULL WHERE username = ?");
$stmt->execute([password_hash($argv[1], PASSWORD_DEFAULT), $username]);
if (!$stmt->rowCount()) { fwrite(STDERR, "Utilisateur '$username' introuvable\n"); exit(1); }
$file = __DIR__ . '/data/admin-password.txt';
if (is_file($file)) unlink($file);
echo "Mot de passe de '$username' mis a jour.\n";

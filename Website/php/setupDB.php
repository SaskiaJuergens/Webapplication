<?
try {
  $dsn = 'mysql:host=localhost;dbname=omemory;charset=utf8mb4_general_ci';
  $username = 'localhost';
  $password = '';
  $dbh = new \PDO($dsn, $username, $password);
} catch(\Exception $e) {
  die('Interner Fehler: Die Datenbank-Verbindung konnte nicht aufgebaut werden.');
}



?>




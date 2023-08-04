<?php
// Datenbank-Zugangsdaten
$host = "localhost";
$username = "root";
$password = "";
$dbname = "omemory";

// Verbindung zur Datenbank herstellen
$con = mysqli_connect($host, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    die("Verbindung zur MySQL-Datenbank fehlgeschlagen: " . mysqli_connect_error());
}

// Daten aus der Datenbank abrufen
$result = mysqli_query($con, "SELECT * FROM level");
if (!$result) {
    die("Ung�ltige Abfrage: " . mysqli_error($con));
}

// Ein Array erstellen, um die abgerufenen Daten zu speichern
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Datenbank-Verbindung schlie�en
//wird nicht geschlossen sonst funktioniert include nicht.. wird gerade in level geschlossen (funktioniert mit close nicht)
mysqli_close($con);

// Die Daten als JSON zur�ckgeben
header("Content-type: application/json");
echo json_encode($data);

?>
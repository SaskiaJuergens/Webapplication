<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
<div class="login-background">

<?php

include 'setupDB.php';

// Datenbank-Zugangsdaten
$host = "localhost";
$username = "root";
$password = "";
$dbname = "omemory";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Verbindung zur MySQL-Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Funktion zum Einfügen der Werte in die Tabelle
function insertLevel($conn, $anzahl_karten, $spielZeit) {
    $sql = "INSERT INTO Level (anzahl_karten, spielZeit) VALUES ('$anzahl_karten', '$spielZeit')";
    if (!$conn->query($sql)) {
        $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
    } else {
        $show = '<h2>Das Level mit der Spielzeit ' . $spielZeit . " wurde hinzugefügt</h2>";
    }
    echo $show;
}

// Werte aus dem Formular abrufen und die Funktion insertLevel() aufrufen (falls sie nur bei POST-Anfragen aufgerufen werden soll).
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Werte aus dem Formular abrufen
    $level = $_POST['level'];
    $anzahl_karten = $_POST['anzahl_karten'];
    $spielZeit = $_POST['spielZeit'];

    // Daten aus dem Formular werden hinzugefügt
    // Level klammern wir erstmal aus, da wir möchten, dass dies wie in Aufg.1 gewünscht über AUTO_INCREMENT funktioniert
    insertLevel($conn, $anzahl_karten, $spielZeit);
}

 //Funktion wird in fetchdata.js auf gerufen, um die Daten zur html zu übergeben
function fetchData(){
    global $conn;
    // Daten aus der Datenbank abrufen
    $action = $_GET['action'];
    if ($action === 'fetchLevel') {
        $result = $conn->query("SELECT * FROM level");
        if (!$result) {
            die("Ungültige Abfrage: " . $conn->error);
        }

        // Ein Array erstellen, um die abgerufenen Daten zu speichern
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Die Daten als JSON zurückgeben
        header("Content-type: application/json");
        echo json_encode($data);
    } elseif ($action === 'fetchSpiel') {
        // Code for fetching data for Spiel goes here
    } else {
        die("Ungültige Aktion.");
    }
}


// Verbindung zur Datenbank schließen
$conn->close();

?>

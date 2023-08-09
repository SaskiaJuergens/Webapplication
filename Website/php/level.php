<?php
include 'setupDB.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    uploadLevel();
}

function uploadLevel(){
    global $conn;
    // Werte aus dem Formular abrufen
    $levelTable = 'Spiellevel';
    $level = $_POST['level'];
    $anzahl_karten = $_POST['anzahl_karten'];
    $spielZeit = $_POST['spielZeit'];

    // überprüfen, ob das level bereits exestiert
    $checkQuery = "SELECT * FROM $levelTable WHERE level = '$level'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        echo '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
    } else {
        // level hinzufügen
        $insertQuery = "INSERT INTO $levelTable(level, anzahl_karten, spielZeit) VALUES('$level', '$anzahl_karten', '$spielZeit')";
        
        if (!$conn->query($insertQuery)) {
            echo '<h2>Einfügen fehlgeschlagen: ' . $conn->error . '</h2>';
        } else {
            echo '<h2>Das Level mit der Spielzeit ' . $spielZeit . ' wurde hinzugefügt</h2>';
        }
    }
}

// Verbindung zur Datenbank schließen
$conn->close();
?>




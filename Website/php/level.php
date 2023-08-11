<?php
//diese Php-seite überprüft ob es das Level bereits gibt und beinhaltet den SQL-Befehl zum hinzufügen des Levels

include 'setupDB.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    uploadLevel();
}

function uploadLevel(){
    global $conn;
    // Werte aus dem Formular abrufen
    $levelTable = 'level';
    $level = $_POST['level'];
    $anzahl_karten = $_POST['anzahl_karten'];
    $spielZeit = $_POST['spielZeit'];
    

    // überprüfen, ob das level bereits exestiert
    $checkQuery = "SELECT * FROM $levelTable WHERE level = '$level'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        echo '<h2 style="color: red; font-size: 20px;">Das Level gibt es schon. Wähle ein anderes</h2>';
    } else {
        // level hinzufügen
        $sql = "INSERT INTO $levelTable(level, anzahl_karten, spielZeit) VALUES('$level', '$anzahl_karten', '$spielZeit')";
        
        if (!$conn->query($sql)) {
            echo '<h2 style="color: red; font-size: 20px;"> Einfügen fehlgeschlagen: ' . $conn->error . '</h2>';
        } else {
            echo '<h2 style="color: green; font-size: 20px;">Das Spiellevel mit der Spielzeit ' . $spielZeit . ' wurde hinzugefügt</h2>';
        }
    }
}


// Verbindung zur Datenbank schließen
$conn->close();
?>




<?php

include 'setupDB.php';

//muss testen ob richtiger Aufruf an dieser Stelle, dann kann man mehrere Funktionen in eins!
uploadLevel();

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



function uploadLevel(){
    global $conn;
// Werte aus dem Formular abrufen
  $levelTable = 'Spiellevel';   //Update consistent Wert
  $level = $_POST['level'];
  $anzahl_karten = $_POST['anzahl_karten'];
  $spielZeit = $_POST['spielZeit'];

    // der SQL-Befehl für das Hinzufügen
    // Überprüfen, ob der Kartenname bereits existiert
    $checkQuery = "SELECT * FROM $levelTable WHERE level = '$level'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        echo'<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
        } else {
            // Der SQL-Befehl für das Hinzufügen
            $sql = "INSERT INTO $cardTable(name, bild, artist) VALUES('$name', 0x" . bin2hex($blob1) . ", 0x" . bin2hex($blob2) . ")";

            if (!$conn->query($sql)) {
                echo '<h2>Einfügen fehlgeschlagen: ' . $conn->error . '</h2>';
            } else {
                echo '<h2>Das Level mit der Spielzeit ' . $spielZeit . " wurde hinzugefügt</h2>";
            }
        }
     }
}

// Verbindung zur Datenbank schließen
$conn->close();

?>



<?php

// Verbindung zur MySQL-Datenbank herstellen
include 'setupDB.php';
global $conn;


// SQL-Abfrage ausführen, um Daten abzurufen
$sql = "SELECT * FROM spieler WHERE id= $id";
$result = $conn->query($sql);

// Überprüfen, ob Daten gefunden wurden
if ($result->num_rows > 0) {
    // Daten in einer Schleife abrufen und anzeigen
    while ($row = $result->fetch_assoc()) {
        echo "<p>" . $row["vorname"] . "</p>",
             "<p>" . $row["nachname"] . "</p>",
             "<p>" . $row["email"] . "</p>",
             "<p>" . $row["level"] . "</p>";
    }
} else {
    echo "Keine Daten gefunden";
}

// Verbindung zur Datenbank schließen
$conn->close();
?>

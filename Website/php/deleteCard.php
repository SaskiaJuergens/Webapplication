<?php
// Diese Php-Datei wird über XMLHttpRequest aufgerufen, um eine Karte aus der Datenbank zu löschen.

include 'setupDB.php';
global $conn;


 $rowId = $_POST["rowid"];

 // Sicherstellen, dass die übergebene ID gültig ist
 if (is_numeric($rowId)) {
            // SQL-Befehl zum Löschen der Karte mit der angegebenen ID
            $sql = "DELETE FROM karte WHERE id = $rowId";

            if ($conn->query($sql)) {
                echo "Die Karte wurde erfolgreich gelöscht.";
            } else {
                echo "Fehler beim Löschen der Karte: " . $conn->error;
            }
        } else {
            echo "Ungültige Zeilen-ID.";
        }



// Verbindung zur Datenbank schließen
$conn->close();
?>

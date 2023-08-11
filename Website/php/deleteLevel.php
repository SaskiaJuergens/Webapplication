<?php
// Diese Php-Datei wird über XMLHttpRequest aufgerufen, um eine Karte aus der Datenbank zu löschen.

include 'setupDB.php';
global $conn;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['level'])) {
        $rowId = $_POST['level'];

        // Sicherstellen, dass die übergebene ID gültig ist
        if (is_numeric($rowId)) {
            // SQL-Befehl zum Löschen des Levels mit der angegebenen ID
            $sql = "DELETE FROM Level WHERE level = $rowId";

            if ($conn->query($sql)) {
                echo "Das Level wurde erfolgreich gelöscht.";
            } else {
                echo "Fehler beim Löschen des Levels: " . $conn->error;
            }
        } else {
            echo "Ungültige Zeilen-ID.";
        }
    } else {
        echo "Zeilen-ID nicht erhalten.";
    }
} else {
    echo "Ungültige Anfrage.";
}

// Verbindung zur Datenbank schließen
$conn->close();
?>

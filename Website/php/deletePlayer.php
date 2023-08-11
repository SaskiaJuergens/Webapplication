<?php
// Diese Php-Datei wird über XMLHttpRequest aufgerufen, um eine Karte aus der Datenbank zu löschen.

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Datenbankverbindung herstellen (ersetzen Sie die Platzhalter entsprechend)
    include 'setupDB.php'; // Stellen Sie sicher, dass Ihre setupDB.php die Verbindung enthält
    global $conn;

    // Überprüfen, ob die Spieler-ID übergeben wurde
    if (isset($_POST["id"])) {
        $spielerId = $_POST["id"];

        // SQL-Abfrage zum Löschen des Spielerkontos
        $sql = "DELETE FROM spieler WHERE id = $spielerId";

        if ($conn->query($sql) === TRUE) {
            echo "Spielerkonto erfolgreich gelöscht.";
        } else {
            echo "Fehler beim Löschen des Spielerkontos: " . $conn->error;
        }
    } else {
        echo "Spieler-ID nicht übergeben.";
    }

    // Verbindung zur Datenbank schließen
    $conn->close();
}
?>

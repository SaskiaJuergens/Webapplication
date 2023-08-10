<?php
// Verbindung zur MySQL-Datenbank herstellen
include 'setupDB.php';
global $conn;


// Überprüfen, ob ein POST-Request gesendet wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Überprüfen, ob die Spieler-ID und die neuen Daten übergeben wurden
    if (isset($_POST["vorname"]) && isset($_POST["nachname"]) && isset($_POST["email"])&& isset($_POST["level"])) {
        $vorname = $_POST["vorname"];
        $nachname = $_POST["nachname"];
        $email = $_POST["email"];
        $level = $_POST["level"];

        // SQL-Abfrage zum Aktualisieren der Spielerdaten
        $sql = "UPDATE spieler SET vorname = '$vorname', nachname = $nachname , email = $email , level = $level  WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            echo "Spielerdaten erfolgreich aktualisiert.";
        } else {
            echo "Fehler beim Aktualisieren der Spielerdaten: " . $conn->error;
        }
    } else {
        echo "Fehlende Daten zum Aktualisieren der Spielerdaten.";
    }
}

// Verbindung zur Datenbank schließen
$conn->close();
?>

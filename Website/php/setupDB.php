<?php
    // Verbindung zur Datenbank herstellen
    $servername = "localhost";    // Hostname (normalerweise "localhost")
    $username = "root";           // Benutzername für die Datenbank
    $password = "";               // Passwort für die Datenbank
    $database = "omemory";        // Name der Datenbank

    $conn = new mysqli($servername, $username, $password, $database);

    // Überprüfen, ob die Verbindung erfolgreich war
    if ($conn->connect_error) {
        die("Verbindung fehlgeschlagen: " . $conn->connect_error);
    }

    // SQL-Abfrage zum Abrufen der Tabellennamen
    $sql = "SHOW TABLES";
    $result = $conn->query($sql);

    // Tabellennamen ausgeben, wenn Abfrage erfolgreich war
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row['Tables_in_omemory'] . "<br>";
        }
    } else {
        echo "Keine Tabellen gefunden.";
    }

    // Verbindung schließen
    $conn->close();
?>




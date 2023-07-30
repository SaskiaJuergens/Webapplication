<?php
// Funktion zum Abrufen der Level-Daten aus der Datenbank
function getLevelData($conn) {
    $sql = "SELECT * FROM Level";
    $result = $conn->query($sql);

    // Überprüfen, ob die Abfrage erfolgreich war
    if ($result && $result->num_rows > 0) {
        // HTML-Tabelle starten
        echo '<table border="1">';
        echo '<tr><th>Nummer</th><th>Anzahl der Karten</th><th>Spielzeit</th></tr>';

        // Daten in die Tabelle einfügen
        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $row['Level'] . '</td>'; // Hier musst du die korrekten Spaltennamen verwenden
            echo '<td>' . $row['anzahl_karten'] . '</td>';
            echo '<td>' . $row['spielZeit'] . '</td>';
            echo '</tr>';
        }

        // HTML-Tabelle schließen
        echo '</table>';
    } else {
        echo "Keine Level-Daten gefunden.";
    }
}
?>

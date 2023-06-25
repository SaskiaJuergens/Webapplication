
<?php
$servername = "localhost"; // Verbindung zum Server
$username = "root"; // Benutzername für den Datenbankzugriff (Standard: "root")
$password = ""; // Passwort für den Datenbankzugriff (Standard: "")
$dbname = "omemory"; // Name deiner Datenbank

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen, ob die Verbindung erfolgreich hergestellt wurde
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}



// Beispielabfrage
$sql = "SELECT spieler FROM deineTabelle";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Daten ausgeben
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - spielName: " . $row["spielname"]. "<br>";
    }
} else {
    echo "Keine Ergebnisse gefunden.";
}

// Verbindung schließen
$conn->close();
?>




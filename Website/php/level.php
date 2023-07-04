<?php 

//include 'setupDB.php';
// Verbindung zur Datenbank herstellen
$servername = "localhost";
$username = "root"; // Ihr Datenbank-Benutzername
$password = ""; // Ihr Datenbank-Passwort
$dbname = "omemory"; // Name Ihrer Datenbank
$show = '';

$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen, ob die Verbindung erfolgreich hergestellt wurde
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}


// Werte aus dem Formular abrufen
$level = $_POST['level'];
$anzahl_karten = $_POST['anzahl_karten'];
$spielZeit = $_POST['spielZeit'];



// SQL-Query zum Einfügen der Werte in die Tabelle
$sql = "INSERT INTO Level (level, anzahl_karten, spielZeit) VALUES ('$level', '$anzahl_karten', '$spielZeit')";
if (!$conn -> query($sql)) {
    $show = $show . '<br/>' . $sql . ': ' . $conn -> error;
} else {
    $show .= '<br/>' . $sql . ": erfolgreich!";
}
echo $show;




// Verbindung zur Datenbank schließen
$conn->close();



?>
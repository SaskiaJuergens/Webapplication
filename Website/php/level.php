<?php 

include 'setupDB.php';



// Werte aus dem Formular abrufen
$level = $_POST['level'];
$anzahl_karten = $_POST['anzahl_karten'];
$spielZeit = $_POST['spielZeit'];
$show = ' ';



// SQL-Query zum Einfügen der Werte in die Tabelle
$sql = "INSERT INTO Level (level, anzahl_karten, spielZeit) VALUES ('$level', '$anzahl_karten', '$spielZeit')";
if (!$conn -> query($sql)) {
    $show = $show . '<br/>' . $sql . ': ' . $conn -> error;
} else {
    $show .= '<p>Das Level ' . $level . " wurde hinzugefügt<p>";
}
echo $show;




// Verbindung zur Datenbank schließen
$conn->close();



?>
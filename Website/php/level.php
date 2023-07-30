<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

//diese Php-seite funktioniert richtig, wenn man sie über das Formular auf Spieleinstellung.html aufruft


include 'setupDB.php';
include 'get_level_data.php';

// Werte aus dem Formular abrufen und die Funktion insertLevel() aufrufen (falls sie nur bei POST-Anfragen aufgerufen werden soll).
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Werte aus dem Formular abrufen
    $level = $_POST['level'];
    $anzahl_karten = $_POST['anzahl_karten'];
    $spielZeit = $_POST['spielZeit'];

    // SQL-Query zum Einfügen der Werte in die Tabelle
    function insertLevel($conn, $anzahl_karten, $spielZeit) {
        $sql = "INSERT INTO Level (anzahl_karten, spielZeit) VALUES ('$anzahl_karten', '$spielZeit')";
        if (!$conn->query($sql)) {
            $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
        } else {
            $show = '<h2>Das Level mit der Spielzeit ' . $spielZeit . " wurde hinzugefügt<h2>";
        }
        echo $show;
    }


// SQL-Query zum Einfügen der Werte in die Tabelle
function insertLevel($conn, $anzahl_karten, $spielZeit) {
$sql = "INSERT INTO Level ( anzahl_karten, spielZeit) VALUES ('$anzahl_karten', '$spielZeit')";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show = '<h2>Das Level mit der Spielzeit ' . $spielZeit . " wurde hinzugefügt<h2>";
}
echo $show;
}

//Daten aus dem Formular werden hinzugefügt
//Level klammern wir erstmal aus, da wir möchten, dass dies wie in Aufg.1 gewünscht über AUTo_INCREMENT funktioniert
insertLevel($conn,$anzahl_karten, $spielZeit  );

    /*//Beipiele
    insertLevel($conn, '4', '30' );
    insertLevel($conn, '14', '10' );*/

// Verbindung zur Datenbank schließen
$conn->close();

?>
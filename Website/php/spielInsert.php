<?php
// Das PHP-Programm, um ein Buch in die Tabelle Spiel hinzuzufügen.
 include 'setupDB.php';


 insetSpiel();

function insetSpiel(){
    global $conn;
    $einzeln = $_POST['einzeln'];
    $Datetime = $_POST['Datetime'];
    $dauer = $_POST['dauer'];
    $verlauf = $_POST['verlauf'];
    $mitspieler = $_POST['mitspieler'];
    $gewinner = $_POST['gewinner'];
    $initiator = $_POST['initiator'];
    

// der SQL-Befehl für das Hinzufügen
//Fuktion zum hochladen von Werten in die Tabelle spiel

  $sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime','$dauer','$verlauf', '$mitspieler', '$gewinner','$initiator')";
  
  $response = array();

   if (!mysqli_query($conn, $sql)) {
        die("Insert fehlgeschlagen: " . mysqli_error());
    } else {
        echo "Das Spiel um $Datetime Uhr des Spielers $initiator  wurde erfolgreich hinzugefügt!";
    }

}
// Verbindung zur Datenbank schließen
$conn->close();
?> 
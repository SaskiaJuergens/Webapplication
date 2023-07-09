

<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="table-background">

<?php

include 'setupDB.php';


$show = ' ';

//Fuktion zum hochladen von Werten in die Tabelle spiel

function insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf, $mitspieler, $gewinner,$initiator) {
$sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime','$dauer','$verlauf', $mitspieler, $gewinner,$initiator)";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show = '<h2>Das Spiel um ' . $Datetime . ' Uhr wurde hinzugefügt<h2>';
}

echo $show;
}

// Beipiele hinzufügen
//funktioniert nur wenn vorher genau einmal player.php aufgrufen wurde -> da spieler vorhanden sein müssen

insertSpiel($conn, 'true', '2024-01-32 12:32:00', 18, 'false', '2', '1', '2');
insertSpiel($conn, 'false', '2023-04-37 12:32:01', 11, 'false', '1', '1', '2');
insertSpiel($conn, 'true', '2023-04-31 12:32:02', 8, 'true', '3', '1', '1');
insertSpiel($conn, 'false', '2023-04-36 12:32:03', 13, 'true', '2', '2', '1');
insertSpiel($conn, 'true', '2023-05-32 12:32:04', 2, 'false', '1', '2', '1');


//aus spielername wird id bestimmt, um in der Tabelle Spiele suchen zu können
function searchPlayer($name) {
    global $conn;

    // SQL-Abfrage erstellen
    $sql = "SELECT id FROM spieler WHERE name = '$name'";

    // Abfrage ausführen
    $result = $conn->query($sql);

    // Überprüfen, ob die Abfrage erfolgreich war
    if ($result && $result->num_rows > 0) {
        // Das erste gefundene Ergebnis abrufen und die ID in einer Variable speichern
        $row = $result->fetch_assoc();
        $id = $row["id"];

        echo "Spieler mit dem Namen '$name' wurde gefunden. ID: $id";
    } else {
        echo "Spieler mit dem Namen '$name' wurde nicht gefunden.";
    }
}

//die tabelle Spiele muss durchsucht werden nach Initiator und Mitspieler
//dafür muss aus dem Namen zunächst die ID gemacht werden
//diese tabellen werden dann ausgegeben

function getPlayerPlays($conn, $playerName) {
  //aus namen wird id bestimmt
 // SQL-Abfrage erstellen
    $sql = "SELECT id FROM spieler WHERE spielname = '$playerName'";

    // Abfrage ausführen
    $result = $conn->query($sql);

    // Überprüfen, ob die Abfrage erfolgreich war
    if ($result && $result->num_rows > 0) {
        // Das erste gefundene Ergebnis abrufen und die ID in einer Variable speichern
        $row = $result->fetch_assoc();
        $id = $row["id"];

        echo "Spieler mit dem Namen '$playerName' wurde gefunden. ID: $id";
    } else {
        echo "Spieler mit dem Namen '$playerName' wurde nicht gefunden.";
    }



    // SQL-Abfrage ob die spieler id initiator oder mitspieler in den tupeln der tabelle spiel ist
    $sql1 = "SELECT * FROM spiel WHERE initiator = '$id' OR mitspieler = '$id'";

    // Abfrage ausführen
    $result = $conn->query($sql1);

    // Überprüfen der Abfrage
    if ($result && $result->num_rows > 0) {
        // Datensätze ausgeben
        while ($row = $result->fetch_assoc()) {
            $resultArray[] = $row;
        }
            echo json_encode($resultArray);
       
    } else {
        // JSON-Array wird erstellt
        $jsonArray = array("error" => "Keine Spiele gefunden.");

      
        echo json_encode($jsonArray);
    }
}

// Beispielaufruf der Funktion
//funktioniert nur wenn vorher genau einmal player.php aufgrufen wurde -> da spieler vorhanden sein müssen
$searchPlayer = "Susanne Tester"; // Der Name des Spielers, nach dem gesucht werden soll
getPlayerPlays($conn, $searchPlayer);





// Verbindung zur Datenbank schließen
$conn->close();

?>

        <div>

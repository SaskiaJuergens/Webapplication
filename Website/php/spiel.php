<?php

include 'setupDB.php';

// Datenbank-Zugangsdaten
$host = "localhost";
$username = "root";
$password = "";
$dbname = "omemory";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Verbindung zur MySQL-Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$show = ' ';

//Fuktion zum hochladen von Werten in die Tabelle spiel

//Fuktion zum hochladen von Werten in die Tabelle spiel
function insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf, $mitspieler, $gewinner,$initiator) {
  $sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime','$dauer','$verlauf', '$mitspieler', '$gewinner','$initiator')";
  
  $response = array();

  if (!$conn->query($sql)) {
    $response["message"] = "Das Level gibt es schon. Wähle ein anderes";
  } else {
    $response["message"] = "Das Spiel wurde erfolgreich hochgeladen.";
  }

  // CORS-Header setzen
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Content-Type: application/json");

  echo json_encode($response);
}


/*// Beipiele hinzufügen
//funktioniert nur wenn vorher genau einmal player.php aufgrufen wurde -> da spieler vorhanden sein müssen

insertSpiel($conn, 'true', '2024-01-32 12:32:00', 18, 'false', '2', '1', '2');
insertSpiel($conn, 'false', '2023-04-37 12:32:01', 11, 'false', '1', '1', '2');
insertSpiel($conn, 'true', '2023-04-31 12:32:02', 8, 'true', '3', '1', '1');
insertSpiel($conn, 'false', '2023-04-36 12:32:03', 13, 'true', '2', '2', '1');
insertSpiel($conn, 'true', '2023-05-32 12:32:04', 2, 'false', '1', '2', '1');*/


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

 //Funktion wird in fetchdata.js auf gerufen, um die Daten zur html zu übergeben
function fetchData(){
    global $conn;
    // Daten aus der Datenbank abrufen
    $action = $_GET['action'];
    if ($action === 'fetchSpiel') {
        $result = $conn->query("SELECT * FROM spiel");
        if (!$result) {
            die("Ungültige Abfrage: " . $conn->error);
        }

        // Ein Array erstellen, um die abgerufenen Daten zu speichern
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Die Daten als JSON zurückgeben
        header("Content-type: application/json");
        echo json_encode($data);
    } elseif ($action === 'fetchSpiel') {
        // Code for fetching data for Spiel goes here
    } else {
        die("Ungültige Aktion.");
    }
}

// Verbindung zur Datenbank schließen
$conn->close();

?>

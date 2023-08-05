<?php
include 'setupDB.php';

function insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf, $mitspieler, $gewinner, $initiator) {
  $sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime', '$dauer', '$verlauf', '$mitspieler', '$gewinner', '$initiator')";

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

  // Nur die JSON-Antwort zurückgeben, keine anderen Ausgaben
  die(json_encode($response));
}

// Überprüfe, ob die Anfrage an `spielTest.php` ein POST-Request ist
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Die POST-Daten abrufen (diese müssen entsprechend deinen JavaScript-Variablen angepasst werden)
  $einzeln = $_POST["einzeln"];
  $Datetime = $_POST["Datetime"];
  $dauer = $_POST["dauer"];
  $verlauf = $_POST["verlauf"];
  $mitspieler = $_POST["mitspieler"];
  $gewinner = $_POST["gewinner"];
  $initiator = $_POST["initiator"];

  // Die Funktion aufrufen, um das Spiel einzufügen
  insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf, $mitspieler, $gewinner, $initiator);
}

$conn->close();
?>

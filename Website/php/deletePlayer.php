<?php


function deleteDataFromDatabase($id) {


  include 'setupDB.php';
  global $conn;

    // SQL-Abfrage zum Löschen der Daten
    $sql = "DELETE FROM spieler WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Spieler wurde erfolgreich gelöscht.";
    } else {
        echo "Fehler beim Löschen des Spielers: " . $conn->error;
    }

    // Verbindung zur Datenbank schließen
    $conn->close();
}


?>

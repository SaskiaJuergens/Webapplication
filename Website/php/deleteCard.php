<?php
//zum löschen der Karte in einer bestimmen Zeile der html Tabelle in adminSpielinhalt.html


include 'setupDB.php';
global $conn;

$rowId = $_POST["name"];

error_reporting(E_ALL);
ini_set('display_errors', '1');

file_put_contents('debug.log', print_r($_POST, true), FILE_APPEND);


$stmt = $conn->prepare("DELETE FROM karte WHERE name = ?");
$stmt->bind_param("s", $rowId);

if ($stmt->execute()) {
    echo "Die Karte wurde erfolgreich gelöscht.";
} else {
    echo "Fehler beim Löschen der Karte: " . $stmt->error;
}
$stmt->close();

$conn->close();
?>
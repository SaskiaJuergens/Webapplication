<?php
//zum l�schen der Karte in einer bestimmen Zeile der html Tabelle in adminSpielinhalt.html

<?php
include 'setupDB.php';
global $conn;

$rowId = $_POST["name"];

error_reporting(E_ALL);
ini_set('display_errors', '1');

if (is_numeric($rowId)) {
    $stmt = $conn->prepare("DELETE FROM karte WHERE name = ?");
    $stmt->bind_param("s", $rowId);

    if ($stmt->execute()) {
        echo "Die karte wurde erfolgreich gel�scht.";
    } else {
        echo "Fehler beim L�schen der karte: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Ung�ltige Zeilen-ID.";
}

$conn->close();
?>


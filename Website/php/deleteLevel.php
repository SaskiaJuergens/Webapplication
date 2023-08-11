<?php
include 'setupDB.php';
global $conn;

$rowId = $_POST["level"];

error_reporting(E_ALL);
ini_set('display_errors', '1');

if (is_numeric($rowId)) {
    $stmt = $conn->prepare("DELETE FROM Level WHERE level = ?");
    $stmt->bind_param("i", $rowId);

    if ($stmt->execute()) {
        echo "Das Level wurde erfolgreich gelöscht.";
    } else {
        echo "Fehler beim Löschen des Levels: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Ungültige Zeilen-ID.";
}

$conn->close();
?>


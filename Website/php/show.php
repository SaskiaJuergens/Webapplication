<?php
// Das PHP-Programm, um die vorhandenen Bücher aus der Tabelle zu laden. Die Bücher werden als eine JSON-Datei an allscript.js zurückgescheckt.

include "initDB.php";

$cardTable = 'Karte';
$sql = "SELECT * FROM $cardTable";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    $imageData = base64_encode($row['bild']);
    $src = 'data:image/png;base64,' . $imageData;
    $rows[] = array('titel'=>$row['titel'], 'anzahl'=>$row['anzahl'],'bild'=>$src);
} 

$ps = json_encode($rows);
echo ($ps);
$conn->close();
?> 
<?php
// Das PHP-Programm, um die vorhandenen B�cher aus der Tabelle zu laden. Die B�cher werden als eine JSON-Datei an allscript.js zur�ckgescheckt.

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
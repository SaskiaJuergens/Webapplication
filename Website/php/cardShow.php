<?php
// Das PHP-Programm, um die vorhandenen Bücher aus der Tabelle zu laden. Die Bücher werden als eine JSON-Datei an allscript.js zurückgescheckt.
//funktioniert


include "setupDB.php";

$tname = 'karte';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    $imageData = base64_encode($row['bild']);
    $src = 'data:image/png;base64,' . $imageData;
    
    $rows[] = array('name'=>$row['name'], 'bild'=>$src);
} 

$ps = json_encode($rows);
echo ($ps);
$conn->close();
?> 
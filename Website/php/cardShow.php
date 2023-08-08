<?php
// Das PHP-Programm, um die vorhandenen Bücher aus der Tabelle zu laden. Die Bücher werden als eine JSON-Datei an allscript.js zurückgescheckt.
//funktioniert


include "setupDB.php";

cardShow();

function cardShow(){
global $conn;
$tname = 'karte';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    $imageData = base64_encode($row['bild']);
    $src = 'data:image/png;base64,' . $imageData;
      $imageData = base64_encode($row['artist']);
    $src1 = 'data:image/png;base64,' . $imageData;
    
    $rows[] = array('name'=>$row['name'],'artist'=>$src1, 'bild'=>$src);
} 

$ps = json_encode($rows);
echo ($ps);
}

$conn->close();
?> 
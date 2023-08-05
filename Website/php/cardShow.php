<?php

//hier werden die karten geladen um sie anschließend mit Ajax anzuzeigen

include 'setupDB.php';


include "initDB.php";

$tname = 'card';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    $imageData = base64_encode($row['bild']);
    $src = 'data:image/png;base64,' . $imageData;
    $rows[] = array('titel'=>$row['titel'], 'anzahl'=>$row['anzahl'],'bild'=>$src);
} 

$ps = json_encode($rows);
echo ($ps);


// Verbindung zur Datenbank schließen
$conn->close();

?>
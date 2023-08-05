<?php
// Das PHP-Programm, um die vorhandenen Karten aus der Tabelle zu laden. Die Karten werden als JSON an allscript.js zur�ckgesendet.

include 'setupDB.php';

$cardTable = 'karte';
$sql = "SELECT * FROM $cardTable";
$result = $conn->query($sql);
$rows = array();

    // Das PHP-Programm, um die Tabelle anzulegen.
    $sql1 = "CREATE TABLE IF NOT EXISTS karte (id INT(6) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30), artist INT, bild BLOB)";
    $conn->query($sql1) or die('An error occured 1: ' . mysql_error());
    echo ("Die Tabelle karte wurde erfolgreich angelegt!")

while ($row = $result->fetch_assoc()) {
    $imageData = base64_encode($row['bild']);
    $src = 'data:image/png;base64,' . $imageData;
    $rows[] = array('name'=>$row['name'], 'bild'=>$src, 'artist'=>$row['artist']);
} 

$cards = json_encode($rows);
echo ($cards);
$conn->close();
?>

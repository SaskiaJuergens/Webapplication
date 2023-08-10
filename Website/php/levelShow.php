<?php


include "setupDB.php";

levelShow();

function levelShow(){
global $conn;
$tname = 'Spiellevel';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    
    $rows[] = array('level'=>$row['level'], 'spielZeit'=>$row['spielZeit'], 'anzahl_karten'=>$row['anzahl_karten']);
} 

$ps = json_encode($rows);
echo ($ps);
}

$conn->close();
?> 
<?php


include "setupDB.php";

levelShow();

function levelShow(){
global $conn;
$tname = 'level';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    
    $rows[] = array('level'=>$row['level'], 'anzahl_karten'=>$row['anzahl_karten'], 'spielZeit'=>$row['spielZeit']);
} 

$ps = json_encode($rows);
echo ($ps);
}

$conn->close();
?> 


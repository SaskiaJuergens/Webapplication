<?php


include "setupDB.php";

cardShow();

function cardShow(){
global $conn;
$tname = 'Spiel';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    
    $rows[] = array('einzeln'=>$row['einzeln'], 'Datetime'=>$row['Datetime'], 'dauer'=>$row['dauer'],'verlauf'=>$row['verlauf'],'mitspieler'=>$row['mitspieler'],,'gewinner'=>$row['gewinner'],'initiator'=>$row['initiator']);
} 

$ps = json_encode($rows);
echo ($ps);
}

$conn->close();
?> 


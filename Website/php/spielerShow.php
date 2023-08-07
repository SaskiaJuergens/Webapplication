<?php


include "setupDB.php";

cardShow();

function cardShow(){
global $conn;
$tname = 'spieler';
$sql = "SELECT * FROM $tname";
$result = $conn->query($sql);
$rows = array();
while ($row = $result->fetch_assoc()) {
    
    $rows[] = array('id'=>$row['id'], 'spielname'=>$row['spielname'], 'email'=>$row['email'],'passwort'=>$row['passwort'],'level'=>$row['level']);
} 

$ps = json_encode($rows);
echo ($ps);
}

$conn->close();
?> 


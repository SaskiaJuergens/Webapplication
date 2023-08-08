

<?php
// Das PHP-Programm, um die vorhandenen Bücher aus der Tabelle zu laden. Die Bücher werden als eine JSON-Datei an allscript.js zurückgesendet.
// Funktioniert

include "setupDB.php";

levelShow();

function levelShow(){
    global $conn;
    $tname = 'level';
    $sql = "SELECT * FROM $tname";
    $result = $conn->query($sql);
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $Level = $row['Level']; // Korrektur: Hier die Spaltennamen verwenden
        $anzahl_karten = $row['anzahl_karten']; // Korrektur: Hier die Spaltennamen verwenden
        $spielZeit = $row['spielZeit']; // Korrektur: Hier die Spaltennamen verwenden

        $rows[] = array('Level'=>$Level, 'anzahl_karten'=>$anzahl_karten, 'spielZeit'=>$spielZeit);
    } 

    $ps = json_encode($rows);
    echo ($ps);
}

$conn->close();
?> 


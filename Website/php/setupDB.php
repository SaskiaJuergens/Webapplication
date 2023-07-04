<?php
    // Verbindung zur Datenbank herstellen
    $servername = "localhost";    // Hostname (normalerweise "localhost")
    $username = "root";           // Benutzername für die Datenbank
    $password = "";               // Passwort für die Datenbank
    $database = "omemory";        // Name der Datenbank




    $conn = new mysqli($servername, $username, $password, $database);

    // Überprüfen der Verbindung
    if ($conn->connect_error) {
        die("keine Verbindung (Fehler): " . $conn->connect_error);
    }

      // Name und Attribute für eine karte
    //wir haben in unserem Spiel noch einen Titel und ein zweites bild vom Künstler. Diese werden hier hinzugefügt
$tname = 'karte';
$name1 = 'id';
$name2 = 'bild';
$name3 = 'artist';
$name4 = 'name';
$type1 = 'varchar(30) PRIMARY KEY';
$type2 = 'MEDIUMBLOB NOT NULL';
$type3 = 'MEDIUMBLOB NOT NULL';
$type4 = 'varchar(30)';

//Name und Attribute für level
// Tabelle erzeugen, falls noch nicht vorhanden sind
$sql1 = "CREATE TABLE If NOT EXISTS $tname ($name1 $type1, $name2 $type2, $name3 $type3, $name4 $type4)";
if (!$conn -> query($sql1)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}

    // Name und Attribute für DB level
    //wir haben in unserem Spiel noch einen Titel und ein zweites bild vom Künstler. Diese werden hier hinzugefügt
$lname = 'level';
$lname1 = 'Level';
$lname2 = 'anzahl_karten';
$lname3 = 'spielZeit';

$ltype1 = 'INT PRIMARY KEY';
$ltype2 = 'INT';
$ltype3 = 'INT';



// Tabelle erzeugen, falls noch nicht vorhanden sind
$sql2 = "CREATE TABLE If NOT EXISTS $lname ($lname1 $ltype1, $lname2 $ltype2, $lname3 $ltype3)";
if (!$conn -> query($sql2)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}

//Name und Attribute für DB Spiel
$sname = 'Spiel';
$sname1 = 'einzeln';
$sname2 = 'Datetime';
$sname3 = 'dauer';
$sname4 = 'verlauf';
$stype1 = 'BOOLEAN ';
$stype2 = 'DATETIME PRIMARY KEY';
$stype3 = 'INT';
$stype4 = 'VARCHAR(20)';


// Tabelle erzeugen, falls noch nicht vorhanden sind
$sql3 = "CREATE TABLE If NOT EXISTS $sname ($sname1 $stype1, $sname2 $stype2, $sname3 $stype3, $sname4 $stype4)";
if (!$conn -> query($sql3)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}






?>




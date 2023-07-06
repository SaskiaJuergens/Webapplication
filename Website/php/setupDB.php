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
$type1 = 'INT(11) AUTO_INCREMENT PRIMARY KEY';
$type2 = 'MEDIUMBLOB NOT NULL';
$type3 = 'MEDIUMBLOB NOT NULL';
$type4 = 'varchar(30)';


// Tabelle Karte erzeugen, falls noch nicht vorhanden sind
$sql1 = "CREATE TABLE If NOT EXISTS $tname ($name1 $type1, $name2 $type2, $name3 $type3, $name4 $type4)";
if (!$conn -> query($sql1)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}



    // Name und Attribute für DB level
    //wir haben in unserem Spiel noch einen Titel und ein zweites bild vom Künstler. Diese werden hier hinzugefügt
    //
$lname = 'level';
$lname1 = 'Level';
$lname2 = 'anzahl_karten';
$lname3 = 'spielZeit';
$ltype1 = 'INT PRIMARY KEY';
//dies ist auch nutzbar, da wir in aufgabe eins aber auch das level eingeben sollten machen wir das hier nixht
// der User kann sich sein Level selbst aussuchen, wenn es sich nicht wedrholt (siehe level.php)

//$ltype1 = 'INT(11) AUTO_INCREMENT PRIMARY KEY';
$ltype2 = 'INT';
$ltype3 = 'INT';

// Tabelle Level erzeugen, falls noch nicht vorhanden sind
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

// Tabelle Spiel erzeugen, falls noch nicht vorhanden sind
$sql3 = "CREATE TABLE If NOT EXISTS $sname ($sname1 $stype1, $sname2 $stype2, $sname3 $stype3, $sname4 $stype4)";
if (!$conn -> query($sql3)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}




//Name und Attribute für DB Spieler
$spname = 'spieler';
$spname1 = 'id';
$spname2 = 'spielname';
$spname3 = 'email';
$spname4 = 'passwort';
$spname5 = 'level';
$sptype1 = 'INT(11) AUTO_INCREMENT PRIMARY KEY';
$sptype2 = 'VARCHAR(20)';
$sptype3 = 'VARCHAR(20)';
$sptype4 = 'VARCHAR(20)';
$sptype5 = 'INT';


// Tabelle Spieler erzeugen, falls noch nicht vorhanden sind
$sql4 = "CREATE TABLE If NOT EXISTS $spname ($spname1 $sptype1, $spname2 $sptype2, $spname3 $sptype3, $spname4 $sptype4, $spname5 $sptype5)";
if (!$conn -> query($sql4)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}

//Name und Attribute für DB Spielende - diese zeigt auf welche Spieler Gwewinnner/Verlierer oder Initiator eines Spiels sind
//Sind Spieler keins der drei dann haben sie an dem Spiel nicht teilgenommen

$spiname = 'spielende';
$spiname1 = 'Datetime';
$spiname2 = 'id';
$spiname3 = 'mitspieler';
$spiname4 = 'gewinner';
$spiname5 = 'initiator';
$spitype1 = 'DATETIME';
$spitype2 = 'INT(11)';
$spitype3 = 'BOOLEAN';
$spitype4 = 'BOOLEAN';
$spitype5 = 'BOOLEAN';
$spitype6 = 'FOREIGN KEY (Datetime) REFERENCES Spiel(Datetime)';
$spitype7 = 'FOREIGN KEY (id) REFERENCES spieler(id)';

// Tabelle Spieler erzeugen, falls noch nicht vorhanden sind
$sql5 = "CREATE TABLE If NOT EXISTS $spiname ($spiname1 $spitype1, $spiname2 $spitype2, $spiname3 $spitype3, $spiname4 $spitype4, $spiname5 $spitype5, $spitype6, $spitype7)";
if (!$conn -> query($sql5)) {
    die('Tabelle-Erzeugen fehlgeschlagen: ' . $conn -> error);
}











?>




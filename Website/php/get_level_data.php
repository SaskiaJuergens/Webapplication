<?php

// Datenbank-Zugangsdaten
$host = "localhost";
$username = "root";
$password = "";
$dbname = "omemory";

// Verbindung zur Datenbank herstellen
$con = mysqli_connect($host, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    die("Verbindung zur MySQL-Datenbank fehlgeschlagen: " . mysqli_connect_error());
}

// Daten aus der Datenbank abrufen
$result = mysqli_query($con, "SELECT * FROM level");
if (!$result) {
    die("Ung�ltige Abfrage: " . mysqli_error($con));
}

// Ein Array erstellen, um die abgerufenen Daten zu speichern
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Datenbank-Verbindung schlie�en
//wird nicht geschlossen sonst funktioniert include nicht.. wird gerade in level geschlossen (funktioniert mit close nicht)
mysqli_close($con);

// Die Daten als JSON zur�ckgeben
header("Content-type: application/json");
echo json_encode($data);


/*
//Lese Daten ein aus Datenbank
 $con = mysqli_connect("localhost", "root", "");
 mysqli_select_db($con, "omemory");
 $result = mysqli_query($con, "SELECT * FROM level");

 //check connection
 if($con->connect_error){
    die("Connection failed: " . $connection->connect_error);
 }

    if(!$result){
        die("Invalid query: " . $connection->error);
    }

    while ($row = $result->fetch_assoc()){
        echo '<tr>
            <td>" . $row["Level"] . "</td>
            <td>" . $row["anzahl_karten"] . "</td>
            <td>" . $row["spielZeit"] . "</td>
        </tr>';
}

//<td><a class='btn btn-danger btn-sm' href='delete'>Delete</a></td>*/
?>
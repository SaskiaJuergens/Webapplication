<?php
    // Das PHP-Programm, um ein Buch in die Tabelle book hinzuzufügen.
   include 'setupDB.php';
  $einzeln = $_POST["einzeln"];
  $Datetime = $_POST["Datetime"];
  $dauer = $_POST["dauer"];
  $verlauf = $_POST["verlauf"];
  $mitspieler = $_POST["mitspieler"];
  $gewinner = $_POST["gewinner"];
  $initiator = $_POST["initiator"];
    // der SQL-Befehl für das Hinzufügen
   $sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime', '$dauer', '$verlauf', '$mitspieler', '$gewinner', '$initiator')";

    if (!mysqli_query($conn, $sql)) {
        die("Insert fehlgeschlagen: " . mysqli_error());
    } else {
        echo "Das Spiel mit der Uhrzeit $Datetime wurde erfolgreich hinzugefügt!";
    }

    $conn -> closs();
?> 
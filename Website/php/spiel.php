

<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

include 'setupDB.php';


$show = ' ';

// SQL-Query zum Einfügen der Werte in die Tabelle

function insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf, $mitspieler, $gewinner,$initiator) {
$sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf, mitspieler, gewinner, initiator) VALUES ('$einzeln', '$Datetime','$dauer','$verlauf', $mitspieler, $gewinner,$initiator)";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show = '<h2>Das Spiel um ' . $Datetime . ' Uhr wurde hinzugefügt<h2>';
}

echo $show;
}

// Beipiele hinzufügen
//das muss mit verschiedenen beispielen ausgetauscht werden

insertSpiel($conn, 'true', '2024-01-32 12:32:00', 18, 'false', '4', '1', '4');
insertSpiel($conn, 'true', '2023-04-37 12:32:01', 18, 'false', '4', '1', '4');
insertSpiel($conn, 'true', '2023-04-31 12:32:02', 18, 'false', '3', '1', '3');
insertSpiel($conn, 'true', '2023-04-36 12:32:03', 18, 'false', '2', '2', '1');
insertSpiel($conn, 'true', '2023-05-32 12:32:04', 18, 'false', '1', '2', '1');


//die tabelle Spiele muss durchsucht werden nach Initiator und Mitspieler
//diese tabellen werden dann ausgegeben

//getPlayerPlays($conn, $player){
//hier fehlt code

//}





// Verbindung zur Datenbank schließen
$conn->close();

?>

        <div>



<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

include 'setupDB.php';


$show = ' ';


// SQL-Query zum Einfügen der Werte in die Tabelle

function insertSpiel($conn, $einzeln, $Datetime, $dauer, $verlauf) {
$sql = "INSERT INTO Spiel (einzeln, Datetime, dauer, verlauf) VALUES ('$einzeln', '$Datetime','$dauer','$verlauf' )";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show = '<h2>Das Spiel um ' . $Datetime . ' Uhr wurde hinzugefügt<h2>';
}
echo $show;
}

// Beipiele hinzufügen
insertSpiel($conn, 'true', '2023-04-32 12:32:00', 18, 'false');
insertSpiel($conn, 'true', '2023-04-32 12:32:00', 18, 'false');
insertSpiel($conn, 'true', '2023-04-32 12:32:00', 18, 'false');
insertSpiel($conn, 'true', '2023-04-32 12:32:00', 18, 'false');
insertSpiel($conn, 'true', '2023-04-32 12:32:00', 18, 'false');



// Verbindung zur Datenbank schließen
$conn->close();

?>

        <div>

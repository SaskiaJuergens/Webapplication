<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

include 'setupDB.php';



// Werte aus dem Formular abrufen
$spieler = $_POST['spieler'];
$spielname = $_POST['spielname'];
$email = $_POST['email'];
$level = $_POST['level'];
$show = ' ';


// SQL-Query zum Einfügen der Werte in die Tabelle

function insertPlayer($conn, $spieler, $spielname, $email, $level) {
$sql = "INSERT INTO spieler (spieler, spielname, email, level) VALUES ('$spieler','$spielname', '$email','$level' )";
if (!$conn -> query($sql)) {
    $show = '<h2>Den Spieler gibt es schon</h2>';
} else {
    $show .= '<h2>Der Spieler' . $spieler . " wurde hinzugefügt<h2>";
}
echo $show;
}







// Verbindung zur Datenbank schließen
$conn->close();

?>

<a href="../html/SpielEinstellungen.html" Link>
          <button type="button" class="button-start">OK          </button></a
        >
        <div>

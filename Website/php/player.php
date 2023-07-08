<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

include 'setupDB.php';



// Werte aus dem Formular abrufen
$id = $_POST['id'];
$spielname = $_POST['spielname'];
$email = $_POST['email'];
$passwort = $_POST['passwort'];
$level = $_POST['level'];
$show = ' ';


// SQL-Query zum Einfügen der Werte in die Tabelle

function insertPlayer($conn, $id, $spielname, $email, $passwort, $level) {
$sql = "INSERT INTO spieler (id, spielname, email, passwort, level) VALUES ('$id','$spielname', '$email','$passwort','$level' )";
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

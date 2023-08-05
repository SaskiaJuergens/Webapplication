

<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

//diese Php-seite funktioniert richtig, wenn man sie über das Formular auf singup.html aufruft

include 'setupDB.php';



// Werte aus dem Formular abrufen
$spielname = $_POST['vorname'] .  ' ' . $_POST['nachname'];
$nachname = $_POST['nachname'];
$email = $_POST['email'];
$passwort = $_POST['password'];

//Startlevel für die Anmeldung
$level = 1;
$show = ' ';


// SQL-Query zum Einfügen der Werte in die Tabelle

function insertPlayer($conn, $spielname, $email, $passwort, $level) {
$sql = "INSERT INTO spieler (spielname, email, passwort, level) VALUES ('$spielname', '$email','$passwort','$level' )";
if (!$conn -> query($sql)) {
    $show = '<h2>Der Spieler ist schon vorhanden. Wähle einen Anderen</h2>';
} else {
    $show = '<h2>Der/Die Spieler*in ' . $spielname . ' wurde hinzugefügt<h2>';
}
echo $show;
}

// Spieler meldet sich über das Formular an und die Daten werden hochgeladen
insertPlayer($conn,  $spielname, $email, $passwort, $level);


// Verbindung zur Datenbank schließen
$conn->close();

?>


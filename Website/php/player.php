

<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

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
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show = '<h2>Der/Die Spieler*in ' . $spielname . ' wurde hinzugefügt<h2>';
}
echo $show;
}

// Spieler meldet sich über das Formular an und die Daten werden hochgeladen
insertPlayer($conn,  $spielname, $email, $passwort, $level);

//Test Player

insertPlayer($conn,  'Susanne Tester', 'susan@uni-bremen.de', 'MeinTest1234', '1');
insertPlayer($conn,  'Hermann Münz', 'hrmü@uni-bremen.de', 'SoPasswort1', '2');



// Verbindung zur Datenbank schließen
$conn->close();

?>

<a href="../html/signup.html" Link>
          <button type="button" class="button-start">OK          </button></a
        >
        <div>


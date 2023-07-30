<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php

//diese Php-seite funktioniert richtig, wenn man sie über das Formular auf Spieleinstellung.html aufruft

include 'setupDB.php';



// Werte aus dem Formular abrufen
$bild = $_FILES['bild']['tmp_name'];
$artist = $_FILES['artist']['tmp_name'];
$name = $_POST['name'];
$show = ' ';


var_dump($artist);
var_dump($name);
var_dump($bild);


function insertCard($conn, $filePath1, $filePath2, $name) {
    $show =' ';
$blob1 = file_get_contents($filePath1);
$blob2 = file_get_contents($filePath2);
$sql = "INSERT INTO karte (bild, artist,name) VALUES(0x".bin2hex($blob1).", 0x".bin2hex($blob2).", '$name')";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show .= '<h2>Das Level ' . $name . " wurde hinzugefügt<h2>";
}
echo $show;
}


/*// zwei Beispiel-Datensätze

$pfad1 = "../images/Der-Kuss 1.png";
$pfad2 = "../images/Gustav-Klimt.jpg";

insertCard($conn, $pfad1, $pfad2, 'Gustav Klimt');

$pfad3 = "../images/lesDemoisellesdAvingnon.png";
$pfad4 = "../images/pabloPicasso.jpg";

insertCard($conn, $pfad1, $pfad2, 'Pablo Picasso');*/


//Datensatz aus der Html Spiellevel hinzufügen
insertCard($conn, $bild, $artist, $name);




// Verbindung zur Datenbank schließen
$conn->close();

?>

<a href="../html/SpielEinstellungen.html" Link>
          <button type="button" class="button-start">OK          </button></a
        >
        <div>

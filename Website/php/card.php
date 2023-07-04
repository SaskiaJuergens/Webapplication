<!-- HTML code with external CSS -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
 <div class="login-background">

<?php 

include 'setupDB.php';



// Werte aus dem Formular abrufen

$bild = $_POST['bild'];
$artist = $_POST['artist'];
$name = $_POST['name'];
$show = ' ';

//id setzen 
//Aufruf der Datenbank
// SQL-Abfrage ausführen, um die Anzahl der Instanzen zu erhalten
function instanceCounter($conn){
$sql = "SELECT COUNT(*) AS total FROM Karte";
$result = $conn->query($sql);

// Überprüfen, ob die Abfrage erfolgreich war
if ($result->num_rows >= 0) {
    $row = $result->fetch_assoc();
    $instanceCount = $row["total"];
    echo "Anzahl der Instanzen: " . $instanceCount;
} else {
    echo "Keine Instanzen gefunden.";
}

$instanceCount = $instanceCount +1;
 return $instanceCount;
}



function insertLevel($conn, $id, $filePath1, $filePath2, $name) {
    $show =' ';
$blob1 = file_get_contents($filePath1);
$blob2 = file_get_contents($filePath2);
$sql = "INSERT INTO karte VALUES('$id', 0x".bin2hex($blob1).", 0x".bin2hex($blob2).", '$name')";
if (!$conn -> query($sql)) {
    $show = '<h2>Das Level gibt es schon. Wähle ein anderes</h2>';
} else {
    $show .= '<h2>Das Level ' . $name . " wurde hinzugefügt<h2>";
}
echo $show;
}


// Ein Beispiel-Datensatz

$counter = instanceCounter($conn);
$pfad1 = "../images/Der-Kuss 1.png";
$pfad2 = "../images/Gustav-Klimt.jpg";

insertLevel($conn, $counter, $pfad1, $pfad2, 'Gustav Klimt');






// Verbindung zur Datenbank schließen
$conn->close();

?>

<a href="../html/SpielEinstellungen.html" Link>
          <button type="button" class="button-start">OK          </button></a
        >
        <div>

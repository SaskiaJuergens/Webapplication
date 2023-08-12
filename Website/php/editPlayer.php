<?php


include 'setupDB.php';

global $conn;

$spielname = $_POST['vorname'] .  ' ' . $_POST['nachname'];
$nachname = $_POST['nachname'];
$email = $_POST['email'];
$passwort = $_POST['password'];
$level = $_POST['level'];

$show = '';

if (isset($_POST["action"])) {
  if ($_POST["action"] == "register") {
    register();
  } else if ($_POST["action"] == "login") {
    login();
  }
}

//testen ob, session check aufruf
if (isset($_GET["action"]) && $_GET["action"] === "check") {
    checkSession();
}

// REGISTER
//ich habe erstmal die alte insert player methode genutzt die schon da war..
// dort wird aber noch nicht abgefragt, ob es die mail schon gibt
function register(){
  global $conn;
 function isEmailRegistered($conn, $email) {


    $sql = "SELECT COUNT(*) AS count FROM spieler WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['count'] > 0;
    }

    return false;
}

if (isEmailRegistered($conn, $email)) {
    $show = '<h2>Der Spieler mit dieser E-Mail ist bereits registriert. Bitte verwende eine andere E-Mail.</h2>';
} else {
    $sql = "INSERT INTO spieler (spielname, email, passwort, level) VALUES ('$spielname', '$email','$passwort','$level' )";
    if ($conn->query($sql)) {
        $show = '<h2>Der/Die Spieler*in ' . $spielname . ' wurde bearbeitet</h2>';
    } else {
        $show = '<h2>Ein Fehler ist aufgetreten. Bitte versuche es erneut.</h2>';
    }
}

echo $show;
}



// hier hole ich die daten des angemldeten spielers, oder finde raus, dass niemand angemeldet ist
function checkSession() {
      global $conn;
    session_start();
    $response = array();

    if (isset($_SESSION["login"]) && $_SESSION["login"] === true) {
        $response["isLoggedIn"] = true;
        $response["spielerId"] = $_SESSION["id"];

        $spieler = getSpieler($_SESSION["id"]);

        if ($spieler) {
            $response["email"] = $spieler["email"];
            $response["passwort"] = $spieler["passwort"];
            $response["spielname"] = $spieler["spielname"];
            $response["level"] = $spieler["level"];
        }
    } else {
        $response["isLoggedIn"] = false;
    }

    header("Content-Type: application/json");
    echo json_encode($response);
}

// Verbindung zur Datenbank schließen
$conn->close();
?>

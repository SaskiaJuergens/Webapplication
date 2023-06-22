<?php include 'setupDB.php';

function insertLevel() {
 
// define variables and set to empty values
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["level"])) {
    $levelErr = "Level is required";
  } else {
    $level = test_input($_POST["level"]);
  }
  
  if (empty($_POST["anzahl_karten"])) {
    $anzahl_kartenErr = "Anzahl der Karten is required";
  } else {
    $anzahl_karten = test_input($_POST["anzahl_karten"]);
  }
    

  if (empty($_POST["spielZeit"])) {
    $spielZeitErr = "Gender is required";
  } else {
    $spielZeit = test_input($_POST["spielZeit"]);
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
}


?>
<?php
    include setupDB.php; 

    edit();

function edit(){
  global $conn;
  // Hier Code zum Aktualisieren des Namens in der Datenbank
  $name = $_POST["name"];

  // F�hren Sie die Aktualisierung in der Datenbank durch
  $query = "UPDATE spieler SET name = '$name';
  mysqli_query($conn, $query);
  echo "Updated Successfully";
}


// Verbindung zur Datenbank schlie�en
$conn->close();
}
?>

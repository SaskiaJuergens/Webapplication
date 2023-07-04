<?php
    // Verbindung zur Datenbank herstellen
    $servername = "localhost";    // Hostname (normalerweise "localhost")
    $username = "root";           // Benutzername für die Datenbank
    $password = "";               // Passwort für die Datenbank
    $database = "omemory";        // Name der Datenbank

    $conn = new mysqli($servername, $username, $password, $database);

    // Überprüfen der Verbindung
    if ($conn->connect_error) {
        die("keine Verbindung (Fehler): " . $conn->connect_error);
    }
    

  

    

   
?>




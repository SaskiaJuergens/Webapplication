<?php
    include setupDB.php; 
    global $conn;

if ($_GET['action'] === 'check') {
    // Hier bleibt Ihr vorhandener Code zum �berpr�fen der Sitzung
} elseif ($_POST['action'] === 'updateName') {
    // Hier Code zum Aktualisieren des Namens in der Datenbank
    $neuerName = $_POST['neuerName'];
    $spielerId = $_POST['spielerId'];

    // F�hren Sie die Aktualisierung in der Datenbank durch (z.B. mit SQL-UPDATE)

    $response = array("success" => true); // oder false, abh�ngig vom Erfolg der Aktualisierung
    echo json_encode($response);
}

}
?>

//hier kommt der code für logout rein

<?php
    session_start();
    // Löschen Session Daten
    $_SESSION = array();
    // Löschen Session
    session_destroy();
    echo $_SESSION['name'] . 
        " mit der Session-Id: ".session_id() . 
        " Logout erfolgreich";
?>
<?php

session_start();

$response = array();

if (isset($_SESSION["login"]) && $_SESSION["login"] === true) {
    $response["isLoggedIn"] = true;
    $response["spielerId"] = $_SESSION["id"];
} else {
    $response["isLoggedIn"] = false;
}

header("Content-Type: application/json");
echo json_encode($response);

?>

<?php

include 'setupDB.php';
global $conn;
session_start();

// IF
if (isset($_POST["action"])) {
  if ($_POST["action"] == "register") {
    register();
  } else if ($_POST["action"] == "login") {
    login();
  }
}

// REGISTER
function register(){
  global $conn;

  $vorname = $_POST["vorname"];
  $nachname = $_POST["nachname"];
  $email = $_POST["email"];
  $password = $_POST["password"];

  if(empty($vorname) || empty($nachname) || empty($email) || empty($password)){
    echo "Please Fill Out The Form!";
    exit;
  }

  $user = mysqli_query($conn, "SELECT * FROM spieler WHERE email = '$email'");
  if(mysqli_num_rows($user) > 0){
    echo "email is Already Taken";
    exit;
  }

  $query = "INSERT INTO spieler(vorname, nachname, email, password) VALUES('$vorname', '$nachname', '$email', '$password')";
  mysqli_query($conn, $query);
  echo "Registration Successful";
  exit;
}


// LOGIN
function login(){
 
$conn = mysqli_connect("localhost", "root", "", "omemory");

  $email = $_POST["email"];
  $password = $_POST["password"];

  $user = mysqli_query($conn, "SELECT * FROM spieler WHERE email = '$email'");
  

  if(mysqli_num_rows($user) > 0){

    $row = mysqli_fetch_assoc($user);

    if($password == $row['password']){
      echo "Login Successful";
      $_SESSION["login"] = true;
      $_SESSION["id"] = $row["id"];
      
    }
    else{
      exit;
      echo "Wrong Password";
      
    }
  }
  else{
    echo "User Not Registered";
    exit;
  }
}
?>

<?php
include "config.php";

header('Access-Control-Allow-Origin: *');

$email = $_POST["email"];
$username = $_POST["name"];
$password = $_POST["password"];

/*
$username_err = $password_err = $confirm_password_err = "";
if(empty(trim($username))){
$username_err = "Please enter a username.";
} elseif(!preg_match('/^[a-zA-Z0-9_]+$/', trim($username))){
$username_err = "Username can only contain letters, numbers, and underscores.";
}
*/

if (isset($email) && isset($username) && isset($password)) {
    $userinfo = makeNewUser($email, $username, password_hash($password, PASSWORD_DEFAULT));
    echo json_encode($userinfo);
}

?>
<?php
include("config.php");

$email = $_POST["email"];
$password = $_POST["password"];

if(isset($email) && isset($password)){
    $userinfo = checkLogin($email);
    $login = false;
    if(isset($userinfo)){
        if($userinfo[3] != password_hash($password,PASSWORD_DEFAULT)){
            http_response_code(400);
            exit;
        }
    }
    else{
        http_response_code(400);
        exit;
    }
}
?>
<?php
include("config.php");
header('Access-Control-Allow-Origin: *');

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
        http_response_code(200);
        exit;
    }

>>>>>>> cc8a46149be90aa858e1bbe511273a1c118af758
if (isset($email) && isset($password)) {
	$userinfo = checkLogin($email);
	$login = false;
	if (isset($userinfo)) {
		if (!password_verify($password, $userinfo[3])) {
			http_response_code(400);
			exit;
		} else {

			echo json_encode($userinfo);
			http_response_code(200);
			exit;
		}
	} else {


		http_response_code(400);
		exit;
	}
} else {

	http_response_code(400);
	exit;

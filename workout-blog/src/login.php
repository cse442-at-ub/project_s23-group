<?php

include("config.php");

header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$email = $_POST["email"];
$password = $_POST["password"];

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
}
?>

 

<?php
include("config.php");
header('Access-Control-Allow-Origin: *');

$id = $_POST["id"];

if (isset($id)) {
	
	$userinfo = getImages($id);
	
	if (isset($userinfo)) {
		
		echo json_encode($userinfo);
		http_response_code(200);
		exit;
	} else {


		http_response_code(400);
		exit;
	}
} else {

	http_response_code(400);
	exit;
}
?>
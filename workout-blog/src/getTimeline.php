<?php
include("config.php");
header('Access-Control-Allow-Origin: *');
$id = $_POST["userid"];
if (isset($id)) {
	
	$userinfo = getTimeline($id);
	
	if (isset($userinfo)) {
		
		echo json_encode($userinfo);
		http_response_code(200);
		exit;
	} else {

        echo "user does not exist";
		http_response_code(400);
		exit;
	}
} else {
    
    echo "user id not found";
	http_response_code(400);
	exit;
}
?>
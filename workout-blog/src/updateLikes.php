<?php
include("config.php");
header('Access-Control-Allow-Origin: *');
$id = $_POST["postid"];
$count = $_POST["likes"];
if (isset($id) && isset(count)) {
	
	updateLikes($id,$count)
	http_response_code(200);
	
} else {
    
    echo "post id not found";
	http_response_code(400);
	exit;
}
?>
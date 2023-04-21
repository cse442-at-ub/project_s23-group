<?php
// Include the configuration file with database credentials
include 'config.php';
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$postid = $_POST["postid"];
// Call the getSinglePost function to retrieve one posts
if(isset($postid)){
$posts = getSinglePost($postid);
echo json_encode($posts);
http_response_code(200);
exit;
}else{
echo "postid not set";
http_response_code(400);
exit;
}

?>
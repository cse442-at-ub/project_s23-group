<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$postid = $_POST["postid"];



if (isset($postid)) {
	
    deletePost($postid);
}

?>
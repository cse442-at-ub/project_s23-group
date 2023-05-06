<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postid= $_POST["postid"];

if (isset($postid)) {
    $result = getLikes($postid);
    echo json_encode($result);
}
?>
<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$userid= $_POST["userid"];
$postid= $_POST["postid"];

if (isset($userid) && isset($postid)) {
    $result = removeLike($userid, $postid);
    echo json_encode($result);
}
?>
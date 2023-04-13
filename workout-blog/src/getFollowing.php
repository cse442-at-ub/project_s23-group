<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$userid = $_POST["id"];
$userinfo = getFollowing($userid);
echo json_encode($userinfo);
?>
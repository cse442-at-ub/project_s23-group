<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$userid = $_POST["id"];
if (isset($userid)) {
    $userinfo = getFollowers($userid);
    echo json_encode($userinfo);
}

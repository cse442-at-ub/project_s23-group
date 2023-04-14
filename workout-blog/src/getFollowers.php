<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$userid = $_POST["id"];
if (isset($userid)) {
    $userinfo = getFollowers($userid);
    echo json_encode($userinfo);
}

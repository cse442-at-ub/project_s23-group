<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$userid = $_POST["userid"];
if (isset($userid)) {
    //echo "test";
    $userinfo = getUserInfo($userid);
    echo json_encode($userinfo);

    //echo $userinfo;
}

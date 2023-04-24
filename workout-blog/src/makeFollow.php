<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$follower = $_POST["follower"];
$following = $_POST["following"];
echo "0";

if (isset($follower) && isset($following)) {
    echo "1";
    if($follower != $following){
    $userinfo = makeNewFollow($follower, $following);
    echo json_encode($userinfo);
    }
}
?>
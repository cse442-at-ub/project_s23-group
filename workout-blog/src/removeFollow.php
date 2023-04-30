<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$follower= $_POST["follower"];
$following= $_POST["following"];

if (isset($follower) && isset($following)) {
    $result = removeFollow($follower, $following);
    echo json_encode($result);
}
?>
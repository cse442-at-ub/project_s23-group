<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$userid = $_POST["userid"];
$pfp = $_POST["pfp"];


if (isset($userid) && isset($pfp)) {
echo $userid;
    updatePost($userid, $pfp);
}

?>
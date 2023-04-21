<?php
include "configE.php";
//header('Access-Control-Allow-Origin: *');

$p_id = $_POST["p_id"];
$u_id = $_POST["u_id"];
$comment = $_POST["comment"];
$username = $_POST["username"];



echo "0";

if (isset($p_id) && isset($u_id) && isset($username) && isset($comment)) {

    echo "1";
    makeNewComment($p_id, $u_id, $username, $comment);
    echo "here";}
?>
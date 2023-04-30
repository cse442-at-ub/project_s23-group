<?php
include "configE.php";
//header('Access-Control-Allow-Origin: *');

$p_id = $_POST["p_id"];
$u_id = $_POST["u_id"];
$comment = $_POST["comment"];
$username = $_POST["username"];
$pfp = $_POST["pfp"];



echo "0";

if (isset($p_id) && isset($u_id) && isset($username) && isset($comment)&& isset($pfp)) {

    echo "1";
    makeNewComment($p_id, $u_id, $username, $comment, $pfp);
    echo "here";}
?>
<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$id = $_POST["id"];
$username = $_POST["username"];
$bio = $_POST["bio"];
$pfp = $_POST["pfp"];
$background = $_POST["background"];



if (isset($id) && isset($username) && isset($bio) && isset($pfp) && isset($background)) {
    makeNewProfile($id, $username, $bio, $pfp, $background);
}

?>
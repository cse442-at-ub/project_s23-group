<?php
include "config.php";
//header('Access-Control-Allow-Origin: *');

$id = $_POST["id"];
$title = $_POST["title"];
$caption = $_POST["caption"];
$picture = $_POST["myFile"];
$username = $_POST["username"];
$tag = $_POST["tag"];
$pfp = $_POST["pfp"];



echo "0";

if (isset($id) && isset($title) && isset($caption) && isset($picture) && isset($username) && isset($tag) && isset($pfp)) {

    echo "1";
    makeNewPost($id, $username, $title, $caption, $picture, $tag, $pfp);
    echo "here";}
?>
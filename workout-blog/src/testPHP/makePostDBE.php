<?php
include "configE.php";
//header('Access-Control-Allow-Origin: *');

$id = $_POST["id"];
$title = $_POST["title"];
$caption = $_POST["caption"];
$picture = $_POST["myFile"];
$username = $_POST["username"];
$tag = $_POST["tag"];


echo "0";

if (isset($id) && isset($title) && isset($caption) && isset($picture) && isset($username) && isset($tag)) {

    echo "1";
    makeNewPost($id, $username, $title, $caption, $picture, $tag);
    echo "here";}
?>
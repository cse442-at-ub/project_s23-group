<?php
include "config.php";
header('Access-Control-Allow-Origin: *');

$postid = $_POST["postid"];
$title = $_POST["title"];
$text = $_POST["text"];
$img = $_POST["img"];
$tag = $_POST["tag"];

if (isset($title) && isset($text) && isset($img) && isset($tag) && isset($postid)) {
   
    editPost($title, $text, $img, $tag, $postid);
 
}

?>
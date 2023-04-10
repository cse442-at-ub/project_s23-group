<?php
include "config.php";


$id = $_POST["id"];
$title = $_POST["title"];
$caption = $_POST["caption"];
$picture = $_POST["myFile"];
echo "0";

if (isset($id) && isset($title) && isset($caption) && isset($picture)) {
    echo "1";
    makeNewPost($id, $title, $caption, $picture);
    echo "2";}
?>
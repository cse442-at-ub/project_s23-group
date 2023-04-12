<?php
include "config.php";


$id = $_POST["id"];
$title = $_POST["title"];
$caption = $_POST["caption"];
$picture = $_POST["myFile"];
//$filter = $_POST["filter"];
//$username = $_POST["username"];

echo "0";

//if (isset($id) && isset($title) && isset($caption) && isset($picture) && isset($filter) && isset($username)) {
if (isset($id) && isset($title) && isset($caption) && isset($picture)) {
   
    echo "1";
   // makeNewPost($id, $title, $caption, $picture,$filter,$username);
    makeNewPost($id, $title, $caption, $picture);

    echo "2";}
?>
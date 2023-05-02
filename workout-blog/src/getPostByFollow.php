<?php
// Include the configuration file with database credentials
include 'config.php';
$userid= $_POST["userid"];

// Call the getPost function to retrieve all posts
$posts = getPostByFollow($userid);

// Set the Content-Type header to JSON
header('Content-Type: application/json');

// Convert the posts array to JSON and output it
echo json_encode($posts);
?>
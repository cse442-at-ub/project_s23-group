<?php
// Include the configuration file with database credentials
include 'config.php';

// Call the getPost function to retrieve all posts
$posts = getPostByLikes();

// Set the Content-Type header to JSON
header('Content-Type: application/json');

// Convert the posts array to JSON and output it
echo json_encode($posts);
?>
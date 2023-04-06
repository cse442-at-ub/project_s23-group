<?php
header('Access-Control-Allow-Origin: *');
define('DB_SERVER', 'oceanus.cse.buffalo.edu');
define('DB_USERNAME', 'schaefe2');
define('DB_PASSWORD', '50304810');
define('DB_DATABASE', 'cse442_2023_spring_team_w_db');

function checkLogin($email)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $prepared = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $prepared->bind_param("s", $email);
    $prepared->execute();
    $result = $prepared->get_result();

    mysqli_close($conn);

    return $result->fetch_array(MYSQLI_NUM);
}

function makeNewUser($email, $username, $password)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $username, $password);
    $stmt->execute(); // insert new user

    $stmt->close();

    $prepared = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $prepared->bind_param("s", $username);
    $prepared->execute();
    $result = $prepared->get_result();

    $userinfo = $result->fetch_array(MYSQLI_NUM);



    $stmt = $conn->prepare("INSERT INTO `profile` (id, username, bio, background, pfp) VALUES (?, ?, '', '', '')");
    $stmt->bind_param("is", $userinfo[0], $userinfo[2]);
    $stmt->execute(); // insert new user profile


    $stmt->close();
    mysqli_close($conn);
    return $userinfo;
}


function makeNewProfile($id, $username, $bio, $pfp, $background)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("UPDATE profile SET bio=?, background=?, pfp=? WHERE id = ?");
    $stmt->bind_param("sssi", $bio, $background, $pfp, $id);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();
}

function getImages($id)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $prepared = $conn->prepare("SELECT * FROM profile WHERE id = ?");
    $prepared->bind_param("i", $id);
    $prepared->execute();
    $result = $prepared->get_result();

    mysqli_close($conn);

    return $result->fetch_array(MYSQLI_NUM);
}


?>
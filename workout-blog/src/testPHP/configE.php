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
function  makeNewPost($id, $username, $title, $caption, $picture, $tag, $pfp)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO posts (userid, username, title,text,img, tag, pfp) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("issssss", $id, $username, $title, $caption, $picture, $tag, $pfp);
    $stmt->execute(); // insert new user profile
    $stmt->close();
    $conn->close();
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

function makeNewFollow($follower, $following)
{

    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO follows (follower, following) VALUES (?, ?)");
    $stmt->bind_param("ii", $follower, $following);
    $stmt->execute(); // insert new user follow
    $stmt->close();

    $stmt2 = $conn->prepare("SELECT * FROM follows WHERE follower = ?");
    $stmt2->bind_param("i", $follower);
    $stmt2->execute(); // insert new user follow

    $result = $stmt2->get_result();
    $data[] = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt2->close();


    return $data;
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

function getTimeline($id)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM posts WHERE userid = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data[] = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt->close();


    return $data;

}
function getPost()
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $stmt = $conn->prepare("SELECT * FROM posts");
    $stmt->execute();
    $result = $stmt->get_result();

    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }

    $stmt->close();
    $conn->close();

    return $posts;
}
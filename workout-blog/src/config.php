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

function makeNewPost($id, $username, $title, $caption, $picture, $tag, $pfp)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO posts (userid, username, title,text,img, tag, pfp) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("issssss", $id, $username, $title, $caption, $picture, $tag, $pfp);
    $stmt->execute(); // insert new user profile
    $stmt->close();
    $conn->close();
}

function makeNewComment($p_id, $u_id, $username, $comment)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO comments (post_id, user_id, comment, username) VALUES (?,?,?,?)");
    $stmt->bind_param("iiss", $p_id, $u_id, $comment, $username);
    $stmt->execute(); // insert new user profile
    $stmt->close();
    $conn->close();
}



function makeNewUser($email, $username, $password, $coach)
{

    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $existingEmail = $stmt->get_result();
    $stmt->close();

    if (mysqli_num_rows($existingEmail) == 0) {
        $stmt3 = $conn->prepare("INSERT INTO users (email, username, password, coach) VALUES (?, ?, ?, ?)");
        $stmt3->bind_param("sssi", $email, $username, $password, $coach);
        $stmt3->execute(); // insert new user

        $stmt3->close();
        $prepared = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $prepared->bind_param("s", $email);
        $prepared->execute();
        $result = $prepared->get_result();

        $userinfo = $result->fetch_array(MYSQLI_NUM);
        $pfp = "default.jpg";
        $bio = "Change bio in settings";
        $background = "matcha.jpg";
        $stmt = $conn->prepare("INSERT INTO `profile` (id, username, bio, background, pfp) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issss", $userinfo[0], $userinfo[2], $bio, $background, $pfp);
        $stmt->execute(); // insert new user profile

        $stmt->close();
        mysqli_close($conn);
        return $userinfo;
    } else {
        return null;
    }

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

    $stmt = $conn->prepare("SELECT following FROM follows WHERE follower = ? AND following = ?");
    $stmt->bind_param("ii", $follower, $following);
    $stmt->execute();

    $oldFollow = $stmt->get_result();
    $stmt->close();

    if (mysqli_num_rows($oldFollow) == 0) {
        $stmt2 = $conn->prepare("INSERT INTO follows (follower, following) VALUES (?, ?)");
        $stmt2->bind_param("ii", $follower, $following);
        $stmt2->execute(); // insert new user follow
        $stmt2->close();
    }
    $stmt3 = $conn->prepare("SELECT * FROM follows WHERE follower = ?");
    $stmt3->bind_param("i", $follower);
    $stmt3->execute(); // insert new user follow

    $result = $stmt3->get_result();
    $data[] = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt3->close();


    return $data;
}
function makeNewLike($userid, $postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM likes WHERE userid = ? AND postid = ?");
    $stmt->bind_param("ii", $userid, $postid);
    $stmt->execute();

    $oldLike = $stmt->get_result();
    $stmt->close();

    if (mysqli_num_rows($oldLike) == 0) {
        $stmt2 = $conn->prepare("INSERT INTO likes (userid,postid) VALUES (?, ?)");
        $stmt2->bind_param("ii", $userid, $postid);
        $stmt2->execute(); // insert new user follow
        $stmt2->close();
    }
    $stmt3 = $conn->prepare("SELECT * FROM likes WHERE postid = ?");
    $stmt3->bind_param("i", $postid);
    $stmt3->execute(); // insert new user follow

    $result = $stmt3->get_result();
    $data[] = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt3->close();


    return $data;

}
function makeDM($sender, $receiver, $message)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("INSERT INTO dms (sender,receiver,message) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $sender, $receiver, $message);
    $stmt->execute(); // insert new user profile

    $stmt->close();

    $stmt2 = $conn->prepare("SELECT * FROM dms WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)");
    $stmt2->bind_param("iiii", $sender, $receiver, $sender, $receiver);
    $stmt2->execute(); // insert new user profile

    $result = $stmt2->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt2->close();
    return $data;


    $conn->close();

}
function getDMs($userid, $targetid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM dms WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)");
    $stmt->bind_param("iiii", $userid, $targetid, $targetid, $userid);
    $stmt->execute(); // insert new user profile

    $result = $stmt->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt->close();
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

function getFavorites($userid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM posts WHERE postid IN (SELECT postid FROM likes WHERE userid = ?)");
    $stmt->bind_param("i", $userid);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt->close();
    return $data;
}
function getTimeline($id)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM posts WHERE userid = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    mysqli_close($conn);
    $stmt->close();


    return $data;
}
function getLikes($postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM likes WHERE postid = ?");
    $stmt->bind_param("i", $postid);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
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
function getPostByLikes()
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $stmt = $conn->prepare("SELECT * FROM posts ORDER BY likes DESC");
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
function getPostByFollow($userid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $stmt = $conn->prepare("SELECT * FROM posts WHERE userid IN (SELECT following FROM follows WHERE follower = ?)");
    $stmt->bind_param("i", $userid);
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

function getSinglePost($postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $stmt = $conn->prepare("SELECT * FROM posts WHERE postid = ?");
    $stmt->bind_param("i", $postid);
    $stmt->execute();
    $result = $stmt->get_result();

    //echo $stmt;
    $stmt->close();
    $conn->close();

    return $result->fetch_assoc();
}
function getFollowers($userid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM follows WHERE following = ?");
    $stmt->bind_param("i", $userid);
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
function getCoaches()
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM users WHERE coach = true");
    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    $stmt->close();
    $conn->close();

    return $data;
}

function getFollowing($userid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM follows WHERE follower = ?");
    $stmt->bind_param("i", $userid);
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
function getUserInfo($userid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("SELECT * FROM profile WHERE id = ?");
    $stmt->bind_param("i", $userid);
    $stmt->execute();
    $result = $stmt->get_result();

    //echo $stmt;
    $stmt->close();
    $conn->close();

    return $result->fetch_assoc();
}
function updatePost($id, $pfp)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("UPDATE posts SET pfp=? WHERE userid = ?");
    $stmt->bind_param("si", $pfp, $id);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();
}

function editPost($title, $text, $img, $tag, $postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("UPDATE posts SET title=?, text=?,img=?,tag=? WHERE postid = ?");
    $stmt->bind_param("ssssi", $title, $text, $img, $tag, $postid);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();
}

function deletePost($postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);



    $stmt = $conn->prepare("DELETE FROM posts WHERE postid = ?");
    $stmt->bind_param("i", $postid);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();
}
function removeLike($userid, $postid)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("DELETE FROM likes WHERE userid = ? AND postid = ?");
    $stmt->bind_param("ii", $userid, $postid);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();

}
function removeFollow($follower, $following)
{
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    $stmt = $conn->prepare("DELETE FROM follows WHERE follower = ? AND following = ?");
    $stmt->bind_param("ii", $follower, $following);
    $stmt->execute(); // insert new user profile

    $stmt->close();
    $conn->close();

}
?>
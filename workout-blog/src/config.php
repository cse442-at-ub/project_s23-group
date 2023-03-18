<?php
    define('DB_SERVER', 'oceanus.cse.buffalo.edu');
    define('DB_USERNAME', 'schaefe2');
    define('DB_PASSWORD', '50304810');
    define('DB_DATABASE', 'cse442_2023_spring_team_w_db');

    function checkLogin($email) {
        $conn = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

        $prepared = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $prepared->bind_param("s",$email);
        $prepared->execute();
        $result = $prepared->get_result();

        mysqli_close($conn);
        
        return $result->fetch_array(MYSQLI_NUM);
    }

    function makeNewUser($email, $username, $password) {
        $conn = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

        $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $username, $password);

        $stmt->execute();

        $stmt->close();
        $conn->close();
    }
?>
<?php
header('Access-Control-Allow-Origin: *');
define('DB_SERVER', 'oceanus.cse.buffalo.edu');
define('DB_USERNAME', 'schaefe2');
define('DB_PASSWORD', '50304810');
define('DB_DATABASE', 'cse442_2023_spring_team_w_db');
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

$id = $_POST["id"];

if (isset($id)) {
	
	$userinfo = getImages($id);
	
	if (isset($userinfo)) {
		
		echo json_encode($userinfo);
		http_response_code(200);
		exit;
	} else {

		http_response_code(400);
		exit;
	}
} else {

	http_response_code(400);
	exit;
}
?>
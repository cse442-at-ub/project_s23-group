<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$userid = $_POST["userid"];
$targetid = $_POST["targetid"];



if (isset($userid) && isset($targetid)) {
    $dms = getDMs($userid, $targetid);
    echo json_encode($dms);
}

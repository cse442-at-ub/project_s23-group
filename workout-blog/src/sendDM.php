<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$sender= $_POST["sender"];
$receiver= $_POST["receiver"];
$message= $_POST["message"];

if (isset($sender) && isset($receiver) && isset($message)) {
    $return  = makeDM($sender, $receiver, $message);
    echo json_encode($return);
}
?>
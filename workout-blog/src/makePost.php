<?php
header('Access-Control-Allow-Origin: *');


$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime_types = ["image/gif", "image/png", "image/jpeg"];
if (!in_array($_FILES["myFile"]["type"], $mime_types)) {
    exit("Invalid file type");
}

$pathinfo = pathinfo($_FILES["myFile"]["name"]);
$base = $pathinfo["filename"];
$base = preg_replace("/[^\w-]/", "_", $base);
$filename = $base . "." . $pathinfo["extension"];
$destination = __DIR__ . "/uploads/" . $filename;
$i = 1;

while (file_exists($destination)) {
        $filename = $base . "($i)." . $pathinfo["extension"];
        $destination = __DIR__ . "/uploads/" . $filename;
        $i++;
}
if ((!move_uploaded_file($_FILES["myFile"]["tmp_name"], $destination))){


    exit("Can't move uploaded file");

}
echo json_encode(array($filename));
?>

<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit('POST request method required');
}

if (empty($_FILES)) {
    exit('$_FILES is empty - is file_uploads set to "Off" in php.ini?');
}

if (($_FILES["background"]["error"] !== UPLOAD_ERR_OK) || ($_FILES["pfp"]["error"] !== UPLOAD_ERR_OK)) {

    switch ($_FILES["background"]["error"]) {
        case UPLOAD_ERR_PARTIAL:
            exit('File only partially uploaded');
            break;
        case UPLOAD_ERR_NO_FILE:
            exit('No file was uploaded');
            break;
        case UPLOAD_ERR_EXTENSION:
            exit('File upload stopped by a PHP extension');
            break;
        case UPLOAD_ERR_FORM_SIZE:
            exit('File exceeds MAX_FILE_SIZE in the HTML form');
            break;
        case UPLOAD_ERR_INI_SIZE:
            exit('File exceeds upload_max_filesize in php.ini');
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            exit('Temporary folder not found');
            break;
        case UPLOAD_ERR_CANT_WRITE:
            exit('Failed to write file');
            break;
        default:
            exit('Unknown upload error');
            break;
    }
}


// Use fileinfo to get the mime type
$finfo = new finfo(FILEINFO_MIME_TYPE);

$mime_types = ["image/gif", "image/png", "image/jpeg"];

if (!in_array($_FILES["background"]["type"], $mime_types) || !in_array($_FILES["pfp"]["type"], $mime_types)) {
    exit("Invalid file type");
}

// Replace any characters not \w- in the original filename
$pathinfo = pathinfo($_FILES["background"]["name"]);
$pathinfo2 = pathinfo($_FILES["pfp"]["name"]);

$base = $pathinfo["filename"];
$base2 = $pathinfo2["filename"];

$base = preg_replace("/[^\w-]/", "_", $base);
$base2 = preg_replace("/[^\w-]/", "_", $base2);

$filename = $base . "." . $pathinfo["extension"];
$filename2 = $base2 . "." . $pathinfo2["extension"];

$destination = __DIR__ . "/uploads/" . $filename;
$destination2 = __DIR__ . "/uploads/" . $filename2;


// Add a numeric suffix if the file already exists
$i = 1;
$j = 1;

while (file_exists($destination) || file_exists($destination2)) {
    if (file_exists($destination)) {
        $filename = $base . "($i)." . $pathinfo["extension"];
        $destination = __DIR__ . "/uploads/" . $filename;
        $i++;
    } else {
        $filename2 = $base2 . "($j)." . $pathinfo2["extension"];
        $destination2 = __DIR__ . "/uploads/" . $filename2;
        $j++;
    }
}

if ((!move_uploaded_file($_FILES["background"]["tmp_name"], $destination)) || (!move_uploaded_file($_FILES["pfp"]["tmp_name"], $destination2))) {


    exit("Can't move uploaded file");

}


echo json_encode(array($filename2, $filename));

// echo "File uploaded successfully.";
?>
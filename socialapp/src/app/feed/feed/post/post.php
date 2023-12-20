<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$dbHost="localhost";
$dbUsername="root"; 
$dbPassword=""; 
$dbName="social-app";
error_reporting(0); // Turn off error reporting

$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Check if file was uploaded
if (isset($_FILES['image'])) {
    $errors = array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));

    $extensions = array("jpeg", "jpg", "png");

    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "extension not allowed, please choose a JPEG or PNG file.";
    }

    if(empty($errors) == true) {
        move_uploaded_file($file_tmp, "images/".$file_name);
        $imageUrl = "http://localhost/freshstart/socialapp/src/app/feed/feed/post/images/".$file_name;
        echo "Success";

    } else {
        print_r($errors);
    }
} else {
    $imageUrl = null;
}

$userId = $_POST['userID'];
$caption = $_POST['caption'];

$stmt = $db->prepare("INSERT INTO Posts (UserID, Caption, Image_URL) VALUES (?, ?, ?)");

if ($stmt === false) {
    echo json_encode(['message' => 'Error preparing statement: ' . $db->error]);
    return;
}

$stmt->bind_param("iss", $userId, $caption, $imageUrl);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Post created successfully', 'imageUrl' => $imageUrl]);
} else {
    echo json_encode(['message' => 'Error executing statement: ' . $stmt->error]);
}
?>
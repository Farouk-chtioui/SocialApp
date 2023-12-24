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

// Get the data from the POST request
$data = json_decode(file_get_contents('php://input'), true);
error_log(print_r($data, true));
if (json_last_error() !== JSON_ERROR_NONE) {
    die('Invalid JSON received.');
}

$userId = isset($data['userID']) ? $data['userID'] : null;
$postId = isset($data['postID']) ? $data['postID'] : null;
$commentText = isset($data['commentText']) ? $data['commentText'] : null;

// Prepare the SQL statement
$stmt = $db->prepare("INSERT INTO Comments (UserID, PostID, Comment_Text) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $userId, $postId, $commentText);
$response = ['status' => 'Success'];
echo json_encode($response);
// Execute the SQL statement
if ($stmt->execute()) {
    echo "Success";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$db->close();
?>
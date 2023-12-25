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

$userId = $_GET['userId']; // Get the user ID from the request parameters

$sql = "SELECT Posts.*, Users.username, Users.Profile_Picture FROM Posts INNER JOIN Users ON Posts.UserID = Users.UserID WHERE Posts.UserID = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();

$posts = array();

while($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode($posts);

?>
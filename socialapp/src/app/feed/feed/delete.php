<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dbHost="localhost";
$dbUsername="root"; 
$dbPassword=""; 
$dbName="social-app";

$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

$postId = $_GET['id'];
$currentUserId = $_GET['userId']; // Assuming you're passing the current user's ID as a parameter

$result = $db->query("SELECT UserID FROM Posts WHERE PostID = $postId");
$post = $result->fetch_assoc();

if ($post['UserID'] == $currentUserId) {
    // If the current user is the author of the post, delete the post
    $sql = "DELETE FROM Posts WHERE PostID = $postId";
    $db->query($sql);
} else {
    // If not, return an error message
    echo "Error: Only the author of the post can delete it.";
}
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
$comments = array();
$dbHost="localhost";
$dbUsername="root"; 
$dbPassword=""; 
$dbName="social-app";

error_reporting(E_ALL);
ini_set('display_errors', 1);

$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

$db->set_charset("utf8");

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$postID = isset($_GET['postID']) ? $_GET['postID'] : null;

$stmt = $db->prepare("SELECT Users.Username AS username, Users.Profile_Picture AS profilePicture, Comments.Comment_Text AS commentText 
                      FROM Comments 
                      INNER JOIN Users ON Comments.UserID = Users.UserID 
                      WHERE Comments.PostID = ?");
$stmt->bind_param("i", $postID);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
}

echo json_encode($comments);
?>
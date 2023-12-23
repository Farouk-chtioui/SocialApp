<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$dbHost="localhost";
$dbUsername="root"; 
$dbPassword=""; 
$dbName="social-app";

$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(isset($_GET['UserID'])){
    $stmt = $db->prepare("SELECT Profile_Picture FROM Users WHERE UserID = ?");
    $stmt->bind_param("i", $_GET['UserID']);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    echo json_encode(['path' => $row['Profile_Picture']]);
}
?>
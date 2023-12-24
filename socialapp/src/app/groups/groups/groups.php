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
$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['title']) && isset($data['topic']) && isset($data['maximum_number']) && isset($data['level']) && isset($data['password'])){
    $title = $data['title'];
    $topic = $data['topic'];
    $maximum_number = $data['maximum_number'];
    $level = $data['level'];
    $password = $data['password'];

    $sql = "INSERT INTO groups (title, topic, maximum_number, level, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $db->prepare($sql);

    if ($stmt === false) {
        die("Error preparing statement: $db->error");
    }

    $bind = $stmt->bind_param("ssiss", $title, $topic, $maximum_number, $level, $password);

    if ($bind === false) {
        die("Error binding parameters: $stmt->error");
    }

    $execute = $stmt->execute();

    if ($execute === false) {
        die("Error executing statement: $stmt->error");
    }

    echo json_encode(['message' => 'Group created successfully']);
} else {
    echo json_encode(['message' => 'Required fields are missing']);
}
?>

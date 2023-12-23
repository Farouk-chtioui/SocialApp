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

if(isset($_POST['UserID']) && isset($_FILES['image'])){
    $errors= array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext = strtolower(end(explode('.',$_FILES['image']['name'])));
  
    $extensions= array("jpeg","jpg","png");
    $file_name = $_POST['UserID'] . '_' . $file_name;

    if(in_array($file_ext,$extensions)=== false){
        $errors[]="extension not allowed, please choose a JPEG or PNG file.";
    }
  
    if($file_size > 2097152){
        $errors[]='File size must be exactly 2 MB';
    }
  
    if(empty($errors)==true){
        move_uploaded_file($file_tmp,"profileImg/".$file_name);
        $profile_picture = "http://localhost/freshstart/socialapp/src/app/profile/profile/profileImg/".$file_name;
    
        $stmt = $db->prepare("UPDATE Users SET Profile_Picture = ? WHERE UserID = ?");
        $stmt->bind_param("si", $profile_picture, $_POST['UserID']);
        $stmt->execute();
    
        echo json_encode(['path' => $profile_picture]);
    }else{
        print_r($errors);
    }
}
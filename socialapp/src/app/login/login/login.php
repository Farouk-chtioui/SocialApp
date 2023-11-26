<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $conn = new PDO("mysql:host=localhost;dbname=social-app", 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Log the $_POST variable
        error_log(print_r($_POST, true));

        if(isset($_POST['username']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $password = $_POST['password'];

            $sql = "SELECT * FROM users WHERE username = :username AND password = :password";
            $stmt = $conn->prepare($sql);

            $stmt->bindValue(':username', $username);
            $stmt->bindValue(':password', $password);

            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Log the result of the SQL query
            error_log(print_r($user, true));

            if($user) {
                echo json_encode(['message' => 'User exists', 'user' => $user]);
            } else {
                echo json_encode(['message' => 'Invalid username or password']);
            }
        } else {
            echo json_encode(['message' => 'Please provide both username and password']);
        }
    } catch(PDOException $e) {
        echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
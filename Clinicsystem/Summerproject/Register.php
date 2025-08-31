<?php
$servername = "localhost";
$username = "username"; 
$password = "password"; 
$dbname = "db_file"; 
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $stmt = $conn->prepare("INSERT INTO Registration (first_name, last_name, gender, email, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstName, $lastName, $gender, $email, $password);
    if ($stmt->execute()) {
        echo '<script>window.location.href = "Doctorappointment.html";</script>';
        exit(); 
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
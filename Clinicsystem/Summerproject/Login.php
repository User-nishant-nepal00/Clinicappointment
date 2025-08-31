<?php
session_start();

$servername = "localhost";
$username = "your_username"; 
$password = "your_password"; 
$dbname = "db_file";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pat_username = $_POST['pat_username'];
    $pat_password = $_POST['pat_password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM Registration WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $pat_username, $pat_password);
    
    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any rows returned
    if ($result->num_rows > 0) {
        $_SESSION['username'] = $pat_username;
        header("Location: Appointment.html");
        exit();
    } else {
        echo "Invalid username or password";
    }

    // Close the statement
    $stmt->close();
}

// Close connection
$conn->close();
?>

<?php
session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_file";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form input
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT doctor_id, doctor_password FROM doctors WHERE doctor_email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Bind result variables
        $stmt->bind_result($doctor_id, $db_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $db_password)) {
            // Successful login
            $_SESSION['doctor_id'] = $doctor_id;
            $_SESSION['doctor_email'] = $email;
            header("Location: DoctorPage.html");
            exit();
        } else {
            // Invalid password
            echo "Invalid email or password.";
        }
    } else {
        // Invalid email
        echo "Invalid email or password.";
    }

    $stmt->close();
}

$conn->close();
?>

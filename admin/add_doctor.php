<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_file"; // Replace with your actual database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $doctor_firstname = $conn->real_escape_string($_POST['doctor_firstname']);
    $doctor_lastname = $conn->real_escape_string($_POST['doctor_lastname']);
    $doctor_specialist = $conn->real_escape_string($_POST['doctor_specialist']);
    $doctor_email = $conn->real_escape_string($_POST['doctor_email']);
    $doctor_password = password_hash($conn->real_escape_string($_POST['doctor_password']), PASSWORD_BCRYPT); // Hash the password

    // Insert the new doctor into the database
    $sql = "INSERT INTO doctors (doctor_firstname, doctor_lastname, doctor_specialist, doctor_email, doctor_password) 
            VALUES ('$doctor_firstname', '$doctor_lastname', '$doctor_specialist', '$doctor_email', '$doctor_password')";

    if ($conn->query($sql) === TRUE) {
        echo "New doctor added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

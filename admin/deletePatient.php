<?php
// deletePatient.php

header('Content-Type: application/json');

// Database connection setup
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

// Retrieve and decode JSON body from the request
$data = json_decode(file_get_contents("php://input"), true);

// Extract patient ID
$id = $data['id'];

// Delete query
$sql = "DELETE FROM Registration WHERE registration_id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}

// Close connection
$conn->close();
?>

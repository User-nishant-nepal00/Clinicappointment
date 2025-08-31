<?php
// fetchSingleRegistration.php

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

// Retrieve the ID from the query string
$id = $_GET['id'];

// Query to fetch a single patient's details
$sql = "SELECT * FROM Registration WHERE registration_id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch patient details
    $patient = $result->fetch_assoc();
    // Encode as JSON and return
    echo json_encode($patient);
} else {
    // No patient found with the given ID
    echo json_encode(array('error' => 'Patient not found'));
}

// Close connection
$conn->close();
?>

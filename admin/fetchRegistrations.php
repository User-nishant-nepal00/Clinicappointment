<?php
// fetchRegistrations.php

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

// Fetch all patient registrations
$sql = "SELECT * FROM Registration";
$result = $conn->query($sql);

$registrations = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $registrations[] = $row;
    }
}

// Close connection
$conn->close();

// Return registrations data as JSON
echo json_encode($registrations);
?>

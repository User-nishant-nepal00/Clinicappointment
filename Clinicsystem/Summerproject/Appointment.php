<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "your_username"; 
    $password = "your_password"; 
    $dbname = "db_file"; 
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $patientName = htmlspecialchars($_POST['patientName']);
    $age = (int)$_POST['age'];
    $doctor = htmlspecialchars($_POST['doctor']);
    $scheduleDate = $_POST['scheduleDate'];
    $scheduleTime = $_POST['scheduleTime'];
    $stmt = $conn->prepare("INSERT INTO appointments (patient_name, age, doctor, schedule_date, schedule_time) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sissss", $patientName, $age, $doctor, $scheduleDate, $scheduleTime);
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>
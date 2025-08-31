<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../utils/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

// Verify authentication
$auth = requireAuth();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->patientName) && !empty($data->age) && !empty($data->doctor) && !empty($data->scheduleDate) && !empty($data->scheduleTime)) {
    try {
        $query = "INSERT INTO appointments (patient_name, age, doctor, schedule_date, schedule_time) VALUES (?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(1, $data->patientName);
        $stmt->bindParam(2, $data->age);
        $stmt->bindParam(3, $data->doctor);
        $stmt->bindParam(4, $data->scheduleDate);
        $stmt->bindParam(5, $data->scheduleTime);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Appointment created successfully",
                "appointment_id" => $db->lastInsertId()
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Unable to create appointment"
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
}
?>

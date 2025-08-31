<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../utils/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

// Verify authentication
$auth = requireAuth();

try {
    $query = "SELECT * FROM appointments ORDER BY schedule_date DESC, schedule_time ASC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $appointments = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $appointments[] = [
                "id" => $row['id'],
                "patient_name" => $row['patient_name'],
                "age" => $row['age'],
                "doctor" => $row['doctor'],
                "schedule_date" => $row['schedule_date'],
                "schedule_time" => $row['schedule_time']
            ];
        }

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "appointments" => $appointments
        ]);
    } else {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "appointments" => [],
            "message" => "No appointments found"
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

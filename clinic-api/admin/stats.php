<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Get total patients
    $patientQuery = "SELECT COUNT(*) as total FROM Registration";
    $patientStmt = $db->prepare($patientQuery);
    $patientStmt->execute();
    $patientCount = $patientStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get total doctors
    $doctorQuery = "SELECT COUNT(*) as total FROM doctors";
    $doctorStmt = $db->prepare($doctorQuery);
    $doctorStmt->execute();
    $doctorCount = $doctorStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get total appointments
    $appointmentQuery = "SELECT COUNT(*) as total FROM appointments";
    $appointmentStmt = $db->prepare($appointmentQuery);
    $appointmentStmt->execute();
    $appointmentCount = $appointmentStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get active users (patients + doctors)
    $activeUsers = $patientCount + $doctorCount;

    $stats = [
        "totalPatients" => (int)$patientCount,
        "totalDoctors" => (int)$doctorCount,
        "totalAppointments" => (int)$appointmentCount,
        "activeUsers" => (int)$activeUsers
    ];

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "stats" => $stats
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

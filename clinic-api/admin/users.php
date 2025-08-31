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
    $users = [];

    // Get patients
    $patientQuery = "SELECT registration_id as id, first_name, last_name, email, 'patient' as type FROM Registration";
    $patientStmt = $db->prepare($patientQuery);
    $patientStmt->execute();

    while ($row = $patientStmt->fetch(PDO::FETCH_ASSOC)) {
        $users[] = $row;
    }

    // Get doctors
    $doctorQuery = "SELECT doctor_id as id, doctor_firstname, doctor_lastname, doctor_email, 'doctor' as type FROM doctors";
    $doctorStmt = $db->prepare($doctorQuery);
    $doctorStmt->execute();

    while ($row = $doctorStmt->fetch(PDO::FETCH_ASSOC)) {
        $users[] = $row;
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "users" => $users
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT doctor_id, doctor_firstname, doctor_lastname, doctor_email FROM doctors ORDER BY doctor_firstname, doctor_lastname";
    $stmt = $db->prepare($query);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $doctors = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $doctors[] = [
                "doctor_id" => $row['doctor_id'],
                "doctor_firstname" => $row['doctor_firstname'],
                "doctor_lastname" => $row['doctor_lastname'],
                "doctor_email" => $row['doctor_email']
            ];
        }

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "doctors" => $doctors
        ]);
    } else {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "doctors" => [],
            "message" => "No doctors found"
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

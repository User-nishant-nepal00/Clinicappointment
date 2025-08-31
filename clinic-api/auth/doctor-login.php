<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../utils/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    try {
        $query = "SELECT doctor_id, doctor_firstname, doctor_lastname, doctor_email, doctor_password FROM doctors WHERE doctor_email = ?";
        $stmt = $db->prepare($query);
        $stmt->bindParam(1, $data->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // In production, use password_verify() for hashed passwords
            if ($data->password === $row['doctor_password']) {
                // Generate JWT token
                $token = generateJWT([
                    'user_id' => $row['doctor_id'],
                    'email' => $row['doctor_email'],
                    'user_type' => 'doctor'
                ]);

                http_response_code(200);
                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => [
                        "id" => $row['doctor_id'],
                        "firstName" => $row['doctor_firstname'],
                        "lastName" => $row['doctor_lastname'],
                        "email" => $row['doctor_email']
                    ],
                    "token" => $token
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "message" => "Invalid credentials"
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Doctor not found"
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
        "message" => "Email and password are required"
    ]);
}
?>

<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->firstName) && !empty($data->lastName) && !empty($data->gender) && !empty($data->email) && !empty($data->password)) {
    try {
        // Check if email already exists
        $checkQuery = "SELECT registration_id FROM Registration WHERE email = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(1, $data->email);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Email already exists"
            ]);
            exit();
        }

        // Insert new user
        $query = "INSERT INTO Registration (first_name, last_name, gender, email, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        
        // In production, hash the password
        $hashedPassword = $data->password; // Use password_hash() in production
        
        $stmt->bindParam(1, $data->firstName);
        $stmt->bindParam(2, $data->lastName);
        $stmt->bindParam(3, $data->gender);
        $stmt->bindParam(4, $data->email);
        $stmt->bindParam(5, $hashedPassword);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "User registered successfully"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Unable to register user"
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

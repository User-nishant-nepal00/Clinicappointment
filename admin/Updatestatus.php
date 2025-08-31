<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id']) && isset($input['Approved'])) {
    $id = $input['id'];
    $approved = $input['Approved'] ? 1 : 0;

    $servername = "localhost";
    $username = "root";
    $password = ""; 
    $dbname = "db_file";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit();
    }

    $stmt = $conn->prepare("UPDATE appointments SET Approved = ? WHERE id = ?");
    $stmt->bind_param('ii', $approved, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Update failed']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}
?>

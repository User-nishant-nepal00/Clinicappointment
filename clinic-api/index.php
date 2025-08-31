<?php
header("Content-Type: application/json");
echo json_encode([
    "message" => "Clinic API is working!",
    "timestamp" => date("Y-m-d H:i:s"),
    "status" => "success"
]);
?>

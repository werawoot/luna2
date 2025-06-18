<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../src/Controllers/RealTimeController.php';

verify_jwt();

$controller = new \Luna\Controllers\RealTimeController();
$response = $controller->handle();
echo json_encode($response);

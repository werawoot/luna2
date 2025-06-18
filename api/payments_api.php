<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../src/Controllers/PaymentsController.php';

verify_jwt();

$controller = new \Luna\Controllers\PaymentsController();
$response = $controller->handle();
echo json_encode($response);

<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../src/Controllers/BillingController.php';

verify_jwt();

$controller = new \Luna\Controllers\BillingController();
$response = $controller->handle();
echo json_encode($response);

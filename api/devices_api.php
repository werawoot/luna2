<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../src/Controllers/DevicesController.php';

verify_jwt();

$controller = new \Luna\Controllers\DevicesController();
$response = $controller->handle();
echo json_encode($response);

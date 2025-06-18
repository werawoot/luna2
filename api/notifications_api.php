<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../src/Controllers/NotificationsController.php';

verify_jwt();

$controller = new \Luna\Controllers\NotificationsController();
$response = $controller->handle();
echo json_encode($response);

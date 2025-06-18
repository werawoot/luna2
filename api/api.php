<?php
require_once __DIR__ . '/auth.php';
verify_jwt();
echo json_encode(['message' => 'API root']);

<?php
require_once __DIR__ . '/config.php';

function verify_jwt()
{
    global $config;
    $headers = getallheaders();
    if (empty($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    // Simple token check; in real applications use a JWT library
    if (preg_match('/Bearer\s+(.*)/', $headers['Authorization'], $matches)) {
        $token = trim($matches[1]);
        if ($token !== $config['jwt_secret']) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token']);
            exit;
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

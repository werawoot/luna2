<?php
require_once __DIR__ . '/config.php';

class Database
{
    private static $pdo;

    public static function getConnection()
    {
        global $config;
        if (!self::$pdo) {
            try {
                $dsn = "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8";
                self::$pdo = new PDO($dsn, $config['db_user'], $config['db_pass']);
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                error_log($e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database connection failed']);
                exit;
            }
        }
        return self::$pdo;
    }
}

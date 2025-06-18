<?php
namespace Luna\Repositories;

class NotificationsRepository
{
    public function list()
    {
        $pdo = \Database::getConnection();
        $stmt = $pdo->query('SELECT id, user_id, message, is_read, created_at FROM notifications');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}

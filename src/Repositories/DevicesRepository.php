<?php
namespace Luna\Repositories;

class DevicesRepository
{
    public function all()
    {
        $pdo = \Database::getConnection();
        $stmt = $pdo->query('SELECT id, user_id, name, type, created_at FROM devices');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}

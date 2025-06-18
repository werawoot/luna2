<?php
namespace Luna\Repositories;

class RealTimeRepository
{
    public function fetch()
    {
        $pdo = \Database::getConnection();
        $stmt = $pdo->query('SELECT NOW() AS current_time');
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}

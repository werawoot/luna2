<?php
namespace Luna\Repositories;

class BillingRepository
{
    public function getAll()
    {
        $pdo = \Database::getConnection();
        $stmt = $pdo->query('SELECT id, user_id, amount, status, created_at FROM billing');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}

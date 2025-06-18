<?php
namespace Luna\Repositories;

class PaymentsRepository
{
    public function create($billingId)
    {
        $pdo = \Database::getConnection();
        $stmt = $pdo->prepare('UPDATE billing SET status = ? WHERE id = ?');
        return $stmt->execute(['paid', $billingId]);
    }
}

<?php
namespace Luna\Services;

class PaymentsService
{
    public function process($billingId)
    {
        $repo = new \Luna\Repositories\PaymentsRepository();
        $success = $repo->create($billingId);
        return ['status' => $success ? 'processed' : 'failed'];
    }
}

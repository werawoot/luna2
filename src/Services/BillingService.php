<?php
namespace Luna\Services;

class BillingService
{
    public function getBills()
    {
        $repo = new \Luna\Repositories\BillingRepository();
        $bills = $repo->getAll();
        return ['bills' => $bills];
    }
}

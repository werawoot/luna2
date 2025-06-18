<?php
namespace Luna\Controllers;

use Luna\Services\BillingService;

class BillingController
{
    public function handle()
    {
        $service = new BillingService();
        return $service->getBills();
    }
}
